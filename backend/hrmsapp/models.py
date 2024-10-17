from django.db import models

# Contact Us Model
class Contact(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField()

    def __str__(self):
        return self.username

# Signup Model
class Signup(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Password should be hashed in a real application
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# Hiring Post Details Model
class HiringDetails(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    job_roles = models.CharField(max_length=100)  # Job role title
    qualification = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    area_of_interest = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    experience = models.PositiveIntegerField()  # Years of experience
    passed_out = models.PositiveIntegerField()  # Year of graduation
    age_no_ratio = models.PositiveIntegerField()  # Age of candidate
    location = models.CharField(max_length=100)
    work_type = models.CharField(max_length=20)
    no_of_vacancies = models.PositiveIntegerField()  # Total vacancies available
    salary_details = models.CharField(max_length=100)
    no_of_vacancy_required = models.PositiveIntegerField()  # Number of vacancies required
    interview_dates = models.TextField(null=True, blank=True)  # Allow null values
    interview_locations = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Hiring for role: {self.job_roles} at {self.location}"

    def get_interview_details(self):
        """Helper method to get interview details."""
        dates = self.interview_dates.split(',') if self.interview_dates else []
        locations = self.interview_locations.split(',') if self.interview_locations else []
        return list(zip(dates, locations))
