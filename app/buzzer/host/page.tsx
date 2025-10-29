"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
        <div className="bg-white/70 backdrop-blur-lg border border-purple-200 shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center transition-transform hover:scale-[1.02] hover:shadow-purple-300/50">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-indigo-700 animate-pulse">
            🎮 Host a Buzzer Game
          </h1>

          {!roomCode ? (
            <>
              <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white border border-purple-300 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none mb-5 shadow-sm transition duration-300 hover:shadow-md"
              />
              <button
                onClick={handleCreateRoom}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
              >
                Create Room
              </button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-green-500 mb-2">
                Room Created!
              </h2>
              <p className="text-gray-700">Share this room code:</p>
              <div className="mt-4 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-xl py-4 px-3 text-2xl md:text-3xl font-mono font-bold tracking-wide text-center shadow-md break-all hover:scale-[1.02] transition-transform">
                {roomCode}
              </div>

              <p className="mt-4 text-sm text-purple-500">
                Teams can join via:{" "}
                <span className="underline cursor-pointer hover:text-purple-700">https://fc-fbs.vercel.app/buzzer/team?room={roomCode}</span>
              </p>

              <button
                onClick={handleResetRound}
                disabled={isResetting}
                className={`mt-6 py-3 px-8 rounded-xl font-semibold transition-all shadow-lg ${
                  isResetting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 active:scale-95"
                }`}
              >
                {isResetting ? "Resetting..." : "Reset Round"}
              </button>

              <h3 className="mt-6 text-lg font-semibold">Buzzes</h3>
              <ul className="mt-2 space-y-2">
                {buzzes.map((b, i) => (
                  <li
                    key={i}
                    className={`px-5 py-3 rounded-xl flex justify-between items-center transition-all ${
                      i === 0
                        ? "bg-gradient-to-r from-green-400 to-emerald-500 font-bold shadow-lg text-gray-900 transform hover:scale-[1.02]"
                        : "bg-purple-100 hover:bg-purple-200 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-6">
                      <span className="font-semibold text-lg text-gray-900">
                        {b.teamName}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(b.buzzTime).toLocaleTimeString()}{" "}
                        {b.timeTaken !== undefined && (
                          <span className="ml-1 font-mono text-gray-700">
                            • {b.timeTaken.toFixed(2)}s
                          </span>
                        )}
                      </span>
                    </div>
                  </li>
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
