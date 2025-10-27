"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function FinQuestRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    teamName: "",
    member1Name: "",
    member1Email: "",
    member1Section: "",
    member1Phone: "",
    member1Year: "",
    member1PGP: "",
    member2Name: "",
    member2Email: "",
    member2Section: "",
    member2Phone: "",
    member2Year: "",
    member2PGP: "",
    member3Name: "",
    member3Email: "",
    member3Section: "",
    member3Phone: "",
    member3Year: "",
    member3PGP: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/finquest/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("🎉 Team registered successfully!");
      setForm({
        ...form,
        teamName: "",
        member1Name: "",
        member1Email: "",
        member1Section: "",
        member1Phone: "",
        member1Year: "",
        member1PGP: "",
        member2Name: "",
        member2Email: "",
        member2Section: "",
        member2Phone: "",
        member2Year: "",
        member2PGP: "",
        member3Name: "",
        member3Email: "",
        member3Section: "",
        member3Phone: "",
        member3Year: "",
        member3PGP: "",
      });
    } else {
      alert("❌ Error: " + data.error);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8C5BFF] via-[#A47CFF] to-[#C8B6FF] py-24 text-center text-white shadow-xl">
        <div className="absolute inset-0 animate-gradient bg-[linear-gradient(120deg,#8C5BFF,#A47CFF,#C8B6FF,#8C5BFF)] bg-[length:300%_300%] opacity-70"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-10 left-[20%] w-2 h-2 bg-white rounded-full opacity-70 blur-[1px]"></div>
          <div className="animate-float-delay absolute top-[30%] left-[70%] w-3 h-3 bg-white rounded-full opacity-60 blur-[1px]"></div>
          <div className="animate-float-slow absolute top-[60%] left-[40%] w-1.5 h-1.5 bg-white rounded-full opacity-80 blur-[1px]"></div>
        </div>

        <div className="relative z-10 px-6 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F1E8FF] to-white">
              FinQuest Team Registration
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            <span className="font-semibold text-[#FFF1FF]">Join the ultimate finance challenge</span> and prove your financial mastery!
          </p>
          <div className="mx-auto w-24 h-1.5 bg-white/90 rounded-full animate-pulse"></div>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L80,165.3C160,171,320,181,480,197.3C640,213,800,235,960,218.7C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Rules & Regulations Section */}
      <section className="max-w-5xl mx-auto px-6 py-10 mt-8 bg-gradient-to-br from-white to-[#F9F6FF] border border-[#E9E0FF] rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#6A4EFF] mb-6 text-center">📜 Rules and Regulations</h2>
        <ul className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
          <li>Participants are required to form a team of 3 members from their respective batch i.e., 1st and 2nd year students cannot be in the same team.</li>
          <li>All 3 members must be present for each round, otherwise the team will be disqualified.</li>
          <li>No team can change their team members after registration.</li>
          <li>If a single participant has registered from 2 or more teams, then every team he/she is part of will get disqualified.</li>
          <li>Participants will be assessed based on their finance, accounting, business world, and current affairs knowledge.</li>
          <li>The decisions made by the Finance Committee will be final and binding.</li>
        </ul>
      </section>

      {/* Registration Form */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/40 animate-fadeInUp"
        >
          {/* Team Name */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-gray-700 text-lg">🏆 Team Name</label>
            <input
              type="text"
              name="teamName"
              value={form.teamName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#8C5BFF] transition-all"
              placeholder="Enter your team name"
            />
          </div>

          {/* Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`p-6 rounded-2xl bg-white shadow-md border-t-4 ${
                  num === 1
                    ? "border-[#8C5BFF]"
                    : num === 2
                    ? "border-[#9E77FF]"
                    : "border-[#B79CFF]"
                } hover:shadow-xl hover:scale-[1.02] transition-all`}
              >
                <h2 className="font-semibold text-[#8C5BFF] mb-4 text-lg">👤 Member {num}</h2>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="block text-sm text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name={`member${num}Name`}
                    value={form[`member${num}Name` as keyof typeof form] as string}
                    onChange={handleChange}
                    required={num <= 2}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8C5BFF] transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                {/* FOSTIIMA Email */}
                <div className="mb-3">
                  <label className="block text-sm text-gray-600">FOSTIIMA Email</label>
                  <input
                    type="email"
                    name={`member${num}Email`}
                    value={form[`member${num}Email` as keyof typeof form] as string}
                    onChange={handleChange}
                    required={num <= 2}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8C5BFF] transition-all"
                    placeholder="Enter FOSTIIMA email"
                  />
                </div>

                {/* Section */}
                <div className="mb-3">
                  <label className="block text-sm text-gray-600">Section</label>
                  <input
                    type="text"
                    name={`member${num}Section`}
                    value={form[`member${num}Section` as keyof typeof form] as string}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8C5BFF] transition-all"
                    placeholder="Enter section"
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="block text-sm text-gray-600">Phone</label>
                  <input
                    type="text"
                    name={`member${num}Phone`}
                    value={form[`member${num}Phone` as keyof typeof form] as string}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8C5BFF] transition-all"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Year */}
                <div className="mb-3">
                  <label className="block text-sm text-gray-600">Year</label>
                  <select
                    name={`member${num}Year`}
                    value={form[`member${num}Year` as keyof typeof form] as string}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8C5BFF] transition-all"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                  </select>
                </div>

                {/* PGP */}
                <div className="mb-3">
                  <label className="block text-sm text-gray-600">PGP</label>
                  <input
                    type="text"
                    name={`member${num}PGP`}
                    value={form[`member${num}PGP` as keyof typeof form] as string}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8C5BFF] transition-all"
                    placeholder="Enter PGP (e.g., PGP 27)"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#8C5BFF] to-[#6A4EFF] text-white px-10 py-3.5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                "Register Team 🚀"
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
