import { useEffect, useState } from "react";
import { usePreload } from "../hooks/usePreload";
import "../styles/loading.css";

interface LoadingOverlayProps {
  onFinish: () => void;
}

export default function LoadingOverlay({ onFinish }: LoadingOverlayProps) {
  const { progress, done } = usePreload({
    images: ["/images/controller-alpha.png", "/images/db.png", "/images/bg.png"],
    texts: ["/content/about.md"],
    durationMs: 10000, // biar ga keburu2
  });

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (done) {
      handleFinish();
    }
  }, [done]);

  const handleFinish = () => {
    setHidden(true);

    // unlock audio di browser
    const dummy = new Audio();
    dummy.muted = true;
    dummy.play().catch(() => {
      // biasanya no error, tapi biar aman ditangkap
    });

    const t = setTimeout(() => onFinish(), 500); // tunggu fade
    return () => clearTimeout(t);
  };

  return (
    <div
      className={`loading-overlay ${hidden ? "hidden" : ""}`}
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="loading-content">
        <img src="/images/db.png" alt="DB Logo" className="loading-logo" />
        <img
          src="/images/controller-alpha.png"
          alt="Controller"
          className="loading-controller"
        />
        <p className="loading-percent">{progress}%</p>

        {/* tombol Skip */}
        {!done && (
          <button className="skip-btn" onClick={handleFinish}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
