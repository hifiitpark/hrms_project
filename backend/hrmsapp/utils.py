# utils.py
from django.core.mail import send_mail
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
