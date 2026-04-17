"use client";

import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

type BuzzData = { teamName: string; buzzTime: string; timeTaken?: number };
type SSEMessage =
  | { type: "init"; payload: BuzzData[] }
  | { type: "buzz"; payload: BuzzData }
  | { type: "unbuzz"; payload: { teamName: string } }
  | { type: "reset"; payload?: Record<string, unknown> };

export default function TeamBuzzer() {
  const [teamName, setTeamName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [pressed, setPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize from query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get("room");
    const name = params.get("name");
    if (room) setSessionId(room);
    if (name) setTeamName(name);
  }, []);

  // SSE listener for reset events
  useEffect(() => {
    if (!sessionId) return;

    const es = new EventSource(`/api/buzzer/stream?sessionId=${sessionId}`);

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as SSEMessage;

        if (data.type === "reset") {
          setPressed(false); // unbuzz the team
        }
      } catch (err) {
        console.error("SSE parsing error:", err);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
    };

    return () => es.close();
  }, [sessionId]);

  const handleBuzz = async () => {
    if (!sessionId || !teamName)
      return alert("Enter both Team Name and Room Code!");
    setLoading(true);
    try {
      const res = await fetch("/api/buzzer/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, teamName }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setPressed(true);
          alert(data.error || "Already buzzed");
        } else {
          alert(data.error || "Failed to buzz");
        }
      } else {
        setPressed(true);
      }
    } catch (err) {
      console.error("Buzz error", err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleUnbuzz = async () => {
    if (!sessionId || !teamName) return;
    setLoading(true);
    try {
      const res = await fetch("/api/buzzer/response", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, teamName }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to unbuzz");
      } else {
        setPressed(false);
      }
    } catch (err) {
      console.error("Unbuzz error", err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)] text-[var(--text-primary)]">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 p-8 pt-20">
        <div className="rounded-3xl p-10 w-full max-w-md text-center transition-transform hover:scale-[1.02]"
          style={{
            background: 'var(--card-bg)',
            border: `1px solid var(--border-color)`,
            boxShadow: 'var(--card-shadow)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <h1 className="text-4xl font-extrabold mb-6 animate-pulse"
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🎯 Team Buzzer
          </h1>

          <input
            className="w-full mb-4 px-5 py-3 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:outline-none shadow-sm transition duration-300 hover:shadow-md"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            style={{
              background: 'var(--input-bg)',
              border: `1px solid var(--border-color)`,
              color: 'var(--text-primary)',
            }}
          />

          <input
            className="w-full mb-6 px-5 py-3 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:outline-none shadow-sm transition duration-300 hover:shadow-md"
            placeholder="Enter Room Code"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            style={{
              background: 'var(--input-bg)',
              border: `1px solid var(--border-color)`,
              color: 'var(--text-primary)',
            }}
          />

          <div className="flex justify-center space-x-4">
            <button
              disabled={pressed || loading}
              onClick={handleBuzz}
              className={`px-10 py-3 rounded-full font-bold text-lg text-white transition-all duration-300 transform ${
                pressed
                  ? "bg-gray-400 cursor-not-allowed shadow-inner"
                  : "hover:scale-105 active:scale-95 shadow-lg"
              }`}
              style={{
                background: pressed ? undefined : 'var(--button-primary)',
                boxShadow: pressed ? undefined : 'var(--neon-glow)',
              }}
            >
              {pressed ? "Buzzed!" : loading ? "..." : "Press Buzzer"}
            </button>

            <button
              disabled={!pressed || loading}
              onClick={handleUnbuzz}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform ${
                !pressed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-400/50"
              }`}
              style={{
                background: !pressed ? undefined : 'linear-gradient(135deg, #ef4444, #e11d48)',
              }}
            >
              Unbuzz
            </button>
          </div>

          {sessionId && (
            <p className="mt-6 text-sm text-[var(--text-muted)]">
              Connected to Room:{" "}
              <span className="font-semibold text-[var(--primary)]">{sessionId}</span>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}