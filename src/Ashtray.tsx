import React, { useEffect, Suspense, useState, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import "./Ashtray.css";

const AshtrayModel: React.FC<{ path: string }> = ({ path }) => {
  const materials = useLoader(MTLLoader, "/ashtray.mtl");
  const obj = useLoader(OBJLoader, path, (loader) => {
    loader.setMaterials(materials);
  });
  if (!obj) {
    console.error("Failed to load the 3D object");
  }
  return <primitive object={obj} scale={[5.5, 5.5, 5.5]} />;
};

const Ashtray: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Greek");
  const [isTextVisible, setIsTextVisible] = useState(false);
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
      "This image features a beautifully ornate, vintage golden ashtray. Its intricate design showcases an elaborate floral motif with detailed carvings and embellishments, exuding a sense of luxury and antiquity. The ashtray has a smooth, polished oval basin at its center, surrounded by raised scrollwork and richly textured patterns. Its symmetrical shape with curved edges highlights the classical and elegant style of this exquisite piece",
    Greek:
      "Αυτή η εικόνα παραθέτει ένα όμορφα διακοσμημένο, vintage χρυσό τασάκι. Ο περίπλοκος σχεδιασμός του παρουσιάζει ένα περίτεχνο φυτικό μοτίβο με λεπτομερή σκαλίσματα και στολίδια, που αποπνέουν μια αίσθηση πολυτέλειας και αρχαιότητας. Το τασάκι έχει μια λεία, γυαλισμένη οβάλ λεκάνη στο κέντρο του, που περιβάλλεται από υπερυψωμένα κυλινδρικά έργα και σχέδια με πλούσια υφή. Το συμμετρικό του σχήμα με τις καμπύλες άκρες αναδεικνύει το κλασικό και κομψό στυλ αυτού του εξαίσιου κομματιού",
    French:
      "Cette image présente un cendrier doré vintage magnifiquement orné. Son design complexe met en valeur un motif floral élaboré avec des sculptures et des embellissements détaillés, dégageant un sentiment de luxe et d'antiquité. Le cendrier possède en son centre un bassin ovale lisse et poli, entouré de volutes en relief et de motifs richement texturés. Sa forme symétrique aux bords incurvés met en valeur le style classique et élégant de cette pièce exquise.",
    German:
      "Dieses Bild zeigt einen wunderschön verzierten, goldenen Vintage-Aschenbecher. Sein aufwendiges Design zeigt ein aufwendiges Blumenmotiv mit detaillierten Schnitzereien und Verzierungen und strahlt ein Gefühl von Luxus und Antike aus. Der Aschenbecher hat in der Mitte ein glattes, poliertes ovales Becken, das von erhabenen Schnörkeln und reich strukturierten Mustern umgeben ist. Seine symmetrische Form mit geschwungenen Kanten unterstreicht den klassischen und eleganten Stil dieses exquisiten Stücks",
    Spanish:
      "Esta imagen presenta un cenicero dorado vintage bellamente adornado. Su intrincado diseño muestra un elaborado motivo floral con tallas y adornos detallados, que irradian una sensación de lujo y antigüedad. El cenicero tiene un lavabo ovalado liso y pulido en el centro, rodeado de volutas en relieve y patrones de rica textura. Su forma simétrica con bordes curvos resalta el estilo clásico y elegante de esta exquisita pieza.",
  };

  const playAudio = () => {
    const audioFiles: { [key: string]: string } = {
      English: "/audio/A_english.mp3",
      Greek: "/audio/A_greek.mp3",
      French: "/audio/A_french.mp3",
      German: "/audio/A_german.mp3",
      Spanish: "/audio/A_spanish.mp3",
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

    audio
      .play()
      .then(() => {
        setTextContent(languageTexts[selectedLanguage]);
        setIsTextVisible(true);
      })
      .catch((error) => {
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
      <div className="ashtray-text">3D Ashtray</div>
      <div className="ashtray-object">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} scale={[100, 100, 100]} />
          <Suspense fallback={null}>
            <AshtrayModel path="/ashtray.obj" />
          </Suspense>
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
      <div className="ashtray-zoom-instruction">
        Scroll to zoom in-out of the object!
      </div>
      <div className="ashtray-zoom-instruction2">
        Hold right click and drag to move the object!
      </div>
      <div className="ashtray-back-button">
        <Link to="/all-artifacts" style={{ textDecoration: "none" }}>
          <div className="ashtray-back-button-text">
            ← Return To See All Artifacts
          </div>
        </Link>
      </div>
      <div className="ashtray-return-button">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="ashtray-return-button-text">← Return To Homepage</div>
        </Link>
      </div>
      <div className="sound-description-ashtray">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
      <div className="play-audio-ashtray">
        <button onClick={playAudio}>Play</button>
        <button onClick={stopAudio}>Stop</button>
      </div>
      {isTextVisible && <div className="text-box-ashtray">{textContent}</div>}
    </div>
  );
};

export default Ashtray;
