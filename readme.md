📰 Fake News Detector (AI-Powered Web Application)

An end-to-end AI-powered fake news detection platform that helps users analyze the authenticity of news articles using a hybrid intelligence approach — combining machine learning, linguistic signals, and confidence-based reasoning.

This project is designed as a full-stack production-style system, not just a standalone ML model.

✨ Key Highlights

🔍 Detects FAKE / REAL / UNCERTAIN news

📊 Confidence-aware predictions (not blind yes/no)

🧠 Hybrid AI:

Machine Learning (TF-IDF + Logistic Regression)

Rule-based red-flag keyword analysis

🩺 Medical & political misinformation support

📰 Browse and analyze live news via News API

🗂️ Detection history stored in database

🧠 How It Works

User enters news text or selects a live article

Frontend sends content to Backend API

Backend forwards text to ML Service

ML model predicts verdict + confidence

Backend applies hybrid logic (ML + rules)

Final verdict is returned and optionally saved to history

Frontend → Backend → ML Service → Verdict

🛠️ Tech Stack
Frontend

React

TypeScript

Tailwind CSS

Axios

Backend

Node.js

Express

TypeScript

Prisma ORM

PostgreSQL

ML Service

Python

Flask

scikit-learn

TF-IDF Vectorizer

Logistic Regression

📦 Project Structure
FakeNewsDetector/
│
├── frontend/        # React + TypeScript UI
│
├── backend/         # Express + Prisma API
│
├── ml-service/      # Python ML service
│   ├── data/
│   │   ├── raw/     # Raw REAL & FAKE datasets
│   │   └── processed/
│   ├── train_model.py
│   ├── app.py
│   └── model.pkl
│
└── README.md

🚀 Running the Project Locally
1️⃣ Backend
cd backend
npm install
npm run dev


Runs on: http://localhost:5000

2️⃣ ML Service
cd ml-service
python -m venv venv
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py


Runs on: http://localhost:5001

3️⃣ Frontend
cd frontend
npm install
npm run dev


Runs on: http://localhost:5173

🧪 API Endpoints
Detect News
POST /api/detect

{
  "content": "News article text here"
}

Get Latest News
GET /api/news

Detection History
GET /api/history

📊 Machine Learning Details

Vectorization: TF-IDF (unigrams + bigrams)

Model: Logistic Regression

Training strategy:

Class-weighted loss to handle imbalance

Confidence-based uncertainty detection

Output:

Verdict: REAL | FAKE | UNCERTAIN

Confidence score (0–1)

⚠️ Disclaimer

This system does not perform factual verification or real-time fact checking.
Predictions are based on linguistic patterns, training data, and heuristic signals, and should be used as a decision-support tool, not a definitive source of truth.

🌱 Future Improvements

Advanced NLP models (BERT / Transformer-based)

Source credibility scoring

Multilingual support

User authentication & personalization

Explainable AI (highlighting influential phrases)

👩‍💻 Author

Built with ❤️ as a full-stack + ML engineering project to explore real-world AI system design, not just model accuracy.
