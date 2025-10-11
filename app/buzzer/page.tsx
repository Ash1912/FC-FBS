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

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 md:py-20 gap-12">
        <div className="flex-1 text-left max-w-md space-y-6">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
            Simple Multiplayer Buzzer System
          </h1>
          <p className="text-gray-700 text-lg">
            Host a room and invite up to{" "}
            <span className="font-semibold text-indigo-700">200 people</span> to join the fun!
          </p>
        </div>

        <div className="flex-1 max-w-sm w-full bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Join a Game</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Room Code</label>
              <input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Enter room code"
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Your Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <Link
              href={`/buzzer/team?room=${roomCode}&name=${name}`}
              className="block w-full text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-90 text-white py-2 rounded-lg font-semibold shadow-md"
            >
              Join
            </Link>

            <p className="text-center text-gray-700 text-sm">
              Hosting?{" "}
              <Link href="/buzzer/host" className="text-indigo-600 hover:text-indigo-400 font-medium">
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
