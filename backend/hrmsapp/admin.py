from django.contrib import admin
from .models import Signup, CompanyDetails, HRDetails, Signup
from django.contrib import admin
from .models import AuditLog

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ['user', 'action', 'timestamp']
    list_filter = ['timestamp']


# Register the Signup model with Django admin
class SignupAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'date_created')  # Customize columns to display
    search_fields = ('first_name', 'last_name', 'email')  # Enable search by these fields
    list_filter = ('date_created',)  # Enable filtering by date


@admin.register(Signup)
class SignupAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'date_created']  # Ensure these fields exist



