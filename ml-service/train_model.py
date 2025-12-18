import pandas as pd
import joblib
import nltk

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

nltk.download("stopwords")

# =========================
# Load datasets
# =========================

fake_df = pd.read_csv("Fake.csv")
true_df = pd.read_csv("True.csv")

# Add labels
fake_df["label"] = 1   # FAKE
true_df["label"] = 0   # REAL

# Create unified text column
fake_df["content"] = fake_df["title"].fillna("") + " " + fake_df["text"].fillna("")
true_df["content"] = true_df["title"].fillna("") + " " + true_df["text"].fillna("")

# Keep only required columns
fake_df = fake_df[["content", "label"]]
true_df = true_df[["content", "label"]]

# Combine datasets
df = pd.concat([fake_df, true_df], axis=0).reset_index(drop=True)

print("Original dataset distribution:")
print(df["label"].value_counts())

# =========================
# Balance dataset (CRITICAL)
# =========================

real_df = df[df["label"] == 0]
fake_df = df[df["label"] == 1]

# Safety check
if len(real_df) < 20:
    raise ValueError("❌ Not enough REAL samples. Add more real news before training.")

fake_df = fake_df.sample(n=len(real_df), random_state=42)

df = pd.concat([real_df, fake_df]).sample(frac=1, random_state=42).reset_index(drop=True)

print("\nBalanced dataset distribution:")
print(df["label"].value_counts())

# =========================
# Train-test split
# =========================

X = df["content"]
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# =========================
# TF-IDF Vectorization
# =========================

vectorizer = TfidfVectorizer(
    stop_words="english",
    max_df=0.7,
    min_df=2,        # lowered because dataset is small
    ngram_range=(1, 2)
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# =========================
# Train model (BALANCED)
# =========================

model = LogisticRegression(
    max_iter=1000,
    class_weight="balanced"
)

model.fit(X_train_vec, y_train)

# =========================
# Evaluation
# =========================

y_pred = model.predict(X_test_vec)

accuracy = accuracy_score(y_test, y_pred)

print("\nAccuracy:", round(accuracy, 4))
print("\nClassification Report:")
print(classification_report(y_test, y_pred, zero_division=0))

# =========================
# Save model & vectorizer
# =========================

joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("\n✅ Model and vectorizer saved successfully")
