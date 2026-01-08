import axios from "axios";

const GNEWS_BASE_URL = "https://gnews.io/api/v4/top-headlines";

export const fetchLatestNews = async (category?: string) => {
  try {
    console.log("Fetching news with API key:", process.env.GNEWS_API_KEY?.substring(0, 5) + "...");
    // Map incoming category to GNews topic values when applicable
    // GNews topic values: world, nation, business, technology, entertainment, sports, science, health
    const categoryMap: Record<string, string | undefined> = {
      sports: "sports",
      film: "entertainment",
      politics: "nation",
      "local news": undefined,
      local: undefined,
    };

    const topic = category ? categoryMap[category.toLowerCase()] ?? undefined : undefined;

    const params: any = {
      token: process.env.GNEWS_API_KEY,
      lang: "en",
      country: "in",
      max: 10,
    };

    if (topic) {
      params.topic = topic;
    }

    const response = await axios.get(GNEWS_BASE_URL, { params });

    return response.data.articles;
  } catch (error: any) {
    console.error("GNews API Error Details:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    
    // Temporary fallback with mock data
    console.log("Returning mock news data due to API error");
    return [
      {
        title: "Sample News 1",
        description: "This is a temporary mock news item",
        url: "https://example.com",
        source: { name: "Mock Source" },
        image: "https://via.placeholder.com/300x200",
        publishedAt: new Date().toISOString(),
      }
    ];
  }
};
