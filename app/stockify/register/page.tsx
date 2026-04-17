"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function StockiFyRegisterPage() {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/stockify/register", {
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
    } else if (res.status === 409) {
      alert(
        "⚠️ A team with this name already exists. Please choose another name."
      );
    } else {
      alert("❌ Error: " + data.error);
    }
  };

  // 🕒 STEP 1: Define registration window
  const registrationStart = new Date("2026-01-16T12:00:00+05:30");
  const registrationEnd = new Date("2026-01-18T19:30:00+05:30");
  const now = new Date();

  const registrationNotStarted = now < registrationStart;
  const registrationClosed = now > registrationEnd;

  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary-dark)] py-24 text-center text-white shadow-xl">
        <div className="absolute inset-0 animate-gradient bg-[linear-gradient(120deg,var(--primary),var(--primary-light),var(--primary-dark),var(--primary))] bg-[length:300%_300%] opacity-70"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-10 left-[20%] w-2 h-2 bg-white rounded-full opacity-70 blur-[1px]"></div>
          <div className="animate-float-delay absolute top-[30%] left-[70%] w-3 h-3 bg-white rounded-full opacity-60 blur-[1px]"></div>
          <div className="animate-float-slow absolute top-[60%] left-[40%] w-1.5 h-1.5 bg-white rounded-full opacity-80 blur-[1px]"></div>
        </div>

        <div className="relative z-10 px-6 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--text-secondary)] to-white">
              StockiFy Team Registration
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            <span className="font-semibold text-[var(--text-secondary)]">
              Join the ultimate stock market simulation challenge
            </span>{" "}
            and prove your financial mastery!
          </p>
          <div className="mx-auto w-24 h-1.5 bg-white/90 rounded-full animate-pulse"></div>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="var(--bg-primary)"
            fillOpacity="1"
            d="M0,160L80,165.3C160,171,320,181,480,197.3C640,213,800,235,960,218.7C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Rules & Regulations Section */}
      <section 
        className="max-w-5xl mx-auto px-6 py-10 mt-8 rounded-3xl shadow-lg"
        style={{
          background: 'var(--card-bg)',
          border: `1px solid var(--border-color)`,
        }}
      >
        <h2 className="text-3xl font-bold text-[var(--primary)] mb-6 text-center">
          📜 Rules and Regulations
        </h2>
        <ul className="list-decimal list-inside space-y-3 text-[var(--text-muted)] leading-relaxed">
          <li>
            Participants are required to form a team of 3 members from their
            respective batch i.e., 1st and 2nd year students cannot be in the
            same team.
          </li>
          <li>
            All 3 members must be present for each round, otherwise the team
            will be disqualified.
          </li>
          <li>No team can change their team members after registration.</li>
          <li>
            If a single participant has registered from 2 or more teams, then
            every team he/she is part of will get disqualified.
          </li>
          <li>
            The decisions made by the Finance Committee will be final and
            binding.
          </li>
        </ul>
      </section>

      {/* Registration Form */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {registrationNotStarted ? (
          // 🟨 Registration Not Yet Started
          <div 
            className="text-center py-20 px-8 rounded-3xl shadow-xl backdrop-blur-xl"
            style={{
              background: 'var(--card-bg)',
              border: `1px solid var(--border-color)`,
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-slow">
              <span className="text-white text-3xl">🕓</span>
            </div>
            <h2 className="text-4xl font-extrabold text-[var(--primary)] mb-3">
              Registration Opens Soon
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              StockiFy 2026 registration opens on{" "}
              <b>16 January 2026, 12:00 NOON</b>.
            </p>
            <p className="text-[var(--text-dim)] mt-3 italic">Mark your calendars ⏳</p>
          </div>
        ) : registrationClosed ? (
          // 🟥 Registration Closed Message
          <div 
            className="relative text-center py-20 px-8 backdrop-blur-xl rounded-3xl shadow-2xl animate-fadeIn overflow-hidden"
            style={{
              background: 'var(--card-bg)',
              border: `1px solid var(--border-color)`,
            }}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[var(--primary)]/30 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[var(--primary-light)]/30 rounded-full blur-3xl opacity-60 animate-pulse-slow delay-2000"></div>

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                <span className="text-white text-3xl">⏰</span>
              </div>
              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] bg-clip-text text-transparent drop-shadow-lg leading-[1.15] pb-[0.15em]">
                Registration Closed
              </h2>

              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-2">
                Thank you for your enthusiasm and overwhelming response to{" "}
                <a
                  href="https://fc-fbs.vercel.app/stockify/register"
                  target="_blank"
                  className="text-[var(--primary)] font-semibold hover:underline"
                >
                  StockiFy 2026
                </a>
                !
              </p>

              <p className="text-[var(--text-muted)] text-lg mb-6">
                Registrations officially closed on{" "}
                <span className="font-semibold text-[var(--primary)]">
                  18th January 2026, 07:30 PM
                </span>
                .
              </p>
              <p className="text-[var(--text-dim)] mt-3 italic">
                Stay tuned for the{" "}
                <span className="text-[var(--primary)] font-medium">
                  Prelims Round
                </span>{" "}
                updates on{" "}
                <span className="font-semibold text-[var(--primary)]">
                  19th January 2026 🏁
                </span>{" "}
                and the{" "}
                <span className="text-[var(--primary)] font-medium">Final Round</span>{" "}
                updates on{" "}
                <span className="font-semibold text-[var(--primary)]">
                  21st January 2026 🎯
                </span>
                .
              </p>
              <div className="mt-6 w-32 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-full animate-pulse"></div>
              <p className="mt-5 text-sm text-[var(--text-dim)]">
                Follow us on{" "}
                <a
                  href="https://www.instagram.com/finance_with_fbs?igsh=N2w5bGtkYXJmZDBr"
                  target="_blank"
                  className="text-[var(--primary)] hover:underline"
                >
                  Instagram
                </a>{" "}
                for live event updates 📢
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-lg p-8 rounded-3xl shadow-2xl animate-fadeInUp"
            style={{
              background: 'var(--card-bg)',
              border: `1px solid var(--border-color)`,
            }}
          >
            {/* Team Name */}
            <div className="mb-8">
              <label className="block mb-2 font-semibold text-[var(--text-primary)] text-lg">
                🏆 Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={form.teamName}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-3 focus:ring-2 focus:ring-[var(--primary)] transition-all"
                style={{
                  border: `1px solid var(--border-color)`,
                  background: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                }}
                placeholder="Enter your team name"
              />
            </div>

            {/* Members */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`p-6 rounded-2xl shadow-md border-t-4 transition-all hover:shadow-xl hover:scale-[1.02]`}
                  style={{
                    background: 'var(--bg-secondary)',
                    borderTopColor: num === 1 ? 'var(--primary)' : num === 2 ? 'var(--primary-light)' : 'var(--primary-dark)',
                    border: `1px solid var(--border-color)`,
                    borderTopWidth: '4px',
                  }}
                >
                  <h2 className="font-semibold text-[var(--primary)] mb-4 text-lg">
                    👤 Member {num}
                  </h2>

                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="block text-sm text-[var(--text-muted)]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name={`member${num}Name`}
                      value={
                        form[`member${num}Name` as keyof typeof form] as string
                      }
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      style={{
                        border: `1px solid var(--border-color)`,
                        background: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* FOSTIIMA Email */}
                  <div className="mb-3">
                    <label className="block text-sm text-[var(--text-muted)]">
                      FOSTIIMA Email
                    </label>
                    <input
                      type="email"
                      name={`member${num}Email`}
                      value={
                        form[`member${num}Email` as keyof typeof form] as string
                      }
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      style={{
                        border: `1px solid var(--border-color)`,
                        background: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Enter FOSTIIMA email"
                    />
                  </div>

                  {/* Section */}
                  <div className="mb-3">
                    <label className="block text-sm text-[var(--text-muted)]">
                      Section
                    </label>
                    <input
                      type="text"
                      name={`member${num}Section`}
                      value={
                        form[
                          `member${num}Section` as keyof typeof form
                        ] as string
                      }
                      onChange={handleChange}
                      className="w-full rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      style={{
                        border: `1px solid var(--border-color)`,
                        background: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Enter section"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label className="block text-sm text-[var(--text-muted)]">Phone</label>
                    <input
                      type="text"
                      name={`member${num}Phone`}
                      value={
                        form[`member${num}Phone` as keyof typeof form] as string
                      }
                      onChange={handleChange}
                      className="w-full rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      style={{
                        border: `1px solid var(--border-color)`,
                        background: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Year */}
                  <div className="mb-3">
                    <label className="block text-sm text-[var(--text-muted)]">Year</label>
                    <select
                      name={`member${num}Year`}
                      value={
                        form[`member${num}Year` as keyof typeof form] as string
                      }
                      onChange={handleChange}
                      className="w-full rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      style={{
                        border: `1px solid var(--border-color)`,
                        background: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                    </select>
                  </div>

                  {/* PGP */}
                  <div className="mb-3">
                    <label className="block text-sm text-[var(--text-muted)]">PGP</label>
                    <input
                      type="text"
                      name={`member${num}PGP`}
                      value={
                        form[`member${num}PGP` as keyof typeof form] as string
                      }
                      onChange={handleChange}
                      className="w-full rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      style={{
                        border: `1px solid var(--border-color)`,
                        background: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                      }}
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
                className="text-white px-10 py-3.5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                style={{
                  background: 'var(--button-primary)',
                  boxShadow: 'var(--neon-glow)',
                }}
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                ) : (
                  "Register Team 🚀"
                )}
              </button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}