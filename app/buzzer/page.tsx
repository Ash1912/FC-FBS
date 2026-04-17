"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BuzzerPage() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col min-h-screen text-[var(--text-primary)] bg-gradient-to-tr from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)]">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-16 lg:px-20 
                       pt-18 sm:pt-16 md:pt-10 lg:pt-0 
                       pb-10 md:pb-16 lg:pb-20 
                       gap-10 md:gap-12">
        <div className="flex-1 text-center md:text-left max-w-lg space-y-5 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary-dark)] leading-tight">
            Simple Multiplayer Buzzer System
          </h1>
          <p className="text-[var(--text-muted)] text-base sm:text-lg">
            Host a room and invite up to{" "}
            <span className="font-semibold text-[var(--primary)]">200 people</span> to join the fun!
          </p>
        </div>
        <div className="flex-1 w-full max-w-sm rounded-2xl p-6 sm:p-8 shadow-xl mt-20"
          style={{
            background: 'var(--card-bg)',
            border: `1px solid var(--border-color)`,
            backdropFilter: 'blur(12px)',
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
            Join a Game
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[var(--text-secondary)] mb-1 font-medium text-sm sm:text-base">
                Room Code
              </label>
              <input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Enter room code"
                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm sm:text-base transition-all duration-300 focus:scale-[1.02]"
                style={{
                  background: 'var(--input-bg)',
                  border: `1px solid var(--border-color)`,
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label className="block text-[var(--text-secondary)] mb-1 font-medium text-sm sm:text-base">
                Your Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm sm:text-base transition-all duration-300 focus:scale-[1.02]"
                style={{
                  background: 'var(--input-bg)',
                  border: `1px solid var(--border-color)`,
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <Link
              href={`/buzzer/team?room=${roomCode}&name=${name}`}
              className="block w-full text-center text-white py-2 sm:py-2.5 rounded-lg font-semibold shadow-md text-sm sm:text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--button-primary)',
                boxShadow: 'var(--neon-glow)',
              }}
            >
              Join
            </Link>

            <p className="text-center text-[var(--text-muted)] text-sm sm:text-base">
              Hosting?{" "}
              <Link
                href="/buzzer/host"
                className="text-[var(--primary)] hover:text-[var(--primary-light)] font-medium transition-colors"
              >
                Create room
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}