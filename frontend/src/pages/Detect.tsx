import { useState } from "react";
import { detectNews } from "../services/detectApi";

const Detect = () => {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDetect = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      setError("");
      const data = await detectNews(content);
      setResult(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold text-[#2F4F4F] mb-4">
          Fake News Detector
        </h1>

        <textarea
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring"
          rows={5}
          placeholder="Paste news content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={handleDetect}
          disabled={loading}
          className="w-full bg-[#3B6F73] text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check News"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {result && (
          <div className="mt-6 border-t pt-4">
            <p className="font-medium">
              Verdict:{" "}
              <span
                className={
                  result.verdict === "REAL"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {result.verdict}
              </span>
            </p>
            <p>Confidence: {result.confidence}</p>
            <p className="text-sm text-gray-600 mt-2">
              {result.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detect;
