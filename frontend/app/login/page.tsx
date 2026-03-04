"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

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
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setIsLoading(true);
    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 900));
    login(email);
    router.push("/movies");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white dark:bg-[#020817] transition-colors duration-300">
      {/* Animated background blobs - Unique Light Mode Colors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-400/50 dark:bg-serenya-primary/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/30 dark:bg-serenya-accent/10 blur-[100px] animate-pulse delay-1000" />
        
      </div>

      {/* Large STREAMSMART Watermark - Bottom Center */}
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
              Welcome Back
            </div>
            <h1 className="text-3xl lowercase sm:text-4xl font-star text-serenya-dark dark:text-white tracking-wider mb-2 transition-colors">
              Sign In
            </h1>
            <p className="text-serenya-dark/60 dark:text-white/50 text-sm font-raleway transition-colors">
              Enter your credentials to continue streaming
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Password"
                autoComplete="current-password"
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

            {/* Forgot password */}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-serenya-accent/70 hover:text-serenya-accent font-raleway transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              id="sign-in-btn"
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
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

          {/* Sign up link */}
          <p className="text-center text-serenya-dark/40 dark:text-white/30 text-xs font-raleway mt-6 transition-colors">
            Don&apos;t have an account?{" "}
            <button className="text-serenya-accent hover:text-serenya-accent/80 transition-colors font-medium">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
