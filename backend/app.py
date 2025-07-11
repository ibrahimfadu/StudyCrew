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

    input_data = pd.DataFrame([[num_subjects, hours_per_day, num_topics, num_days]],
                              columns=['num_subjects', 'hours_per_day', 'num_topics', 'num_days'])
    prediction = model.predict(input_data)[0]

    predicted_minutes = int(max(0, round(prediction)))
    average_time_per_topic_minutes = predicted_minutes / num_topics if num_topics > 0 else 0

    # ✅ Convert to hours
    predicted_hours = round(predicted_minutes / 60, 2)
    average_hours_per_topic = round(average_time_per_topic_minutes / 60, 2)

    data = {
        "predict_hours": predicted_hours,
        "average_hours_per_topic": average_hours_per_topic
    }

    return jsonify(data)



#Api for model prediction
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    num_subjects = data.get("num_subjects")
    hours_per_day = data.get("hours_per_day")
    num_topics = data.get("num_topics")
    num_days = data.get("num_days")

    if None in [num_subjects, hours_per_day, num_topics, num_days]:
        return jsonify({"error": "Missing input values"}), 400

    return predict_study_time(num_subjects, hours_per_day, num_topics, num_days)
if __name__=="__main__":
    app.run(debug=True)