from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# -------------------------
# App setup
# -------------------------
app = Flask(__name__)
CORS(app)

# -------------------------
# Load ML artifacts
# -------------------------
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

print("✅ ML model loaded successfully")

# -------------------------
# Health check
# -------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ML service running"}), 200

# -------------------------
# Prediction endpoint
# -------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"error": "Text field is required"}), 400

    text = data["text"]

    # Vectorize input
    text_vec = vectorizer.transform([text])

    # Predict
    prediction = model.predict(text_vec)[0]
    confidence = np.max(model.predict_proba(text_vec))

    verdict = "FAKE" if prediction == 1 else "REAL"

    return jsonify({
        "verdict": verdict,
        "confidence": round(float(confidence), 3)
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
