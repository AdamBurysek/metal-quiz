import { Routes, Route, Link } from "react-router-dom";
import GamePage from "./components/gamePage";
import StartPage from "./components/startPage";
import ResultsPage from "./components/resultsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
