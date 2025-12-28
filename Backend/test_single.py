import requests

url = "http://127.0.0.1:5000/predict"
data = {"City":"Delhi","Weather":"Foggy","Road_Condition":"National Highway","Vehicle_Type":"Truck","Driver_Age":"50+","Lighting_Condition":"Dark","Time_of_Day":"Night"} #---> High Risk
# data = {"City":"Mumbai","Weather":"Clear","Road_Condition":"Urban Road","Vehicle_Type":"Car","Driver_Age":"25-50","Lighting_Condition":"Daylight","Time_of_Day":"Afternoon"} ---> High Risk




response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response:", response.json())
