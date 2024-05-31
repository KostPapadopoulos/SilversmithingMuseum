import "./Games.css"; // Import your CSS file
import { Link } from 'react-router-dom';



const Games: React.FC = () => {
  return (
    <div>
      <div className="game-image">
        <div className="error-text">
          <p>
            Coming Soon!
          </p>
        </div>
      </div>
      <div className="games-return-button">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="games-return-button-text">← Return To Homepage</div>
        </Link>
      </div>
    </div>
  );
};

export default Games;
