from django.db import models

#contactus
class Contact(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField()


    def __str__(self):
        return self.username
    


#signup
class Signup(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Password should be hashed in a real application
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.first_name


####################
# Hiring Post Details

class HiringDetails(models.Model):
    job_roles = models.JSONField()  # Store array of job roles
    qualification = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)  # male, female, other
    area_of_interest = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    experience = models.CharField(max_length=50)  # fresher or experience description
    passed_out = models.CharField(max_length=4)  # Year of passing out
    age_no_ratio = models.CharField(max_length=10)  # Age or No Ratio
    location = models.CharField(max_length=100)
    work_type = models.CharField(max_length=20)  # Full-time, Part-time, etc.
    no_of_vacancies = models.IntegerField()
    salary_details = models.CharField(max_length=100)
    no_of_vacancy_required = models.IntegerField()
    
    # Split interview_details into interview_data and interview_location
    interview_data = models.JSONField(default=list)  # Store interview dates
    interview_location = models.JSONField(default=list)  # Store interview locations

    def __str__(self):
        return f"Hiring for {self.job_roles} at {self.location}"
 