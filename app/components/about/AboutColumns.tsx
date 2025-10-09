import React from "react";

const columns = [
  {
    title: "Our Story",
    subtitle: "Why We Started",
    text: `We are a student-led Finance Committee dedicated to enhancing financial literacy and awareness on campus. Our journey began with the vision to help students understand the importance of managing finances effectively and making informed financial decisions.`,
  },
  {
    title: "Our Mission",
    subtitle: "What We Aim to Achieve",
    text: `To organize impactful finance-related events, workshops, and discussions that foster financial responsibility, promote investment awareness, and empower students to become confident financial leaders.`,
  },
  {
    title: "Our Vision",
    subtitle: "Our Long-Term Goal",
    text: `To build a financially aware and empowered student community where every individual possesses the knowledge, confidence, and integrity to navigate the financial world successfully.`,
  },
];

export default function AboutColumns() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-12">
      <div className="flex flex-row justify-between items-start gap-12 mb-24 about-columns-row">
        {columns.map((col, idx) => (
          <React.Fragment key={idx}>
            <div className="flex-1 text-center px-8">
              <div className="text-[38px] font-bold text-[#3c3450] mb-2">
                {col.title.split(" ")[0]}{" "}
                <span className="text-[#8C5BFF]">
                  {col.title.split(" ")[1]}
                </span>
              </div>
              <div className="text-[#b3b3b3] text-[22px] font-medium mb-6">
                {col.subtitle}
              </div>
              <div className="text-[#6d6a7c] text-[20px] font-normal leading-relaxed">
                {col.text}
              </div>
            </div>
            {idx < columns.length - 1 && (
              <div className="w-1 bg-gradient-to-b from-[#ede7ff] to-[#8C5BFF22] h-full self-center opacity-40 rounded-full" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
