from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UserRegistrationViewSet, ContactViewSet, UserProfileViewSet,HRDetailsViewSet,CompanyDetailsViewSet,HiringDetailsViewSet, LoginView  , logout_view, get_csrf_token,SignupView, send_otp, VerifyOTPView

router = DefaultRouter()
# router.register(r'register', UserRegistrationViewSet, basename='register')
router.register(r'contacts', ContactViewSet)
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')
router.register(r'hrdetails', HRDetailsViewSet)
router.register(r'company-details', CompanyDetailsViewSet) 
router.register(r'hiring-details', HiringDetailsViewSet, basename='hiringdetails')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),
    path('csrf-token/', get_csrf_token, name='get_csrf_token',),
    path('register/', SignupView.as_view(), name='register'),
    path('send_otp/', send_otp, name='send_otp'),
    path('verify_otp/', VerifyOTPView.as_view(), name='verify_otp'),
]