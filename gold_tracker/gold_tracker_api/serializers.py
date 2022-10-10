from email import message
from wsgiref.validate import validator
from django.contrib.auth.models import User, Group
from gold_tracker.gold_tracker_api.models import Character, Log, Party
from rest_framework import serializers

class WealthValidator():
    def __init__(self, model):
        self.model = model
        self.message = model + " wealth values cannot be negative"

    def __call__(self, attrs):
        if self.model == "Log":
            if attrs['gold'] < 0 or attrs['silver'] < 0 or attrs['copper'] < 0:
                raise serializers.ValidationError(self.message)
        elif self.model == "Party":
            if attrs['anon_gold'] < 0 or attrs['anon_silver'] < 0 or attrs['anon_copper'] < 0:
                raise serializers.ValidationError(self.message)
        elif self.model == "Character":
            if attrs["personal_gold"] < 0 or attrs["personal_silver"] or attrs["personal_copper"] < 0 or attrs["tribute_gold"] < 0 or attrs["tribute_silver"] < 0 or attrs["tribute_copper"] < 0:
                raise serializers.ValidationError(self.message)

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
        validators = [WealthValidator("Party")]


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
        validators = [WealthValidator("Character")]


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ["id", "entry", "gold", "silver", "copper", "party_id"]
        validators = [WealthValidator("Log")]

