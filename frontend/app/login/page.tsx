"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth-context";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "register") {
      if (!name.trim()) { setError("Name is required."); return; }
      if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    }

    setIsLoading(true);
    try {
      if (mode === "register") {
        await register(name.trim(), email, password);
      } else {
        await login(email, password);
      }
      router.push("/movies");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError("");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white dark:bg-[#020817] transition-colors duration-300">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-400/50 dark:bg-serenya-primary/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/30 dark:bg-serenya-accent/10 blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Large STREAMSMART watermark */}
      <div className="absolute bottom-[10px] left-0 right-0 flex justify-center opacity-10 pointer-events-none select-none z-0 overflow-hidden">
        <h1 className="text-[clamp(40px,10vw,140px)] font-bold leading-none tracking-widest font-star uppercase text-center whitespace-nowrap">
          STREAMSMART
        </h1>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.04] invert dark:invert-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-serenya-dark/10 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(73,136,196,0.05)] p-8 sm:p-10 transition-colors duration-300">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-serenya-primary/10 dark:bg-serenya-primary/20 border border-serenya-accent/20 dark:border-serenya-accent/30 text-serenya-accent dark:text-serenya-accent text-xs font-raleway font-semibold px-3 py-1.5 rounded-full mb-5 tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </div>
            <h1 className="text-3xl lowercase sm:text-4xl font-star text-serenya-dark dark:text-white tracking-wider mb-2 transition-colors">
              {mode === "login" ? "Sign In" : "Sign Up"}
            </h1>
            <p className="text-serenya-dark/60 dark:text-white/50 text-sm font-raleway transition-colors">
              {mode === "login"
                ? "Enter your credentials to continue streaming"
                : "Create an account to start streaming"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name — register only */}
            {mode === "register" && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-serenya-dark/40 dark:text-white/30 group-focus-within:text-serenya-accent transition-colors" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                  className="w-full bg-white/50 dark:bg-white/5 border border-serenya-dark/10 dark:border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-serenya-dark dark:text-white text-sm font-raleway placeholder:text-serenya-dark/40 dark:placeholder:text-white/30 focus:outline-none focus:border-serenya-accent/60 focus:bg-white/80 dark:focus:bg-white/8 transition-all"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-serenya-dark/40 dark:text-white/30 group-focus-within:text-serenya-accent transition-colors" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                autoComplete="email"
                className="w-full bg-white/50 dark:bg-white/5 border border-serenya-dark/10 dark:border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-serenya-dark dark:text-white text-sm font-raleway placeholder:text-serenya-dark/40 dark:placeholder:text-white/30 focus:outline-none focus:border-serenya-accent/60 focus:bg-white/80 dark:focus:bg-white/8 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-serenya-dark/40 dark:text-white/30 group-focus-within:text-serenya-accent transition-colors" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "register" ? "Password (min. 8 characters)" : "Password"}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                className="w-full bg-white/50 dark:bg-white/5 border border-serenya-dark/10 dark:border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-serenya-dark dark:text-white text-sm font-raleway placeholder:text-serenya-dark/40 dark:placeholder:text-white/30 focus:outline-none focus:border-serenya-accent/60 focus:bg-white/80 dark:focus:bg-white/8 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-serenya-dark/40 dark:text-white/30 hover:text-serenya-dark/70 dark:hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400/90 text-xs font-raleway pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full relative bg-serenya-primary hover:bg-serenya-primary/90 text-white font-raleway font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed group mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-serenya-dark/10 dark:bg-white/10" />
            <span className="text-serenya-dark/30 dark:text-white/30 text-xs font-raleway">or</span>
            <div className="flex-1 h-px bg-serenya-dark/10 dark:bg-white/10" />
          </div>

          {/* Guest */}
          <button
            id="guest-btn"
            onClick={() => router.push("/movies")}
            className="w-full border border-serenya-dark/10 dark:border-white/10 hover:border-serenya-dark/20 dark:hover:border-white/20 text-serenya-dark/60 dark:text-white/60 hover:text-serenya-dark/90 dark:hover:text-white/90 font-raleway text-sm py-3.5 rounded-xl transition-all duration-200 hover:bg-serenya-dark/5 dark:hover:bg-white/5"
          >
            Continue as Guest
          </button>

          {/* Mode toggle */}
          <p className="text-center text-serenya-dark/40 dark:text-white/30 text-xs font-raleway mt-6 transition-colors">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              id="mode-toggle-btn"
              onClick={toggleMode}
              className="text-serenya-accent hover:text-serenya-accent/80 transition-colors font-medium"
            >
              {mode === "login" ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
