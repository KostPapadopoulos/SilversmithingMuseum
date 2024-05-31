import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Games from "./Games";
import Home from "./Home";
import Artifacts from "./ArtifactsList";
import Compass from "./Compass";
import Ashtray from "./Ashtray";
import MuseumInfo from "./MuseumInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/games" element={<Games />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<MuseumInfo />} />
        <Route path="/all-artifacts" element={<Artifacts />} />
        {<Route path="/compass" element={<Compass />} />}
        {<Route path="/ashtray" element={<Ashtray />} />}
      </Routes>
    </Router>
  );
}

export default App;
