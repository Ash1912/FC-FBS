"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Please enter your name"),
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animatePanel, setAnimatePanel] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setAnimatePanel(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      name: nameRef.current?.value?.trim() || "",
      email: emailRef.current?.value?.trim() || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
    };
    try {
      signUpSchema.parse(formData);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Sign up failed.");
        setIsLoading(false);
        return;
      }
      localStorage.setItem("fcUserName", formData.name);
      localStorage.setItem("fcUserEmail", formData.email);
      alert(
        "Sign up successful!\nName: " +
          formData.name +
          "\nEmail: " +
          formData.email
      );
      if (res.status === 201 || res.status === 200) {
        toast.success("Account created successfully!");
        router.push("/auth/signin");
      }
    } catch (err: unknown) {
      const message =
        err instanceof z.ZodError ? err.issues[0].message : "Sign-up failed.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen font-sans bg-[#F1ECFF]">
      <Toaster position="top-center" />

      <div
        className="md:hidden absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#313053] to-[#261753] z-[1000] flex justify-center items-center shadow-lg"
        style={{
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
        }}
      >
        <div className="flex bg-[#313053]/80 backdrop-blur-sm rounded-full p-1.5 shadow-inner">
          <button
            onClick={() => router.push("/auth/signin")}
            className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              pathname === "/auth/signin"
                ? "bg-gradient-to-r from-[#615fa1] to-[#313053] text-white shadow-md"
                : "text-gray-300 hover:bg-[#615fa1] hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth/signup")}
            className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              pathname === "/auth/signup"
                ? "bg-gradient-to-r from-[#615fa1] to-[#313053] text-white shadow-md"
                : "text-gray-300 hover:bg-[#615fa1] hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 relative justify-center items-center overflow-hidden rounded-r-[75px] bg-[#B09EE4]">
        <div
          className={`absolute inset-0 bg-[#261753] rounded-r-[75px] z-0 transition-all duration-700 ease-out ${
            animatePanel ? "mr-[20px]" : "mr-[100%]"
          }`}
        />
        <div className="relative z-10 px-6 sm:px-8">
          <Image
            src="/icons/sign-up-Vector.svg"
            alt="Signup Illustration"
            width={400}
            height={400}
            className="max-w-full h-auto"
          />
        </div>
        <div className="absolute top-4 sm:top-6 left-6 sm:left-10 flex items-center gap-2 sm:gap-3 z-10">
          <Image
            src="/images/Transparent logo.png"
            alt="Logo"
            width={65}
            height={65}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg font-extrabold tracking-wider text-[#B09EE4]">
              Finance Committee
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#6d6a7c]">
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

      <div
        className={`w-full md:w-1/2 flex justify-center items-center px-4 sm:px-10 lg:px-20 py-10 transition-all duration-700 ease-out pt-24 md:pt-10 ${
          animatePanel
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-10"
        }`}
      >
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md space-y-5 sm:space-y-6"
          autoComplete="on"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
              Create your Account
            </h1>
            <p className="text-sm text-gray-600 font-semibold">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/signin")}
                className="text-[#6356D7] hover:underline font-semibold"
              >
                Sign In here.
              </button>
            </p>
          </div>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your Full Name"
            ref={nameRef}
            required
            className="w-full p-3 border-2 border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6A4EFF] transition-all duration-300 focus:scale-[1.02] hover:border-[#B8AAFF]"
          />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your Email"
            ref={emailRef}
            required
            className="w-full p-3 border-2 border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6A4EFF] transition-all duration-300 focus:scale-[1.02] hover:border-[#B8AAFF]"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="new-password"
              autoComplete="new-password"
              placeholder="Enter Password"
              ref={passwordRef}
              required
              className="w-full p-3 border-2 border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6A4EFF] transition-all duration-300 focus:scale-[1.02] hover:border-[#B8AAFF]"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <span>{showPassword ? "🙈" : "👁️"}</span>
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              autoComplete="new-password"
              placeholder="Enter Confirm Password"
              ref={confirmPasswordRef}
              required
              className="w-full p-3 border-2 border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6A4EFF] transition-all duration-300 focus:scale-[1.02] hover:border-[#B8AAFF]"
            />
            <button
              type="button"
              onClick={toggleConfirm}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <span>{showConfirmPassword ? "🙈" : "👁️"}</span>
            </button>
          </div>
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" className="accent-[#6356D7]" />
            <span className="font-semibold">Remember Me</span>
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#6356D7] text-white rounded-md hover:bg-[#7E5FFF] font-semibold transition-all text-sm shadow-md"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
