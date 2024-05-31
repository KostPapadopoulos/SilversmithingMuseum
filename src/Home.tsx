import "./Home.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <div className="background-image">
        <Link to="/about" style={{ textDecoration: "none" }}>
          <div className="about-button">
            <div className="about-button-text">
              ➜ Click here to learn more about the Museum
            </div>
          </div>
        </Link>
        <div className="location-text">
          🏛️Ακρόπολη Ιτς Καλέ, Κάστρο Ιωαννίνων 45221, Ιωάννινα
          <br></br>
          <br></br> ☎ 26510 64065
        </div>
        <div className="hours-text">
          🕒 1η Μαρτίου - 15 Οκτωβρίου: 10:00 - 18:00 <br></br> 16 Οκτωβρίου -
          28 Φεβρουαρίου: 10:00 - 17:00 <br></br>
          Κλειστό: Κάθε Τρίτη 1η Ιανουαρίου <br></br> 17 Ιανουαρίου (τοπική
          εορτή) <br></br> Μ. Παρασκευή (μέχρι 12:00 μ.μ.) <br></br> Κυριακή του
          Πάσχα <br></br> 1η Μαΐου <br></br> 15 Αυγούστου <br></br> 25-26
          Δεκεμβρίου
        </div>
        <div className="ticket-text">
          🎟️Γενική είσοδος: 4 € <br></br> Μειωμένο εισιτήριο: 2 €. <br></br>
          Δωρεάν Είσοδος ➜ &nbsp;
          <a
            href="https://www.piop.gr/el/diktuo-mouseiwn/Mouseio-Argyrotexnias/~/media/Files/PIOP/Museums/free-entrance-gr-2023a.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: "bold", color: "white" }}
          >
            δείτε εδώ
          </a>
          <br></br>
          Ημέρες ελεύθερης εισόδου : <br></br> 18 Μαΐου (Διεθνής Ημέρα Μουσείων){" "}
          <br></br> 5 Ιουνίου (Παγκόσμια Ημέρα Περιβάλλοντος) <br></br>{" "}
          Τελευταίο Σ/Κ Σεπτεμβρίου (Ευρωπαϊκές Ημέρες Πολιτιστικής Κληρονομιάς)
        </div>
        <div className="scroll-instruction">
          <p>Scroll down to see more!</p>
        </div>
      </div>
      <div className="second-image"></div>
      <Link to="/games" style={{ textDecoration: "none" }}>
        <div className="games-button">
          <div className="games-image-text">Try some of our games!</div>
        </div>
      </Link>
      <Link to="/all-artifacts" style={{ textDecoration: "none" }}>
        <div className="artifacts-button">
          <div className="artifacts-image-text">Browse Artifacts</div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
