from django.urls import path
from .views import Home, Contact


urlpatterns = [
	path('', Home.as_view(), name='home'),
	path('contact/', Contact, name='contact'),
]