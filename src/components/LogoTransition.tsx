import { useEffect, useState } from "react";
import { useSound } from "../hooks/useSound";
import "../styles/loading.css";

interface LogoTransitionProps {
  onFinish: () => void;
}

export default function LogoTransition({ onFinish }: LogoTransitionProps) {
  const [hidden, setHidden] = useState(false);

  // efek suara start
  const playStart = useSound("/audio/start.mp3", 0.8);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);    // mulai fade out
      playStart();        // bunyi saat fade out
      const end = setTimeout(() => onFinish(), 800); // tunggu animasi selesai
      return () => clearTimeout(end);
    }, 3000); // tampil 3 detik
    return () => clearTimeout(timer);
  }, [onFinish, playStart]);

  return (
    <div className={`logo-transition ${hidden ? "hidden" : ""}`}>
      <img src="/images/ps.png" alt="PlayStation Logo" className="logo-ps" />
    </div>
  );
}
