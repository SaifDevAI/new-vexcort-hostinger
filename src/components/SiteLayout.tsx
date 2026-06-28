import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useState, useEffect, useRef } from "react";

export function SiteLayout({ children }: { children: ReactNode }) {
  // Default to true if sessionStorage has not been checked, avoiding rendering pages underneath
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("cortvex_splash_shown");
    if (hasShown === "true") {
      setShowSplash(false);
      return;
    }

    // Double the playback speed of the splash video once it loads
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.45;
    }

    // Auto-fadeout after 1.5s
    const timer = setTimeout(() => {
      setFadeOut(true);
      sessionStorage.setItem("cortvex_splash_shown", "true");
      setTimeout(() => {
        setShowSplash(false);
      }, 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSplashEnd = () => {
    setFadeOut(true);
    sessionStorage.setItem("cortvex_splash_shown", "true");
    setTimeout(() => {
      setShowSplash(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showSplash && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFAFA] transition-opacity duration-500 ease-in-out ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="w-full max-w-[320px] px-6">
            <video
              ref={videoRef}
              src="/splash_screen.mp4"
              autoPlay
              muted
              playsInline
              onPlay={(e) => {
                // Apply speed increase as soon as playback starts
                e.currentTarget.playbackRate = 1.45;
              }}
              onEnded={handleSplashEnd}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
