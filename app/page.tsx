"use client";
import Navbar from "../app/components/Navbar";
import Hero from "../app/components/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
      {/* Removed fixed auth buttons at bottom right */}
    </div>
  );
}
