from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignupViewSet, ContactViewSet


router = DefaultRouter()
router.register(r'signup', SignupViewSet, basename='signup')
router.register(r'contacts', ContactViewSet)


urlpatterns = [
    path('', include(router.urls)),
]