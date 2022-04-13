from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from gold_tracker.gold_tracker_api.models import Party
from gold_tracker.gold_tracker_api.serializers import (
    UserSerializer,
    GroupSerializer,
    PartySerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PartyViewSet(viewsets.ModelViewSet):

    serializer_class = PartySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.partys.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
