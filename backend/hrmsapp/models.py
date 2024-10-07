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