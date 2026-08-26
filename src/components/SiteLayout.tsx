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
    let hasShown = "false";
    try {
      hasShown = sessionStorage.getItem("Vexcort_splash_shown") || "false";
    } catch (e) {
      console.warn("sessionStorage is not available:", e);
    }

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
      try {
        sessionStorage.setItem("Vexcort_splash_shown", "true");
      } catch (e) {
        console.warn("sessionStorage is not available:", e);
      }
      setTimeout(() => {
        setShowSplash(false);
      }, 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSplashEnd = () => {
    setFadeOut(true);
    try {
      sessionStorage.setItem("Vexcort_splash_shown", "true");
    } catch (e) {
      console.warn("sessionStorage is not available:", e);
    }
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
              src="/splash_screen.mp4?v=2"
              autoPlay
              muted
              playsInline
              aria-hidden="true"
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
