import React, { useState } from "react";
import { cityCoordinates } from "./RiskPredictionMap";

const PredictionForm = ({ formData, setFormData, setRoute, setHighZones, setShowMap }) => {
  const [prediction, setPrediction] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------------
  // Handle Form Submit
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = [18.9833, 73.1167]; // Navi Mumbai
    const end = cityCoordinates[formData.destination];

    if (!end) {
      alert("Please select a valid destination.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "Million_Plus_Cities": formData.destination,
          "Age_band_of_driver": formData.driverAge,
          "Cause_of_accident": "Not Known",
          "Weather Conditions":
            formData.weather === "5" ? "Clear" :
            formData.weather === "10" ? "Hazy" :
            formData.weather === "15" ? "Rainy" :
            formData.weather === "20" ? "Foggy" :
            formData.weather === "25" ? "Stormy" : "Clear",
          "Road Type":
            formData.roadType === "10" ? "Highways" :
            formData.roadType === "8" ? "National Highway" :
            formData.roadType === "6" ? "State Highway" :
            formData.roadType === "5" ? "Urban Road" :
            "Village Road",
          "Road Condition": "Dry",
          "Lighting Conditions": formData.lightingCondition || "Daylight",
          "Time_Block": formData.timeoftheday || "Morning",
          "Vehicle Type Involved": formData.vehicleType || "Car"
        }),
      });

      const data = await response.json();

      setPrediction({
        riskLevel: data.prediction_label,
        riskScore: data.prediction_numeric,
        color:
          data.prediction_label === "Low Risk"
            ? "green"
            : data.prediction_label === "Medium Risk"
            ? "orange"
            : data.prediction_label === "High Risk"
            ? "red"
            : "gray",
        riskAdvice:
          data.prediction_label === "Low Risk"
            ? "Safe driving conditions ahead."
            : data.prediction_label === "Medium Risk"
            ? "Be cautious, moderate accident probability."
            : data.prediction_label === "High Risk"
            ? "Avoid travel if possible — high accident risk!"
            : "No advice available.",
      });
    } catch (error) {
      console.error("❌ Error connecting to Flask backend:", error);
      setPrediction({
        riskLevel: "Error",
        riskScore: "-",
        riskAdvice: "Unable to fetch prediction",
        color: "gray",
      });
    }

    // Mock route and risk zones for map visualization
    setRoute([start, end]);
    setHighZones([
      { lat: (start[0] + end[0]) / 2, lng: (start[1] + end[1]) / 2, risk: "High" },
      { lat: start[0] + 0.03, lng: start[1] + 0.03, risk: "Medium" },
      { lat: end[0] - 0.03, lng: end[1] - 0.03, risk: "Low" },
    ]);
    setShowMap(true);
  };

  const isFormIncomplete =
    !formData.destination ||
    !formData.vehicleType ||
    !formData.roadType ||
    !formData.weather ||
    !formData.driverAge ||
    !formData.timeoftheday ||
    !formData.lightingCondition;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Location
            </label>
            <input
              type="text"
              name="currentLocation"
              value="Navi Mumbai (Panvel)"
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Destination
            </label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Destination</option>
              {Object.keys(cityCoordinates).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* User Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Vehicle Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vehicle Type
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option>Car</option>
              <option>Truck</option>
              <option>Bus</option>
              <option>Cycle</option>
              <option>Pedestrian</option>
              <option>Two-Wheeler</option>
              <option>Auto-Rickshaw</option>
            </select>
          </div>

          {/* Road Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Road Type
            </label>
            <select
              name="roadType"
              value={formData.roadType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option>Highways</option>
              <option>National Highway</option>
              <option>State Highway</option>
              <option>Urban Road</option>
              <option>Village Road</option>
            </select>
          </div>

          {/* Driver Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Driver Age
            </label>
            <select
              name="driverAge"
              value={formData.driverAge}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option>18-30</option>
              <option>31-50</option>
              <option>50+</option>
            </select>
          </div>

          {/* Time of Day */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Time of the Day
            </label>
            <select
              name="timeoftheday"
              value={formData.timeoftheday}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Night</option>
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Weather Condition
            </label>
            <select
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option>Clear</option>
              <option>Hazy</option>
              <option>Rainy</option>
              <option>Foggy</option>
              <option>Stormy</option>
            </select>
          </div>

          {/* Lighting Condition */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Lighting Condition
            </label>
            <select
              name="lightingCondition"
              value={formData.lightingCondition}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option>Daylight</option>
              <option>Dusk</option>
              <option>Dawn</option>
              <option>Dark</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isFormIncomplete}
            className={`px-8 py-2 rounded-lg transition ${
              isFormIncomplete
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            }`}
          >
            Predict Risk
          </button>
        </div>
      </form>

      {/* Prediction Output */}
      {prediction && (
        <div
          className={`mt-6 p-4 rounded-lg text-center ${
            prediction.color === "green"
              ? "bg-green-100 text-green-800"
              : prediction.color === "orange"
              ? "bg-orange-100 text-orange-800"
              : prediction.color === "red"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <h2 className="text-xl font-bold">{prediction.riskLevel}</h2>
          <p className="mt-1">{prediction.riskAdvice}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;

