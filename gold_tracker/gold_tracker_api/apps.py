from django.apps import AppConfig
import pandas as pd
from pathlib import Path
from joblib import load
import pickle
import os

BASE_DIR = Path(__file__).resolve().parent.parent


class GoldTrackerApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "gold_tracker.gold_tracker_api"
    CLASSIFIER_FOLDER = os.path.join(BASE_DIR, "gold_tracker_api/classifier/")
    # Get machine learning model file for monster hp generator
    MONSTER_FILE = os.path.join(CLASSIFIER_FOLDER, "monster_model")
