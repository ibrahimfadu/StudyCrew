import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

def generate_synthetic_data(num_samples=1000):
    """
    Generates synthetic data for training the study schedule regression model.
    Args:
        num_samples (int): The number of data samples to generate.
    Returns:
        pd.DataFrame: A DataFrame containing features and the target variable.
    """
    data = {
        'num_subjects': np.random.randint(1, 6, num_samples),
        'hours_per_day': np.random.randint(1, 9, num_samples),
        'num_topics': np.random.randint(5, 51, num_samples),
        'num_days': np.random.randint(1, 61, num_samples)
    }
    
    df = pd.DataFrame(data)
    df['max_possible_minutes'] = df['hours_per_day'] * df['num_days'] * 60
    
    df['base_target_minutes'] = (
        df['num_topics'] * np.random.uniform(25, 45, num_samples) +
        df['num_subjects'] * np.random.uniform(50, 100, num_samples) +
        np.random.normal(0, 100, num_samples)
    )
    
    df['recommended_total_study_minutes'] = df.apply(
        lambda row: min(
            row['max_possible_minutes'] * 0.9,
            max(
                row['num_topics'] * 10,
                row['base_target_minutes']
            )
        ), axis=1
    )
    
    df['recommended_total_study_minutes'] = df['recommended_total_study_minutes'] + np.random.normal(0, 50, num_samples)
    df['recommended_total_study_minutes'] = df['recommended_total_study_minutes'].round().astype(int)
    
    # Ensure recommended_total_study_minutes is not negative
    df['recommended_total_study_minutes'] = df['recommended_total_study_minutes'].apply(lambda x: max(0, x))
    
    return df[['num_subjects', 'hours_per_day', 'num_topics', 'num_days', 'recommended_total_study_minutes']]

# Generate synthetic data
print("Generating synthetic training data...")
synthetic_df = generate_synthetic_data(1000)
print(f"Generated {len(synthetic_df)} training samples")
print("\nSample data:")
print(synthetic_df.head())

# Define features (X) and target (y)
X = synthetic_df[['num_subjects', 'hours_per_day', 'num_topics', 'num_days']]
y = synthetic_df['recommended_total_study_minutes']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"\nTraining data shape: {X_train.shape}")
print(f"Testing data shape: {X_test.shape}")

print("\nTraining RandomForestRegressor model...")
model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)
print("Model training complete.")

# Evaluate model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\nModel Evaluation:")
print(f"Mean Absolute Error (MAE): {mae:.2f} minutes")
print(f"R-squared (R2) Score: {r2:.2f}")

# Save model
model_filename = 'study_schedule_model.joblib'
joblib.dump(model, model_filename)
print(f"\nModel saved to {model_filename}")

# Test prediction
def predict_study_time(num_subjects, hours_per_day, num_topics, num_days):
    input_data = pd.DataFrame([[num_subjects, hours_per_day, num_topics, num_days]],
                              columns=['num_subjects', 'hours_per_day', 'num_topics', 'num_days'])
    prediction = model.predict(input_data)[0]
    predicted_minutes = int(max(0, round(prediction)))
    average_time_per_topic_minutes = predicted_minutes / num_topics if num_topics > 0 else 0
    return predicted_minutes, average_time_per_topic_minutes

# Example prediction
print("\n--- Example Prediction ---")
example_subjects = 3
example_hours_day = 4
example_topics = 25
example_days = 30

predicted_minutes, time_per_topic = predict_study_time(
    example_subjects, example_hours_day, example_topics, example_days
)

print(f"Input: Subjects={example_subjects}, Hours/Day={example_hours_day}, Topics={example_topics}, Days={example_days}")
print(f"Recommended Total Study Minutes: {predicted_minutes} minutes")
print(f"Which is approximately {predicted_minutes / 60:.2f} hours over {example_days} days.")
print(f"Average daily study minutes: {predicted_minutes / example_days:.2f} minutes")
print(f"Average time per topic: {time_per_topic:.2f} minutes")
