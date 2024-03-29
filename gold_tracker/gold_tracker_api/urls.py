"""gold_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from gold_tracker.gold_tracker_api.views import UserPartysViewSet

from rest_framework import routers
from gold_tracker.gold_tracker_api import views
from accounts.urls import accounts_urlpatterns

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path(
        "partys",
        views.PartyViewSet.as_view({"get": "list", "post": "create"}),
        name="party-list",
    ),
    path(
        "id",
        views.UserIdViewSet.as_view({"get": "list"}),
        name="id",
    ),
    path(
        "partys/<int:pk>",
        views.PartyViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
        name="party-detail",
    ),
    path(
        "user-partys",
        views.UserPartysViewSet.as_view({"get": "list", "post": "create"}),
        name="user-party-list",
    ),
    path(
        "partys/<int:fk>/characters",
        views.CharacterViewSet.as_view(),
        name="character-list",
    ),
    path(
        "partys/<int:fk>/characters/<int:pk>",
        views.ManageCharacterViewSet.as_view(),
        name="character-list",
    ),
    path(
        "partys/<int:fk>/log",
        views.LogViewSet.as_view(),
        name="log",
    ),
]

urlpatterns += accounts_urlpatterns
