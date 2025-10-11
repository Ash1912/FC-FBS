"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BuzzerPage() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col min-h-screen text-gray-900 bg-gradient-to-tr from-[#faf5ff] via-[#f3e8ff] via-[#e9d5ff] to-[#c4b5fd]">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-16 lg:px-20 
                       pt-18 sm:pt-16 md:pt-10 lg:pt-0 
                       pb-10 md:pb-16 lg:pb-20 
                       gap-10 md:gap-12">
        <div className="flex-1 text-center md:text-left max-w-lg space-y-5 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 leading-tight">
            Simple Multiplayer Buzzer System
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">
            Host a room and invite up to{" "}
            <span className="font-semibold text-indigo-700">200 people</span> to join the fun!
          </p>
        </div>
        <div className="flex-1 w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Join a Game
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">
                Room Code
              </label>
              <input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Enter room code"
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium text-sm sm:text-base">
                Your Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-sm sm:text-base"
              />
            </div>

            <Link
              href={`/buzzer/team?room=${roomCode}&name=${name}`}
              className="block w-full text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-90 text-white py-2 sm:py-2.5 rounded-lg font-semibold shadow-md text-sm sm:text-base transition"
            >
              Join
            </Link>

            <p className="text-center text-gray-700 text-sm sm:text-base">
              Hosting?{" "}
              <Link
                href="/buzzer/host"
                className="text-indigo-600 hover:text-indigo-400 font-medium"
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
