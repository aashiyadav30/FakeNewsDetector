from dotenv import load_dotenv
load_dotenv()

import requests
import csv
import time
import os

API_KEY = os.getenv("GNEWS_API_KEY")  # reuse same key
BASE_URL = "https://gnews.io/api/v4/top-headlines"

OUTPUT_FILE = "True.csv"
MAX_ARTICLES = 3000   # good enough for training
BATCH_SIZE = 10       # GNews limit per request

articles_collected = 0
page = 1

with open(OUTPUT_FILE, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["title", "text", "label"])

    while articles_collected < MAX_ARTICLES:
        params = {
            "token": API_KEY,
            "lang": "en",
            "country": "in",
            "max": BATCH_SIZE,
            "page": page
        }

        response = requests.get(BASE_URL, params=params)

        if response.status_code != 200:
            print("Error fetching news:", response.text)
            break

        data = response.json()
        articles = data.get("articles", [])

        if not articles:
            break

        for article in articles:
            title = article.get("title", "")
            description = article.get("description", "")

            if title and description:
                writer.writerow([title, description, 0])  # 0 = REAL
                articles_collected += 1

                if articles_collected >= MAX_ARTICLES:
                    break

        print(f"Collected {articles_collected} real articles...")
        page += 1
        time.sleep(1)  # avoid rate limits

print("✅ True.csv created successfully")
print("API KEY FOUND:", os.getenv("GNEWS_API_KEY") is not None)
