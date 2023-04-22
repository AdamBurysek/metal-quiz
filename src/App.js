import { Routes, Route, Link } from "react-router-dom";
import GamePage from "./components/gamePage";
import StartPage from "./components/startPage";
import NotFound from "./components/notFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
