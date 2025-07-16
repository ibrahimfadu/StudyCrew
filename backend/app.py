from flask import Flask,jsonify,request
from datetime import datetime, timedelta
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.linear_model import LinearRegression
app=Flask(__name__)
CORS(app)

model_filename="model/study_schedule_model.joblib"
loaded_model = joblib.load(model_filename)

def predict_study_time(num_subjects, hours_per_day, num_topics, num_days, loaded_model=None):
    if loaded_model is None:
        try:
            model = joblib.load(model_filename)
        except FileNotFoundError:
            return jsonify({"error": "Model file not found"}), 500
    else:
        model = loaded_model

    input_data = pd.DataFrame([[len(num_subjects), hours_per_day, num_topics, num_days]],
                              columns=['num_subjects', 'hours_per_day', 'num_topics', 'num_days'])
    prediction = model.predict(input_data)[0]

    predicted_minutes = int(max(0, round(prediction)))
    predicted_hours = round(predicted_minutes / 60, 2)
    data = {
        "predict_hours":predicted_hours    
    }

    return jsonify(data)



#Api for model prediction
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    num_subjects = data.get("subjects")
    hours_per_day = data.get("hoursPerDay")
    num_topics = data.get("numTopics")
    num_days = data.get("numDays")

    if None in [num_subjects, hours_per_day, num_topics, num_days]:
        return jsonify({"error": "Missing input values"}), 402  

    return predict_study_time(num_subjects, hours_per_day, num_topics, num_days)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
