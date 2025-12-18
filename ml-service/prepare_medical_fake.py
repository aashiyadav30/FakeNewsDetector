import pandas as pd

# Load the dataset
df = pd.read_csv("ClaimFakeCOVID-19_5.csv")

# Use the 'title' column as fake news text
df["content"] = df["title"].fillna("")

# Assign FAKE label
df["label"] = 1

# Keep only required columns
df = df[["content", "label"]]

# Save cleaned dataset
df.to_csv("MedicalFake_clean.csv", index=False)

print("✅ Medical fake dataset prepared")
print("Total samples:", len(df))
