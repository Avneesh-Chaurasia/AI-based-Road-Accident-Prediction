import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import PredictionForm from "./PredictionForm";
import RiskMap from "./RiskMap";

// Coordinates for cities
export const cityCoordinates = {
  "Mumbai CSMT": [19.0760, 72.8777],
  Jaipur: [26.9196, 75.8180],
  Agra: [27.1767, 78.0081],
  Mallapuram: [11.0720, 76.0740],
  Thrissur: [10.5303, 76.2147],
  Ahmedabad: [23.0339, 72.5850],
  Raipur: [21.2500, 81.6300],
  Kolkata: [22.5726, 88.3639],
  "Allahabad(Prayagraj)": [25.4381, 81.8338],
  Indore: [22.7196, 75.8577],
  Asansol: [23.6777, 86.9861],
  Jamshedpur: [22.8046, 86.2029],
  Delhi: [28.6139, 77.2090],
  Meerut: [28.9845, 77.7064],
  Chennai: [13.0827, 80.2707],
  Srinagar: [34.0837, 74.7973],
  Kota: [25.2138, 75.8648],
  Amritsar: [31.5497, 74.3436],
  Surat: [21.1702, 72.8311],
  Madurai: [9.9250, 78.1193],
  Ghaziabad: [28.6692, 77.4538],
  Tiruchirapalli: [10.7905, 78.7047],
  Kochi: [9.9312, 76.2673],
  Hyderabad: [17.3850, 78.4867],
  Aurangabad: [19.8762, 75.3433],
  Vadodara: [22.3075, 73.1812],
  Bengaluru: [12.9716, 77.5946],
  Nashik: [19.9975, 73.7898],
  Bhopal: [23.2599, 77.4126],
  Chandigarh: [30.7333, 76.7794],
  Jodhpur: [26.2389, 73.0248],
  Lucknow: [26.8467, 80.9462],
  Coimbatore: [11.0168, 76.9558],
  Kollam: [8.8932, 76.6144],
  Patna: [25.5941, 85.1376],
  Pune: [18.5204, 73.8567],
  Varanasi: [25.3176, 82.9739],
  Dhanbad: [23.8000, 86.4350],
  Vijayawada: [16.5063, 80.6480],
  Faridabad: [28.4089, 77.3178],
  Jabalpur: [23.1815, 79.9864],
  Gwalior: [26.2183, 78.1828],
  Thiruvananthapuram: [8.5241, 76.9366],
  Ludhiana: [30.9008, 75.8573],
  Kannur: [11.8745, 75.3704],
  Kanpur: [26.4499, 80.3319],
  Nagpur: [21.1458, 79.0882],
  Kozhikode: [11.2588, 75.7804],
  Visakhapatnam: [17.6869, 83.2185],
  Rajkot: [22.3039, 70.8022],
};

// Socket connection
export const socket = io("http://127.0.0.1:5000", { transports: ["websocket"] });

const RiskPredictionMap = () => {
  const [formData, setFormData] = useState({
    currentLocation: "Navi Mumbai",
    destination: "",
    weather: "",
    roadType: "",
    age: "",
    timeOfDay: "",
    lighting: "",
  });

  const [route, setRoute] = useState([]);
  const [highZones, setHighZones] = useState([]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to Flask backend!");
    });

    socket.on("server_message", (data) => {
      console.log("📩 Message from server:", data.msg);
    });

    return () => {
      socket.off("connect");
      socket.off("server_message");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Accident Risk Prediction & Map
      </h1>

      {/* Form for selecting destination & conditions */}
      <PredictionForm
        formData={formData}
        setFormData={setFormData}
        setRoute={setRoute}
        setHighZones={setHighZones}
        setShowMap={setShowMap}
      />

      {/* Map showing route & high-risk zones */}
      {showMap && (
        <RiskMap
          route={route}
          highZones={highZones}
          destination={formData.destination}
        />
      )}
    </div>
  );
};

export default RiskPredictionMap;
