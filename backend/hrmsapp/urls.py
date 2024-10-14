from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignupViewSet, ContactViewSet
from .views import HiringDetailsViewSet


router = DefaultRouter()
router.register(r'signup', SignupViewSet, basename='signup')
router.register(r'contacts', ContactViewSet)
router.register(r'hiring-details', HiringDetailsViewSet, basename='hiringdetails')


urlpatterns = [
    path('', include(router.urls)),
]