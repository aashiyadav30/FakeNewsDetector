import { useEffect, useState } from "react";
import { fetchNews } from "../services/newsApi";
import { detectNews } from "../services/detectApi";

const CATEGORIES = ["All", "Sports", "Politics", "Film", "Local"];

const News = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const load = async (category?: string) => {
    setLoading(true);
    try {
      const data = await fetchNews(category && category !== "All" ? category.toLowerCase() : undefined);
      setArticles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(selectedCategory);
  }, [selectedCategory]);

  const handleDetect = async (article: any) => {
    const text = `${article.title}. ${article.description || ""}`;
    const result = await detectNews(text);
    alert(
      `Verdict: ${result.verdict}\nConfidence: ${result.confidence}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1EEDC] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#B3C8CF] border-t-[#BED7DC] rounded-full animate-spin"></div>
          <p className="mt-4 text-[#2F4F4F] font-medium">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content - NO min-h-screen to avoid overlap */}
      <div className="bg-[#F1EEDC] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-[#2F4F4F] mb-8">Latest News</h1>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 border-2 ${
                  selectedCategory === cat
                    ? "bg-[#B3C8CF] border-[#B3C8CF] text-[#2F4F4F] shadow-md scale-105"
                    : "bg-white border-[#E5DDC5] text-gray-700 hover:border-[#BED7DC] hover:bg-[#F1EEDC]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                {/* Image with controlled aspect ratio */}
                {article.image && (
                  <div 
                    className="w-full aspect-[16/9] bg-[#E5DDC5] cursor-pointer overflow-hidden"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 
                    className="font-bold text-xl mb-3 text-[#2F4F4F] line-clamp-2 cursor-pointer hover:text-[#3B6F73] transition-colors"
                    onClick={() => setSelectedArticle(article)}
                  >
                    {article.title}
                  </h2>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {article.description}
                  </p>

                  {/* Metadata */}
                  <div className="text-xs text-gray-500 mb-4 flex justify-between items-center pt-3 border-t border-[#E5DDC5]">
                    <span className="font-semibold text-[#3B6F73]">{article.source?.name}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleDetect(article)}
                    className="w-full bg-[#B3C8CF] text-[#2F4F4F] font-semibold py-3 rounded-lg hover:bg-[#BED7DC] transition-colors duration-200 shadow-sm"
                  >
                    Check Authenticity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            {selectedArticle.image && (
              <div className="w-full aspect-[2/9] bg-[#E5DDC5] overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-[#2F4F4F] flex-grow pr-4">
                  {selectedArticle.title}
                </h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-bold flex-shrink-0 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                <span className="font-semibold text-[#3B6F73]">
                  {selectedArticle.source?.name}
                </span>
                <span>•</span>
                <span>
                  {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 text-base leading-relaxed">
                  {selectedArticle.description}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDetect(selectedArticle)}
                  className="flex-1 bg-[#B3C8CF] text-[#2F4F4F] font-semibold py-3 rounded-lg hover:bg-[#BED7DC] transition-colors"
                >
                  Check Authenticity
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-3 border-2 border-[#E5DDC5] text-gray-600 font-medium rounded-lg hover:bg-[#F1EEDC] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default News;