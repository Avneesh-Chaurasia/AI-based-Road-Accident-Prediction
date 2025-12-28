# AI-based Road Accident Prediction System 🚦

## 📌 Problem Statement
Road accidents are a major cause of fatalities and injuries worldwide.  
Traditional accident analysis methods are mostly reactive and do not provide
real-time insights for prevention. There is a need for an intelligent system
that can analyze historical accident data and predict accident severity to
support data-driven decision making.

---

## 🎯 Objectives
- To analyze historical road accident data and identify critical patterns
- To build a machine learning model capable of predicting accident severity
- To expose the trained model through a REST API for real-time predictions
- To containerize the backend using Docker for consistent deployment
- To create a scalable and reusable backend suitable for production environments

---

## 🧠 Solution Overview
This project implements a **machine learning-based backend system** that
predicts road accident severity using structured accident data.  
A trained Random Forest model is integrated with a Flask REST API and
containerized using Docker, enabling seamless deployment across environments.

---

## ⚙️ Tech Stack
- **Programming Language:** Python  
- **Backend Framework:** Flask  
- **Machine Learning:** Scikit-learn (Random Forest Classifier)  
- **Data Processing:** NumPy, Pandas  
- **Model Serialization:** Pickle  
- **Containerization:** Docker  

---

## 🏗️ System Architecture
1. Historical accident dataset is preprocessed and cleaned
2. Machine learning model is trained on relevant features
3. Trained model is saved and loaded into the Flask backend
4. REST API accepts input parameters and returns predictions
5. Entire backend is containerized using Docker

---

## 🚀 Features
- ML-powered accident severity prediction
- RESTful API for model inference
- Dockerized backend for easy deployment
- Scalable and environment-independent setup
- Clean and modular project structure

---

## ▶️ Run Using Docker

### Build Docker Image
```bash
docker build -t road-accident-backend .
