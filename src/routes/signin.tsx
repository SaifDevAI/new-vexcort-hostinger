import { createFileRoute, useLocation } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign In - Cortvex" },
      { name: "description", content: "Sign in to your Cortvex account." },
    ],
    links: [{ rel: "canonical", href: "https://cortvex.com/signin" }],
  }),
  component: SignInPage,
});

function SignInPage() {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const taglineText = "Are you ready to scale your business?";
  const [typedTagline, setTypedTagline] = useState("");
  const mode = useMemo<"login" | "signup">(() => {
    const modeParam = new URLSearchParams(location.search).get("mode");
    return modeParam === "signup" ? "signup" : "login";
  }, [location.search]);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedTagline(taglineText.slice(0, index));
      if (index >= taglineText.length) {
        window.clearInterval(timer);
      }
    }, 52);

    return () => window.clearInterval(timer);
  }, []);

  const updateMode = (nextMode: "login" | "signup") => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", nextMode);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  useEffect(() => {
    setAuthError("");
    setAuthMessage("");
  }, [mode]);

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");
    setAuthMessage("");

    if (!email.trim() || !password) {
      setAuthError("Please enter both email and password.");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) {
          setAuthError(error.message);
        } else {
          setAuthMessage("Account created. Please check your email to verify your account.");
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setAuthError(error.message);
        } else {
          setAuthMessage("Signed in successfully.");
          setPassword("");
          window.location.href = "/";
        }
      }
    } catch {
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-22 md:pt-24">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-black/55" />
        <div className="absolute inset-0 z-20" style={{ background: "var(--gradient-hero)" }} />

        <div className="container-x relative z-30 py-5 md:py-6">
          <div className="grid min-h-[calc(100vh-10rem)] items-center gap-8 lg:grid-cols-2 lg:items-start">
            <div className="max-w-xl">
              <p className="eyebrow text-white">Cortvex Growth Partner</p>
              <h1 className="h-display mt-4 text-5xl text-white drop-shadow-[0_10px_32px_rgba(7,10,24,0.7)] md:text-6xl lg:text-7xl">
                {typedTagline}
                <span className="ml-1 inline-block h-[0.95em] w-[2px] animate-pulse align-[-0.1em] bg-[color:var(--brand)]" />
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/96 drop-shadow-[0_8px_26px_rgba(7,10,24,0.62)] md:text-2xl">
                Launch faster, automate smarter, and build a growth engine that keeps compounding.
              </p>
            </div>

            <div className="mx-auto w-full max-w-[28rem] lg:mx-0 lg:self-start lg:justify-self-end lg:pt-0">
              <div className="rounded-3xl border border-white/40 bg-[#0b1227]/62 p-6 shadow-[0_34px_80px_-34px_rgba(8,12,28,0.95)] backdrop-blur-xl">
                <p className="eyebrow text-white/90">Welcome back</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {mode === "signup" ? "Create your Cortvex account" : "Sign in to Cortvex"}
                </h2>
                <p className="mt-2 text-[0.95rem] text-white/75">
                  {mode === "signup"
                    ? "Book a meeting after account setup and manage your projects in one place."
                    : "Continue to your workspace and manage projects, automations, and growth."}
                </p>

                <form className="mt-5 space-y-3" onSubmit={handleAuthSubmit}>
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-white/90"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/35 bg-white/12 py-2 pl-10 pr-3 text-white placeholder:text-white/65 outline-none ring-0 focus:border-[#6E86FF] focus:shadow-[0_0_0_3px_rgba(110,134,255,0.18)]"
                        placeholder="you@company.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-white/90"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-white/35 bg-white/12 py-2 pl-10 pr-10 text-white placeholder:text-white/65 outline-none ring-0 focus:border-[#6E86FF] focus:shadow-[0_0_0_3px_rgba(110,134,255,0.18)]"
                        placeholder="Password"
                        autoComplete={mode === "signup" ? "new-password" : "current-password"}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white/80">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/45 bg-transparent"
                      />
                      Remember me
                    </label>
                    <a href="#" className="hover:text-white">
                      Forgot password?
                    </a>
                  </div>

                  {mode === "signup" && (
                    <div>
                      <label
                        className="mb-1.5 block text-sm font-medium text-white/90"
                        htmlFor="confirm-password"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                        <input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full rounded-xl border border-white/35 bg-white/12 py-2 pl-10 pr-10 text-white placeholder:text-white/65 outline-none ring-0 focus:border-[#6E86FF] focus:shadow-[0_0_0_3px_rgba(110,134,255,0.18)]"
                          placeholder="Confirm password"
                          autoComplete="new-password"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {authError ? (
                    <p className="rounded-lg border border-red-300/35 bg-red-500/12 px-3 py-2 text-sm text-red-100">
                      {authError}
                    </p>
                  ) : null}

                  {authMessage ? (
                    <p className="rounded-lg border border-emerald-300/35 bg-emerald-500/12 px-3 py-2 text-sm text-emerald-100">
                      {authMessage}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary mt-1 w-full py-2.5 text-base font-semibold"
                  >
                    {isSubmitting
                      ? mode === "signup"
                        ? "Creating Account..."
                        : "Signing In..."
                      : mode === "signup"
                        ? "Create Account"
                        : "Sign In"}
                  </button>
                </form>

                <p className="mt-4 text-center text-sm text-white/80">
                  {mode === "signup" ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => updateMode("login")}
                        className="font-medium text-white hover:underline"
                      >
                        Log In
                      </button>
                    </>
                  ) : (
                    <>
                      New to Cortvex?{" "}
                      <button
                        type="button"
                        onClick={() => updateMode("signup")}
                        className="font-medium text-white hover:underline"
                      >
                        Create an account
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
