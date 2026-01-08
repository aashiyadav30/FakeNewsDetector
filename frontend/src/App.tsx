import { useState } from "react";
import Detect from "./pages/Detect";
import History from "./pages/History";
import News from "./pages/News";

function App() {
  const [page, setPage] = useState<
    "news" | "detect" | "history"
  >("news");

  return (
    <>
      <div className="flex gap-6 p-4 bg-[#2F4F4F] text-white">
        <button onClick={() => setPage("news")}>News</button>
        <button onClick={() => setPage("detect")}>Detect</button>
        <button onClick={() => setPage("history")}>History</button>
      </div>

      {page === "news" && <News />}
      {page === "detect" && <Detect />}
      {page === "history" && <History />}
    </>
  );
}

export default App;