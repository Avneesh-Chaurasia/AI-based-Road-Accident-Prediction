# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import warnings

warnings.filterwarnings("ignore", category=UserWarning)

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "rf_model.pkl")

# -------------------------------
# Load model
# -------------------------------
model = None
try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("✅ Model loaded successfully from:", MODEL_PATH)
    else:
        print(f"❌ Model file not found at: {MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# -------------------------------
# Text → Numeric Mappings
# -------------------------------
weather_mapping = {
    "Clear": 0,
    "Hazy": 1,
    "Foggy": 2,
    "Stormy": 3,
    "Rainy": 4
}

road_type_mapping = {
    "Highways": 0,
    "Urban Road": 1,
    "National Highway": 2,
    "Village Road": 3,
    "State Highway": 4
}

time_of_the_day_mapping = {
    "Night": 0,
    "Morning": 1,
    "Evening": 2,
    "Afternoon": 3
}

vehicle_mapping = {
    "Cycle": 0,
    "Car": 1,
    "Pedestrian": 2,
    "Bus": 3,
    "Truck": 4,
    "Two-Wheeler": 5,
    "Auto-Rickshaw": 6
}

lighting_mapping = {
    "Daylight": 0,
    "Dusk": 1,
    "Dawn": 2,
    "Dark": 3
}

city_mapping = {
    'Jaipur': 0, 'Agra': 1, 'Mumbai': 2, 'Mallapuram': 3, 'Thrissur': 4,
    'Ahmedabad': 5, 'Raipur': 6, 'Kolkata': 7, 'Allahabad(Prayagraj)': 8,
    'Indore': 9, 'Asansol Durgapur': 10, 'Jamshedpur': 11, 'Delhi': 12,
    'Meerut': 13, 'Chennai': 14, 'Srinagar': 15, 'Kota': 16, 'Amritsar': 17,
    'Surat': 18, 'Madurai': 19, 'Ghaziabad': 20, 'Tiruchirapalli': 21,
    'Kochi': 22, 'Hyderabad': 23, 'Aurangabad': 24, 'Vadodra': 25,
    'Bengaluru': 26, 'Nashik': 27, 'Bhopal': 28, 'Chandigarh': 29,
    'Jodhpur': 30, 'Lucknow': 31, 'Coimbatore': 32, 'Kollam': 33,
    'Patna': 34, 'Pune': 35, 'Varanasi': 36, 'Dhanbad': 37,
    'Vijaywada city': 38, 'Faridabad': 39, 'Jabalpur': 40, 'Gwalior': 41,
    'Thiruvanthapuram': 42, 'Ludhiana': 43, 'Kannur': 44, 'Kanpur': 45,
    'Nagpur': 46, 'Khozikode': 47, 'Vizaq': 48, 'Rajkot': 49
}

age_mapping = {
    "18-30": 0,
    "31-50": 1,
    "50+": 2
}

severity_mapping = {
    0: "Low Risk",
    1: "Medium Risk",
    2: "High Risk"
}

# -------------------------------
# Routes
# -------------------------------
@app.route('/')
def home():
    return "🚦 AI-based Road Accident Prediction is running! Use /predict or /highrisk endpoints."

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        # Map incoming data (frontend keeps simple fields)
        city = city_mapping.get(data.get("City"), 0)
        weather = weather_mapping.get(data.get("Weather"), 0)
        road_type = road_type_mapping.get(data.get("Road_Condition"), 0)
        vehicle = vehicle_mapping.get(data.get("Vehicle_Type"), 0)
        age = age_mapping.get(data.get("Driver_Age"), 0)
        lighting_condition = lighting_mapping.get(data.get("Lighting_Condition"), 0)
        time_of_day = time_of_the_day_mapping.get(data.get("Time_of_Day"), 0)


        # Build DataFrame in the exact order and names your model expects
        df = pd.DataFrame([{
            "Million_Plus_Cities": city,
            "Age_band_of_driver": age,
            "Cause_of_accident": 0,
            "Weather Conditions": weather,
            "Road Type": road_type,
            "Road Condition": 1,
            "Lighting Conditions": lighting_condition,
            "Time_Block": time_of_day,
            "Vehicle Type Involved": vehicle
        }])

        prediction = model.predict(df)[0]
        severity_label = severity_mapping.get(prediction, "Unknown")

        return jsonify({
            "prediction_numeric": int(prediction),
            "prediction_label": severity_label
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/highrisk', methods=['POST'])
def high_risk():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data_list = request.get_json()
        if not data_list or not isinstance(data_list, list):
            return jsonify({"error": "Provide a list of records"}), 400

        predictions = []
        for data in data_list:
            city = city_mapping.get(data.get("City"), 0)
            weather = weather_mapping.get(data.get("Weather"), 0)
            road_type = road_type_mapping.get(data.get("Road_Condition"), 0)
            vehicle = vehicle_mapping.get(data.get("Vehicle_Type"), 0)
            age = age_mapping.get(data.get("Driver_Age"), 0)
            lighting_condition = lighting_mapping.get(data.get("Lighting_Condition"), 0)
            time_of_day = time_of_the_day_mapping.get(data.get("Time_of_Day"), 0)

            df = pd.DataFrame([{
                "Million_Plus_Cities": city,
                "Age_band_of_driver": age,
                "Cause_of_accident": 0,
                "Weather Conditions": weather,
                "Road Type": road_type,
                "Road Condition": 1,
                "Lighting Conditions": lighting_condition,
                "Time_Block": time_of_day,
                "Vehicle Type Involved": vehicle
            }])

            pred = model.predict(df)[0]
            severity_label = severity_mapping.get(pred, "Unknown")

            predictions.append({
                "Location": data.get("City", "Unknown"),
                "prediction_numeric": int(pred),
                "prediction_label": severity_label
            })

        return jsonify({"predictions": predictions})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

