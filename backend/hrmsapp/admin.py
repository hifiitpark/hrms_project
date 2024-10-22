from django.contrib import admin
from .models import Contact,AboutMe,Courses,Certifications,EducationDetails,ExperienceDetails,Skills,RequiredFiles,HRDetails,CompanyDetails,HiringDetails

admin.site.register(Contact)
admin.site.register(AboutMe)
admin.site.register(EducationDetails)
admin.site.register(ExperienceDetails)
admin.site.register(Courses)
admin.site.register(Certifications)
admin.site.register(Skills)
admin.site.register(RequiredFiles)
admin.site.register(HRDetails)
admin.site.register(CompanyDetails)
admin.site.register(HiringDetails)