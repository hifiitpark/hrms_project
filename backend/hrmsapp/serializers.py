from rest_framework import serializers
from .models import Contact,AboutMe,Courses,Certifications,EducationDetails,ExperienceDetails,Skills,RequiredFiles,HRDetails,CompanyDetails,HiringDetails
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Your User model
        fields = ['first_name', 'last_name', 'email', 'password']  # Include other fields as necessary

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user


class AboutMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutMe
        fields = '__all__'

class EducationDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationDetails
        fields = '__all__'

class ExperienceDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceDetails
        fields = '__all__'

class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'

class CertificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certifications
        fields = '__all__'

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'

class RequiredFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequiredFiles
        fields = '__all__'


class HRDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HRDetails
        fields = '__all__'

# Company Details Serializer
class CompanyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDetails
        fields = '__all__'

    # Validate company email
    def validate_company_email(self, value):
        if not value:
            raise serializers.ValidationError("Company email is required.")
        if not "@" in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    # Validate company phone number
    def validate_company_phone(self, value):
        if not value:
            raise serializers.ValidationError("Company phone number is required.")
        if len(value) < 10:  # Assuming phone number should be at least 10 digits
            raise serializers.ValidationError("Phone number must be at least 10 digits long.")
        return value

    # Validate company name
    def validate_company_name(self, value):
        if not value:
            raise serializers.ValidationError("Company name is required.")
        return value

    # Validate company employees (should be a positive integer)
    def validate_company_employees(self, value):
        if not isinstance(value, int) or value <= 0:
            raise serializers.ValidationError("Number of employees should be a positive integer.")
        return value

    # Validate annual income (should be a positive number)
    def validate_annual_income(self, value):
        if value is None or value < 0:
            raise serializers.ValidationError("Annual income must be a positive number.")
        return value

    # Validate net profit (should be a positive number)
    def validate_net_profit(self, value):
        if value is None or value < 0:
            raise serializers.ValidationError("Net profit must be a positive number.")
        return value

    # Validate start year (should be a valid year)
    def validate_start_year(self, value):
        if value is None or value < 1900 or value > 2100:  # Assuming the year should be between 1900 and 2100
            raise serializers.ValidationError("Enter a valid year for the start year.")
        return value
    
class HiringDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HiringDetails
        fields = '__all__'