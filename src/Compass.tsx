import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import "./Compass.css";

const CompassModel: React.FC<{ path: string }> = ({ path }) => {
  const materials = useLoader(MTLLoader, "/compass.mtl");
  const obj = useLoader(OBJLoader, path, (loader) => {
    loader.setMaterials(materials);
  });
  if (!obj) {
    console.error("Failed to load the 3D object");
  }
  return <primitive object={obj} scale={[4, 4, 4]} />;
};

const Compass: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Greek");
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [textContent, setTextContent] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(195, 195, 195)";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const languageTexts: { [key: string]: string } = {
    English:
      "This is a vintage mathematical compass, a tool that has been fundamental in the field of geometry for centuries. Made from metal, its construction showcases both durability and precision. The compass consists of two pointed legs, each with a sharp end for anchoring on a drawing surface. One leg is equipped with a pencil holder, allowing for the drawing of precise circles and arcs. The joint at the top allows for adjustable angles, facilitating the drawing of various sizes of circles. Its aged appearance and intricate design reflect its historical significance and the craftsmanship of a bygone era. This compass is not just a tool but a piece of mathematical history, representing the enduring quest for accuracy and knowledge in geometry.",
    Greek:
      "Πρόκειται για μια vintage μαθηματική πυξίδα, ένα εργαλείο που είναι θεμελιώδες στον τομέα της γεωμετρίας εδώ και αιώνες. Κατασκευασμένο από μέταλλο, η κατασκευή του προβάλλει τόσο ανθεκτικότητα όσο και ακρίβεια. Η πυξίδα αποτελείται από δύο μυτερά πόδια, το καθένα με ένα αιχμηρό άκρο για αγκύρωση σε μια επιφάνεια σχεδίασης. Το ένα πόδι είναι εξοπλισμένο με θήκη για μολύβι, επιτρέποντας τη σχεδίαση κύκλων και τόξων με ακρίβεια. Η άρθρωση στο πάνω μέρος επιτρέπει ρυθμιζόμενες γωνίες, διευκολύνοντας τη σχεδίαση κύκλων διαφόρων μεγεθών. Η παλιά του εμφάνιση και ο περίπλοκος σχεδιασμός του αντικατοπτρίζουν την ιστορική του σημασία και τη δεξιοτεχνία μιας περασμένης εποχής. Αυτή η πυξίδα δεν είναι απλώς ένα εργαλείο, αλλά ένα κομμάτι της μαθηματικής ιστορίας, που αντιπροσωπεύει τη διαρκή αναζήτηση για ακρίβεια και γνώση στη γεωμετρία.",
    French:
      "Il s'agit d'une boussole mathématique vintage, un outil fondamental dans le domaine de la géométrie depuis des siècles. Fabriquée en métal, sa construction met en valeur à la fois durabilité et précision. La boussole se compose de deux pattes pointues, chacune dotée d'une extrémité pointue permettant de l'ancrer sur une surface de dessin. Un pied est équipé d'un porte-crayon, permettant de dessiner des cercles et des arcs précis. L'articulation supérieure permet des angles réglables, facilitant le dessin de cercles de différentes tailles. Son aspect vieilli et son design complexe reflètent son importance historique et le savoir-faire d’une époque révolue. Cette boussole n'est pas seulement un outil mais un morceau d'histoire mathématique, représentant la quête constante de précision et de connaissances en géométrie..",
    German:
      "Dies ist ein klassischer mathematischer Kompass, ein Werkzeug, das seit Jahrhunderten auf dem Gebiet der Geometrie von grundlegender Bedeutung ist. Die aus Metall gefertigte Konstruktion zeichnet sich durch Langlebigkeit und Präzision aus. Der Zirkel besteht aus zwei spitzen Beinen mit jeweils einem scharfen Ende zur Befestigung auf einer Zeichenfläche. Ein Bein ist mit einem Stifthalter ausgestattet, der das Zeichnen präziser Kreise und Bögen ermöglicht. Das Gelenk an der Oberseite ermöglicht verstellbare Winkel und erleichtert das Zeichnen von Kreisen unterschiedlicher Größe. Sein gealtertes Aussehen und sein aufwendiges Design spiegeln seine historische Bedeutung und die Handwerkskunst einer vergangenen Ära wider. Dieser Kompass ist nicht nur ein Werkzeug, sondern ein Stück mathematischer Geschichte und repräsentiert das andauernde Streben nach Genauigkeit und Wissen in der Geometrie.",
    Spanish:
      "Se trata de una brújula matemática antigua, una herramienta que ha sido fundamental en el campo de la geometría durante siglos. Hecho de metal, su construcción muestra durabilidad y precisión. La brújula consta de dos patas puntiagudas, cada una con un extremo afilado para anclarse en una superficie de dibujo. Una pata está equipada con un portalápices, lo que permite dibujar círculos y arcos precisos. La articulación en la parte superior permite ajustar ángulos, facilitando el dibujo de círculos de varios tamaños. Su apariencia envejecida y su intrincado diseño reflejan su importancia histórica y la artesanía de una época pasada. Esta brújula no es sólo una herramienta, sino una parte de la historia de las matemáticas, que representa la búsqueda duradera de la precisión y el conocimiento en geometría.",
  };

  const playAudio = () => {
    const audioFiles: { [key: string]: string } = {
      English: "/audio/english.mp3",
      Greek: "/audio/greek.mp3",
      French: "/audio/french.mp3",
      German: "/audio/german.mp3",
      Spanish: "/audio/spanish.mp3",
    };

    const audioSrc = audioFiles[selectedLanguage];
    console.log("Attempting to play audio:", audioSrc);

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    audio.addEventListener("ended", () => {
      setTimeout(() => {
        setIsTextVisible(false);
      }, 1800);
    });

    audio.addEventListener("play", () => {
      setTextContent(languageTexts[selectedLanguage]);
      setIsTextVisible(true);
    });

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsTextVisible(false);
    }
  };

  return (
    <div>
      <div className="compass-text">3D Compass</div>
      <div className="compass-object">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} />
          <Suspense fallback={null}>
            <CompassModel path="/compass.obj" />
          </Suspense>
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
      <div className="compass-zoom-instruction">
        Scroll to zoom in-out of the object!
      </div>
      <div className="compass-zoom-instruction2">
        Hold right-click and drag to move the object!
      </div>
      <div className="compass-back-button">
        <Link to="/all-artifacts" style={{ textDecoration: "none" }}>
          <div className="compass-back-button-text">
            ← Return To See All Artifacts
          </div>
        </Link>
      </div>
      <div className="compass-return-button">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="compass-return-button-text">← Return To Homepage</div>
        </Link>
      </div>
      <div className="sound-description">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
      <div className="play-audio">
        <button onClick={playAudio}>Play</button>
        <button onClick={stopAudio}>Stop</button>
      </div>
      {isTextVisible && <div className="language-text-box">{textContent}</div>}
    </div>
  );
};

export default Compass;
