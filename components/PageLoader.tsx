"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import logoDark from "@/public/lotties/logo-dark.json";

export default function PageLoader() {
  const lottieRef = useRef<any>(null);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Play the animation immediately
    lottieRef.current?.play();

    // After animation completes (~2s) start fade-out
    const fadeTimer = setTimeout(() => setFading(true), 2000);

    // Remove from DOM after fade finishes (0.6s transition)
    const removeTimer = setTimeout(() => setVisible(false), 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div style={{ width: 120, height: 60 }}>
        <Lottie
          lottieRef={lottieRef}
          animationData={logoDark}
          loop={false}
          autoplay={false}
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        />
      </div>
    </div>
  );
}
