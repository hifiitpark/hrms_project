from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignupViewSet, LoginViewSet, ContactViewSet, HiringDetailsViewSet

# Initialize the router
router = DefaultRouter()
router.register(r'contacts', ContactViewSet)  # Use router for contacts
router.register(r'hiring-details', HiringDetailsViewSet, basename='hiringdetails')  # Use router for hiring details

# Define the URL patterns
urlpatterns = [
    path('api/signup/', SignupViewSet.as_view(), name='signup'),  # Signup endpoint
    path('api/login/', LoginViewSet.as_view(), name='login'),  # Login endpoint for session management
    path('', include(router.urls)),  # Include the router URLs
]
