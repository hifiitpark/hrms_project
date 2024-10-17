import logging
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .models import Contact, HiringDetails
from .serializers import ContactSerializer, SignupSerializer, HiringDetailsSerializer, LoginSerializer

# Configure logger
logger = logging.getLogger(__name__)

class MyTokenObtainPairView(TokenObtainPairView):
    # Customize token response if needed
    pass

class SignupViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer

    def perform_create(self, serializer):
        password = self.request.data.get('password')
        if password:
            try:
                # Save the user with a hashed password
                serializer.save(password=make_password(password))
            except Exception as e:
                logger.error(f"Error saving user: {e}")
                raise e  # Re-raise the exception to signal failure

    def post(self, request, *args, **kwargs):
        logger.debug(f"Received data for signup: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            logger.info(f"User created successfully: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error(f"Signup failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginViewSet(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        logger.debug(f"Received data for login: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # User authentication and session management
            session_data = serializer.validated_data
            logger.info(f"User logged in successfully: {session_data['user']['username']}")
            return Response(session_data, status=status.HTTP_200_OK)

        logger.error(f"Login failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]  # Enable session authentication

    def create(self, request, *args, **kwargs):
        logger.debug(f"Received data for contact creation: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            logger.info(f"Contact created successfully: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error(f"Contact creation failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HiringDetailsViewSet(viewsets.ModelViewSet):
    queryset = HiringDetails.objects.all()
    serializer_class = HiringDetailsSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]  # Enable session authentication

    def perform_create(self, serializer):
        try:
            serializer.save()  # Save HiringDetails
            logger.info(f"Hiring details saved successfully: {serializer.data}")
        except Exception as e:
            logger.error(f"Error saving hiring details: {e}")
            raise e

    def create(self, request, *args, **kwargs):
        logger.debug(f"Received data for hiring details creation: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error(f"HiringDetails creation failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
