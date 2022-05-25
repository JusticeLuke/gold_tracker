from django.contrib.auth.models import User, Group
from gold_tracker.gold_tracker_api.models import Character, Log, Party
from rest_framework import serializers

#
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "id", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class PartySerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ["id", "name", "anon_gold", "anon_silver", "anon_copper", "master"]


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = [
            "id",
            "name",
            "personal_gold",
            "personal_silver",
            "personal_copper",
            "tribute_gold",
            "tribute_silver",
            "tribute_copper",
            "party_id",
        ]


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ["id", "entry", "time", "party_id"]
