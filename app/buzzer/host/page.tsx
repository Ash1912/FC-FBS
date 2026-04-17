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
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)] text-[var(--text-primary)]">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 p-8 pt-28 md:pt-36">
        <div className="relative rounded-3xl p-10 w-full max-w-lg text-center transition-all duration-500 hover:scale-[1.03] overflow-hidden"
          style={{
            background: 'var(--card-bg)',
            border: `1px solid var(--border-color)`,
            boxShadow: 'var(--card-shadow)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Decorative glow background */}
          <div className="absolute inset-0 rounded-3xl blur-2xl -z-10"
            style={{
              background: 'var(--accent-glow)',
            }}
          />

          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] animate-[pulse_2s_ease-in-out_infinite] drop-shadow-sm">
            🎮 Host a Buzzer Game
          </h1>

          {!roomCode ? (
            <>
              <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl focus:ring-4 focus:ring-[var(--primary)]/20 focus:outline-none mb-6 shadow-sm transition-all duration-300 hover:shadow-md"
                style={{
                  background: 'var(--input-bg)',
                  border: `1px solid var(--border-color)`,
                  color: 'var(--text-primary)',
                }}
              />

              <button
                onClick={handleCreateRoom}
                className="w-full text-white py-3 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'var(--button-primary)',
                  boxShadow: 'var(--neon-glow)',
                }}
              >
                🚀 Create Room
              </button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-[var(--primary)] mb-2">
                ✅ Room Created Successfully!
              </h2>
              <p className="text-[var(--text-muted)]">
                Share this code with participants:
              </p>

              <div className="mt-4 rounded-xl py-4 px-3 text-2xl md:text-3xl font-mono font-bold tracking-wide text-center shadow-md break-all hover:scale-[1.02] transition-transform"
                style={{
                  background: 'var(--bg-secondary)',
                  border: `1px solid var(--border-color)`,
                  color: 'var(--text-primary)',
                }}
              >
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
                        className="rounded-2xl shadow-lg transition-all duration-300"
                        style={{
                          border: `1px solid var(--border-color)`,
                        }}
                      />

                      {/* Gradient Hover Overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary-light)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Centered Logo with Animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/images/Transparent logo.png"
                          alt="Logo"
                          width={55}
                          height={55}
                          className="rounded-full bg-white/80 backdrop-blur-sm p-1 shadow-md animate-pulse-soft"
                          style={{
                            border: `1px solid var(--border-color)`,
                          }}
                        />
                      </div>
                    </div>
                  </a>

                  <p className="text-sm text-[var(--text-muted)] font-medium">
                    📱 Scan or Tap to Join
                  </p>
                </div>
              )}

              <p className="mt-4 text-sm text-[var(--primary)]">
                Teams can also join via:{" "}
                <a
                  href={joinLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:text-[var(--primary-light)] transition-colors"
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
                    : "text-white hover:scale-105 active:scale-95"
                }`}
                style={{
                  background: isResetting ? undefined : 'linear-gradient(135deg, #ef4444, #e11d48)',
                }}
              >
                {isResetting ? "🔄 Resetting..." : "🧹 Reset Round"}
              </button>

              <h3 className="mt-10 text-xl font-bold text-[var(--text-primary)]">
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
                        ? "font-bold shadow-md scale-[1.02]"
                        : "hover:shadow-md"
                    }`}
                    style={{
                      background: i === 0 
                        ? 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)'
                        : 'var(--bg-secondary)',
                      color: i === 0 ? 'white' : 'var(--text-primary)',
                    }}
                  >
                    <span className="font-semibold text-lg">{b.teamName}</span>
                    <span className="text-sm opacity-90">
                      {new Date(b.buzzTime).toLocaleTimeString()}
                      {b.timeTaken !== undefined && (
                        <span className="ml-2 font-mono">
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