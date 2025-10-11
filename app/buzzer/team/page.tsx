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
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 text-gray-900">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 p-8 pt-20">
        <div className="bg-white/70 backdrop-blur-lg border border-purple-200 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center transition-transform hover:scale-[1.02] hover:shadow-purple-300/50">
          <h1 className="text-4xl font-extrabold mb-6 text-indigo-700 animate-pulse">
            🎯 Team Buzzer
          </h1>

          <input
            className="w-full mb-4 px-5 py-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 hover:shadow-md"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <input
            className="w-full mb-6 px-5 py-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 hover:shadow-md"
            placeholder="Enter Room Code"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
          />

          <div className="flex justify-center space-x-4">
            <button
              disabled={pressed || loading}
              onClick={handleBuzz}
              className={`px-10 py-3 rounded-full font-bold text-lg text-white transition-all duration-300 transform ${
                pressed
                  ? "bg-gray-400 cursor-not-allowed shadow-inner"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 shadow-lg hover:shadow-indigo-400/50"
              }`}
            >
              {pressed ? "Buzzed!" : loading ? "..." : "Press Buzzer"}
            </button>

            <button
              disabled={!pressed || loading}
              onClick={handleUnbuzz}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform ${
                !pressed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white active:scale-95 shadow-lg hover:shadow-red-400/50"
              }`}
            >
              Unbuzz
            </button>
          </div>

          {sessionId && (
            <p className="mt-6 text-sm text-gray-600">
              Connected to Room:{" "}
              <span className="font-semibold text-indigo-600">{sessionId}</span>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
