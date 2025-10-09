import React from "react";

export default function AboutHero() {
  return (
    <section className="w-full min-h-[48vh] flex flex-col items-center justify-center py-16 bg-[#FAFEF6] relative overflow-hidden">
      <div className="text-center w-full max-w-[1100px] mx-auto">
        <div className="text-[#a18fff] font-bold text-[24px] mb-3 mt-16">
          Discover Our Journey
        </div>
        <h1 className="text-[56px] font-extrabold text-[#3c3450] leading-tight">
          We&apos;re Empowering the Future of
          <br />
          <span className="text-[#8C5BFF]">
            Financial Literacy & Leadership
          </span>
        </h1>
        <div className="text-[#6d6a7c] text-[22px] font-normal mt-5">
          As a Finance Committee, we organize insightful workshops, interactive
          sessions, and events that focus on financial education, investment
          awareness, and economic understanding.
          <br />
          Our goal is to equip students with essential financial skills and
          promote responsible money management across the campus.
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute left-0 right-0 bottom-16 h-0 z-0 pointer-events-none">
        <svg
          width="100%"
          height="32"
          viewBox="0 0 1200 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="20"
            y1="16"
            x2="1180"
            y2="16"
            stroke="#a18fff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.18"
          />
          <circle cx="20" cy="16" r="3" fill="#a18fff" opacity="0.18" />
          <circle cx="1180" cy="16" r="3" fill="#a18fff" opacity="0.18" />
        </svg>
      </div>
    </section>
  );
}
