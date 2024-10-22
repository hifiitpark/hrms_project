from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.utils.decorators import method_decorator
import json
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
from .utils import send_otp
from django.contrib.auth.models import User





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
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]  # Allow access to everyone

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
@csrf_exempt  # Temporarily disable CSRF protection for this view (not recommended for production)
@require_POST  # Ensure only POST requests are accepted
def login_view(request):
    try:
        data = json.loads(request.body)  # Parse JSON data from the request body
        email = data.get('email')
        password = data.get('password')

        # Authenticate the user based on email and password
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)  # Log the user in, creating a session
            return JsonResponse({'status': 'success', 'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
    
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

class SendOtpView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            otp = send_otp(email)
            cache.set(email, otp, timeout=300)  # Cache OTP for 5 minutes
            return Response({"detail": "OTP sent to email."}, status=status.HTTP_200_OK)
        return Response({"detail": "Email not found."}, status=status.HTTP_404_NOT_FOUND)

class VerifyOtpView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        cached_otp = cache.get(email)

        if cached_otp and str(cached_otp) == str(otp):
            cache.delete(email)  # Delete the OTP after verification
            return Response({"detail": "OTP verified successfully."}, status=status.HTTP_200_OK)

        return Response({"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)