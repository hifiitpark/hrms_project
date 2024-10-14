from rest_framework import serializers
from .models import Contact
from .models import Signup
from .models import HiringDetails
from django.contrib.auth import authenticate


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signup
        fields = '__all__'



class HiringDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HiringDetails
        fields = '__all__' 