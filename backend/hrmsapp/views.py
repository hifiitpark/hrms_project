from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate,  logout, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from .models import (
    Contact, AboutMe, EducationDetails, ExperienceDetails, 
    Courses, Certifications, Skills, RequiredFiles,HRDetails,
    CompanyDetails,HiringDetails
)
from .serializers import (
    ContactSerializer, UserRegistrationSerializer, 
    AboutMeSerializer, EducationDetailsSerializer, 
    ExperienceDetailsSerializer, CoursesSerializer, 
    CertificationsSerializer, SkillsSerializer, 
    RequiredFilesSerializer,HRDetailsSerializer,
    CompanyDetailsSerializer,HiringDetailsSerializer
)
from django.core.cache import cache
from .utils import create_otp, get_expected_otp, mark_otp_as_used, send_otp
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import send_mail
import random
import logging



class UserRegistrationViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    def create(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Contact ViewSet
class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

# User Registration View
logger = logging.getLogger(__name__)

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]  # Allow access to everyone

    def post(self, request):
        logger.debug(f"Received registration request with data: {request.data}")
        
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                serializer.save()
                logger.info("User created successfully.")
                return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error saving user: {e}")
                return Response({'detail': 'An error occurred during registration.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        logger.warning(f"Invalid data: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
            email = request.data.get('email')
            password = request.data.get('password')

            try:
                # Get the user by email
                user = User.objects.get(email=email)
                # Authenticate using username (which is the email in this case) and password
                user = authenticate(request, username=user.username, password=password)
                
                if user is not None:
                    login(request, user)
                    return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

# Logout View
@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        request.session.flush()  # Clear the session data completely
        response = JsonResponse({'status': 'success', 'message': 'Logout successful'}, status=200)
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Credentials'] = 'true'
        return response
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

# CSRF Token View
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.META.get('CSRF_COOKIE', '')})

# User Profile ViewSet
class UserProfileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user = request.user

        # Ensure that the user is authenticated
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Fetch the user's data using serializers
        about_me = AboutMeSerializer(AboutMe.objects.filter(user=user).first()).data
        education_details = EducationDetailsSerializer(EducationDetails.objects.filter(user=user), many=True).data
        experience_details = ExperienceDetailsSerializer(ExperienceDetails.objects.filter(user=user), many=True).data
        courses = CoursesSerializer(Courses.objects.filter(user=user), many=True).data
        certifications = CertificationsSerializer(Certifications.objects.filter(user=user), many=True).data
        skills = SkillsSerializer(Skills.objects.filter(user=user), many=True).data
        required_files = RequiredFilesSerializer(RequiredFiles.objects.filter(user=user), many=True).data

        # Return the user's data in the response
        return Response({
            'about_me': about_me,
            'education_details': education_details,
            'experience_details': experience_details,
            'courses': courses,
            'certifications': certifications,
            'skills': skills,
            'required_files': required_files
        }, status=status.HTTP_200_OK)


class HRDetailsViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = HRDetails.objects.all()
    serializer_class = HRDetailsSerializer

class CompanyDetailsViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = CompanyDetails.objects.all()
    serializer_class = CompanyDetailsSerializer

class HiringDetailsViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = HiringDetails.objects.all()
    serializer_class = HiringDetailsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@method_decorator(csrf_exempt, name='dispatch')
class SignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        user = User.objects.create_user(
            username=data['email'],
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name']
        )
        # Send OTP and cache it
        otp = send_otp(user.email)
        cache.set(user.email, otp, timeout=300)  # Cache OTP for 5 minutes

        return Response({"detail": "User created successfully. OTP sent to email."}, status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])  # This allows access without authentication
def send_otp(request):
    email = request.data.get('email')
    
    if not email:
        return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Simulate OTP generation and sending logic
    otp = random.randint(1000, 9999)
    otp = create_otp(email)
    # Send the OTP via email
    send_mail(
        'Your OTP Code',
        f'Your OTP code is {otp}',
        'srivaniagency@example.com',  # Replace with your email
        [email],
        fail_silently=False,
    )

    return Response({"detail": "OTP sent successfully."}, status=status.HTTP_200_OK)


logger = logging.getLogger(__name__)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        logger.debug(f"Received OTP verification request for email: {email} with OTP: {otp}")

        # Validate that both email and OTP are provided
        if not email or not otp:
            logger.warning("Email or OTP not provided.")
            return Response({"detail": "Email and OTP are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the expected OTP for the provided email
            expected_otp = get_expected_otp(email)
            logger.debug(f"Expected OTP for {email}: {expected_otp}")

            # Check if an OTP exists for this email
            if expected_otp is None:
                logger.error(f"Email {email} not found in the system.")
                return Response({"detail": "Email not found."}, status=status.HTTP_400_BAD_REQUEST)

            # Verify if the provided OTP matches the expected OTP
            if otp == expected_otp:
                # Mark OTP as used
                try:
                    mark_otp_as_used(email)
                    logger.info(f"OTP for email {email} verified and marked as used.")
                    return Response({"detail": "OTP verified successfully."}, status=status.HTTP_200_OK)
                except Exception as mark_otp_error:
                    logger.error(f"Failed to mark OTP as used for {email}: {mark_otp_error}")
                    return Response({"detail": "Error marking OTP as used."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            # If OTP is incorrect
            logger.warning(f"Invalid OTP provided for email {email}.")
            return Response({"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Error during OTP verification for email {email}: {e}")
            return Response({"detail": "An error occurred while verifying OTP."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ResendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        otp = create_otp(email)  # Call your create_otp function
        # Optionally send the OTP via email
        send_otp(email, otp)  # Implement this function as needed

        return Response({"detail": "OTP has been resent."}, status=status.HTTP_200_OK)