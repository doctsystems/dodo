from django.contrib import admin
from .models import *

class SkillAdmin(admin.ModelAdmin):
	list_display = ('name', 'type_skill', 'avatar')

admin.site.register(Skill, SkillAdmin)
