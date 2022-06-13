from django.apps import AppConfig
import pandas as pd
from pathlib import Path
from joblib import load
import os

BASE_DIR = Path(__file__).resolve().parent.parent


class GoldTrackerApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "gold_tracker.gold_tracker_api"
    CLASSIFIER_FOLDER = os.path.join(BASE_DIR, "gold_tracker_api/classifier/")
    # CLASSIFIER_FILE = CLASSIFIER_FOLDER / "IRISRandomForestClassifier.joblib"
    CLASSIFIER_FILE = os.path.join(
        CLASSIFIER_FOLDER, "IRISRandomForestClassifier.joblib"
    )
    classifier = load(CLASSIFIER_FILE)
