from django.db import models
from stdimage import StdImageField


# Create your models here.
class Skill(models.Model):
  types = (
    ('n', '----------'),
    ('s', 'Soft'),
    ('h', 'Hard'),
  )
  type_skill = models.CharField(max_length=1, choices=types, default='n')
  name = models.CharField(max_length=200)
  avatar = StdImageField(
    upload_to='img/skills/',
    variations={'thumbnail': {
      "width": 100,
      "height": 100,
      "crop": True
    }},
    null=True,
    blank=True
  )

  class Meta:
    verbose_name = "Skill"
    verbose_name_plural = "Skills"
    # ordering = ['name']

  def __str__(self):
    return f"{self.name}"

  def save(self):
    self.name = self.name.lower()
    super(Skill, self).save()
