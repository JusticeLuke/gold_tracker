from django.urls import include, path

accounts_urlpatterns = [
    path("api/v1/", include("djoser.urls")),
    path("api/v1/", include("djoser.urls.authtoken")),
]
