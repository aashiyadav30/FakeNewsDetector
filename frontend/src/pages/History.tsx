import { useEffect, useState } from "react";
import { getHistory } from "../services/historyApi";

const History = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5EF] p-6">
      <h1 className="text-2xl font-semibold mb-6 text-[#2F4F4F]">
        Detection History
      </h1>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <p className="font-medium">{item.content}</p>
            <div className="text-sm mt-2 flex justify-between">
              <span
                className={
                  item.verdict === "REAL"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {item.verdict}
              </span>
              <span>Confidence: {item.confidence}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
