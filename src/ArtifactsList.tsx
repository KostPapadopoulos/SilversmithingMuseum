import "./ArtifactsList.css";
import { Link } from "react-router-dom";

const ArtifactsList: React.FC = () => {
  return (
    <div>
      <div className="artifacts-image"></div>
      <div className="artifacts-return-button">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="artifacts-return-button-text">
            ← Return To Homepage
          </div>
        </Link>
      </div>
      <Link to="/compass">
        <div className="compass-button">
          <div className="compass-button-text">3D Compass</div>
        </div>
      </Link>
      <Link to="/ashtray">
        <div className="ashtray-button">
          <div className="ashtray-button-text">3D Ashtray</div>
        </div>
      </Link>
    </div>
  );
};

export default ArtifactsList;
