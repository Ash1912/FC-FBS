"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import QRCode from "qrcode";
import Image from "next/image";
import { motion } from "framer-motion";

type BuzzData = { teamName: string; buzzTime: string; timeTaken?: number };
type SSEMessage =
  | { type: "init"; payload: BuzzData[] }
  | { type: "buzz"; payload: BuzzData }
  | { type: "unbuzz"; payload: { teamName: string } }
  | { type: "reset"; payload?: Record<string, unknown> };

export default function HostBuzzer() {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [buzzes, setBuzzes] = useState<BuzzData[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [joinLink, setJoinLink] = useState<string | null>(null);

  // ✅ Effect 1: Setup EventSource for buzzer updates
  useEffect(() => {
    if (!roomCode) return;

    const es = new EventSource(`/api/buzzer/stream?sessionId=${roomCode}`);

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as SSEMessage;

        switch (data.type) {
          case "init":
            setBuzzes(
              data.payload.map((p) => ({
                teamName: p.teamName,
                buzzTime: p.buzzTime,
                timeTaken: p.timeTaken,
              }))
            );
            break;

          case "buzz":
            setBuzzes((prev) => {
              if (prev.some((b) => b.teamName === data.payload.teamName))
                return prev;
              const next = [...prev, data.payload];
              next.sort(
                (a, b) =>
                  new Date(a.buzzTime).getTime() -
                  new Date(b.buzzTime).getTime()
              );
              return next;
            });
            break;

          case "unbuzz":
            setBuzzes((prev) =>
              prev.filter((b) => b.teamName !== data.payload.teamName)
            );
            break;

          case "reset":
            setBuzzes([]);
            break;
        }
      } catch (err) {
        console.error("Failed to parse SSE message", err);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
    };

    return () => es.close();
  }, [roomCode]);

  // ✅ Effect 2: Generate QR Code (separately)
  useEffect(() => {
    if (!roomCode) return;

    const link = `https://fc-fbs.vercel.app/buzzer/team?room=${roomCode}`;
    setJoinLink(link);

    QRCode.toDataURL(link)
      .then(setQrUrl)
      .catch((err) => console.error("QR generation failed:", err));
  }, [roomCode]);

  const handleCreateRoom = async () => {
    const res = await fetch("/api/buzzer/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: roomName || "Untitled Round" }),
    });
    const data = await res.json();
    setRoomCode(data.id);
  };

  const handleResetRound = async () => {
    if (!roomCode) return;
    setIsResetting(true);
    try {
      await fetch("/api/buzzer/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: roomCode }),
      });
    } catch (err) {
      console.error("Failed to reset round", err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-[#faf5ff] via-[#e9d5ff] to-[#c4b5fd] text-gray-900">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 p-8 pt-28 md:pt-36">
        <div className="relative bg-white/80 backdrop-blur-2xl border border-purple-200 shadow-[0_8px_30px_rgb(0,0,0,0.1)] rounded-3xl p-10 w-full max-w-lg text-center transition-all duration-500 hover:shadow-purple-300/50 hover:scale-[1.03] overflow-hidden">
          {/* Decorative glow background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-pink-100/40 rounded-3xl blur-2xl -z-10" />

          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 animate-[pulse_2s_ease-in-out_infinite] drop-shadow-sm">
            🎮 Host a Buzzer Game
          </h1>

          {!roomCode ? (
            <>
              <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/90 border border-purple-300 text-gray-900 focus:ring-4 focus:ring-purple-200 focus:outline-none mb-6 shadow-sm transition-all duration-300 hover:shadow-md"
              />

              <button
                onClick={handleCreateRoom}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                🚀 Create Room
              </button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                ✅ Room Created Successfully!
              </h2>
              <p className="text-gray-700">
                Share this code with participants:
              </p>

              <div className="mt-4 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-xl py-4 px-3 text-2xl md:text-3xl font-mono font-bold tracking-wide text-center shadow-md break-all hover:scale-[1.02] transition-transform">
                {roomCode}
              </div>

              {/* ✅ Clickable QR Code */}
              {qrUrl && joinLink && (
                <div className="mt-8 flex flex-col items-center space-y-3">
                  <a
                    href={joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group hover:scale-105 transition-transform duration-300"
                  >
                    {/* QR Code */}
                    <div className="relative">
                      <Image
                        src={qrUrl}
                        alt="Room QR Code"
                        width={180}
                        height={180}
                        className="rounded-2xl shadow-lg border border-[#8C5BFF]/40 group-hover:shadow-[#8C5BFF]/60 transition-all duration-300"
                      />

                      {/* Gradient Hover Overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7C55D7]/10 to-[#A06AF9]/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Centered Logo with Animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/images/Transparent logo.png"
                          alt="Logo"
                          width={55}
                          height={55}
                          className="rounded-full bg-white/80 backdrop-blur-sm p-1 shadow-md border border-[#8C5BFF]/30 animate-pulse-soft"
                        />
                      </div>
                    </div>
                  </a>

                  <p className="text-sm text-gray-700 font-medium">
                    📱 Scan or Tap to Join
                  </p>
                </div>
              )}

              <p className="mt-4 text-sm text-purple-600">
                Teams can also join via:{" "}
                <a
                  href={joinLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:text-purple-800 transition-colors"
                >
                  {joinLink}
                </a>
              </p>

              <button
                onClick={handleResetRound}
                disabled={isResetting}
                className={`mt-8 py-3 px-8 rounded-xl font-semibold shadow-md transition-all duration-300 ${
                  isResetting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white hover:scale-105 active:scale-95"
                }`}
              >
                {isResetting ? "🔄 Resetting..." : "🧹 Reset Round"}
              </button>

              <h3 className="mt-10 text-xl font-bold text-gray-800">
                ⚡ Buzz Activity
              </h3>
              <ul className="mt-4 space-y-3">
                {buzzes.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 120,
                      damping: 10,
                    }}
                    className={`px-6 py-3 rounded-2xl flex justify-between items-center shadow-sm transition-all duration-300 ${
                      i === 0
                        ? "bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 text-gray-900 font-bold shadow-md scale-[1.02]"
                        : "bg-purple-100/80 hover:bg-purple-200 text-gray-800"
                    }`}
                  >
                    <span className="font-semibold text-lg">{b.teamName}</span>
                    <span className="text-sm text-gray-700">
                      {new Date(b.buzzTime).toLocaleTimeString()}
                      {b.timeTaken !== undefined && (
                        <span className="ml-2 font-mono text-gray-700">
                          • {b.timeTaken.toFixed(2)}s
                        </span>
                      )}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
