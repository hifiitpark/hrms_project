# utils.py
from django.core.mail import send_mail
from .models import OTP
from django.core.exceptions import ObjectDoesNotExist
import random

def send_otp(email):
    otp = random.randint(100000, 999999)  # Generate a 6-digit OTP
    send_mail(
        'Your OTP Code',
        f'Your OTP code is: {otp}',
        'pandiushak@gmail.com',  # Replace with your sender email
        [email],
        fail_silently=False,
    )
    return otp

def store_otp(email, otp):
    OTP.objects.update_or_create(
        email=email,
        defaults={'otp': otp}
    )

def get_expected_otp(email):
    try:
        otp_record = OTP.objects.get(email=email, is_used=False)  # Check for unused OTP
        return otp_record.otp
    except OTP.DoesNotExist:
        return None

def mark_otp_as_used(email):
    try:
        OTP.objects.filter(email=email, is_used=False).update(is_used=True)  # Mark the OTP as used
    except OTP.DoesNotExist:
        pass  # Handle the case where the OTP is not found

def create_otp(email):
    otp = str(random.randint(1000, 9999))  # Generate a 4-digit OTP
    OTP.objects.create(email=email, otp=otp)  # Create a new OTP record
    return otp