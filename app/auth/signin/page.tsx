"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { z } from "zod";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Invalid email address"),
  password: z.string().min(1, "Please enter your password"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [animatePanel, setAnimatePanel] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatePanel(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    setIsLoading(true);
    try {
      signInSchema.parse({ email, password });
      const res = await fetch(
        `/api/get-user?email=${encodeURIComponent(email)}`
      );
      const user = await res.json();
      if (user && user.name) {
        localStorage.setItem("fcUserName", user.name);
        localStorage.setItem("fcUserEmail", email);
      }
      alert(
        "Sign in logic goes here.\nEmail: " + email + "\nPassword: " + password
      );
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        alert(error.issues[0].message);
        setIsLoading(false);
        return;
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full font-sans bg-[var(--bg-secondary)]">
      <Toaster position="top-center" />
      <div
        className="md:hidden absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[var(--primary-dark)] to-[var(--footer-bg)] z-[1000] flex justify-center items-center shadow-lg"
        style={{
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
        }}
      >
        <div className="flex bg-[var(--card-bg)]/80 backdrop-blur-sm rounded-full p-1.5 shadow-inner">
          <button
            onClick={() => router.push("/auth/signin")}
            className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              pathname === "/auth/signin"
                ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-md"
                : "text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth/signup")}
            className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              pathname === "/auth/signup"
                ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-md"
                : "text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div
        className={`w-full md:w-1/2 flex justify-center items-center px-4 sm:px-10 lg:px-20 py-6 md:py-10 transition-all duration-700 ease-out pt-24 md:pt-10 ${
          animatePanel
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-10"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 sm:space-y-6"
          autoComplete="on"
        >
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
              Sign In to your Account
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-semibold">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/signup")}
                className="text-[var(--primary)] hover:underline font-semibold"
              >
                Sign Up here.
              </button>
            </p>
          </div>
          <input
            type="email"
            placeholder="Your Email"
            ref={emailRef}
            name="email"
            autoComplete="username"
            className="w-full p-2.5 sm:p-3 border-2 border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--text-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm transition-all duration-300 focus:scale-[1.02] hover:border-[var(--primary-light)] placeholder:text-[var(--text-dim)]"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              ref={passwordRef}
              name="password"
              autoComplete="current-password"
              className="w-full p-2.5 sm:p-3 border-2 border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--text-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm pr-10 transition-all duration-300 focus:scale-[1.02] hover:border-[var(--primary-light)] placeholder:text-[var(--text-dim)]"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <span className="text-[var(--text-muted)]">{showPassword ? "🙈" : "👁️"}</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs sm:text-sm">
            <label className="flex items-center space-x-1 mb-2 sm:mb-0">
              <input
                type="checkbox"
                className="accent-[var(--primary)] w-3.5 h-3.5 sm:w-4 sm:h-4"
              />
              <span className="font-semibold text-[var(--text-secondary)]">Remember Me</span>
            </label>
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3 font-bold rounded-md text-sm transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'var(--button-primary)',
              color: 'white',
              boxShadow: 'var(--neon-glow)',
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }} />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </span>
          </motion.button>
        </form>
      </div>
      <div className="hidden md:flex md:w-1/2 relative justify-center items-center overflow-hidden rounded-l-[75px] bg-[var(--card-bg-secondary)]">
        <div
          className={`absolute inset-0 bg-[var(--footer-bg)] rounded-l-[75px] z-0 transition-all duration-700 ease-out ${
            animatePanel ? "ml-[20px]" : "ml-[100%]"
          }`}
        />
        <div className="relative z-10 px-6 sm:px-8">
          <Image
            src="/icons/login-vector.svg"
            alt="Login Illustration"
            width={400}
            height={400}
            className="max-w-full h-auto"
          />
        </div>
        <div className="absolute top-4 sm:top-6 right-6 sm:right-10 flex items-center gap-2 sm:gap-3 z-10">
          <Image
            src="/images/Transparent logo.png"
            alt="Logo"
            width={65}
            height={65}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg font-extrabold tracking-wider text-[var(--primary-light)]">
              Finance Committee
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--text-muted)]">
              FOSTIIMA Chapter
            </span>
          </div>
        </div>

        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-white/15 rounded-full animate-pulse delay-1000 hover:scale-150 transition-transform duration-300"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-pulse delay-500 hover:scale-150 transition-transform duration-300"></div>
        <div className="absolute top-1/5 left-1/5 w-2.5 h-2.5 bg-white/20 rounded-full animate-pulse delay-200 hover:scale-150 transition-transform duration-300"></div>
        <div className="absolute bottom-1/5 right-1/3 w-3.5 h-3.5 bg-white/15 rounded-full animate-pulse delay-1200 hover:scale-150 transition-transform duration-300"></div>
      </div>
    </div>
  );
};

export default SignIn;