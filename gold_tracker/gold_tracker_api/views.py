from django.contrib.auth.models import User, Group
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from gold_tracker.gold_tracker_api.models import Party, Character, Log
from gold_tracker.gold_tracker_api.serializers import (
    UserSerializer,
    GroupSerializer,
    PartySerializer,
    CharacterSerializer,
    LogSerializer,
)
from .apps import GoldTrackerApiConfig


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserIdViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PartyViewSet(viewsets.ModelViewSet):
    queryset = Party.objects.all()
    serializer_class = PartySerializer
    permission_classes = [permissions.IsAuthenticated]


class UserPartysViewSet(viewsets.ModelViewSet):
    serializer_class = PartySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Party.objects.filter(master=user)


# Create or Read characters matching party_id
class CharacterViewSet(generics.ListCreateAPIView):
    serializer_class = CharacterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        uid = self.kwargs["fk"]
        return Character.objects.filter(party_id=uid)


# Read Update or Delete character
class ManageCharacterViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CharacterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        uid = self.kwargs["pk"]
        return Character.objects.filter(id=uid)


# Create or Read log matching party_id
class LogViewSet(generics.ListCreateAPIView):
    serializer_class = LogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        uid = self.kwargs["fk"]
        return Log.objects.filter(party_id=uid)
