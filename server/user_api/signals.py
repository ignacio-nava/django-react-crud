# Import a post_save signal when a user is created
from django.db.models.signals import post_save
# Import the built-in User model, which is a sender
from django.contrib.auth.models import User
from django.dispatch import receiver  # Import the receiver
from .models import Perfil


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.perfil.save()
