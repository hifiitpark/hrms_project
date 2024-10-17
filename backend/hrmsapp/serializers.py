from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Contact, HiringDetails
import uuid  # To generate unique usernames if needed

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']  # No username field
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

    def create(self, validated_data):
        # Auto-generate a unique username using the email or a UUID
        username = validated_data['email'].split('@')[0]  # Or use validated_data['first_name'] + validated_data['last_name']
        if User.objects.filter(username=username).exists():
            username = f"{username}_{uuid.uuid4().hex[:8]}"  # Make username unique if it already exists
        
        user = User(
            username=username,
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])  # Ensure the password is hashed
        user.save()
        return user

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']  # Use email for login instead of username
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid email or password.")

            if not user.check_password(password):
                raise serializers.ValidationError("Invalid email or password.")

            attrs['user'] = user
        else:
            raise serializers.ValidationError("Email and password are required.")

        return attrs

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'  # Automatically include all fields in the model

class HiringDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HiringDetails
        fields = '__all__'  # Automatically include all fields in the model
