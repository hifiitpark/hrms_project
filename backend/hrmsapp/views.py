from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from hrmsapp.serializers import SignupSerializer
from .models import HiringDetails
from .serializers import HiringDetailsSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class SignupViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SignupSerializer


class HiringDetailsViewSet(viewsets.ModelViewSet):
    queryset = HiringDetails.objects.all()
    serializer_class = HiringDetailsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)