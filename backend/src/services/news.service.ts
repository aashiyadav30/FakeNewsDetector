import axios from "axios";

const GNEWS_BASE_URL = "https://gnews.io/api/v4/top-headlines";

export const fetchLatestNews = async () => {
  const response = await axios.get(GNEWS_BASE_URL, {
    params: {
      token: process.env.GNEWS_API_KEY,
      lang: "en",
      country: "in",
      max: 10,
    },
  });

  return response.data.articles;
};
