from django.urls import path, include
from rest_framework import routers

from .views import TaskView

routers = routers.DefaultRouter()
routers.register(r"tasks", TaskView, "tasks")

urlpatterns = [
    path("api/v1/", include(routers.urls))
]
