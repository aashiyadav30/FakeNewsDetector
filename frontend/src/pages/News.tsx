import { useEffect, useState } from "react";
import { fetchNews } from "../services/newsApi";
import { detectNews } from "../services/detectApi";

const News = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  const handleDetect = async (article: any) => {
    const text = `${article.title}. ${article.description || ""}`;
    const result = await detectNews(text);
    alert(
      `Verdict: ${result.verdict}\nConfidence: ${result.confidence}`
    );
  };

  if (loading) {
    return <p className="p-6">Loading news...</p>;
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] p-6">
      <h1 className="text-3xl font-semibold text-[#2F4F4F] mb-6">
        Latest News
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">
                {article.title}
              </h2>

              <p className="text-sm text-gray-600 mb-3">
                {article.description}
              </p>

              <div className="text-xs text-gray-500 mb-3 flex justify-between">
                <span>{article.source?.name}</span>
                <span>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>

              <button
                onClick={() => handleDetect(article)}
                className="w-full bg-[#3B6F73] text-white py-2 rounded-lg hover:opacity-90"
              >
                Check Authenticity
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
