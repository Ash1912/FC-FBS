"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  MouseEvent,
  WheelEvent,
} from "react";
import Image from "next/image";
import Footer from "../components/Footer";

type EventCard = {
  id: number;
  title: string;
  images: string[];
  cardGifs: string[];
  description: string;
  date?: string;
  participants?: string;
};

type SelectedEvent = EventCard & {
  current: number;
};

type DragPosition = {
  x: number;
  y: number;
};

export default function EventPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(
    null
  );
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<DragPosition>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<DragPosition | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const [cardImageIndex, setCardImageIndex] = useState<Record<number, number>>(
    {}
  );

  const textSegments = [
    { text: "Recently", color: "text-gray-700" },
    { text: "at", color: "text-gray-700" },
    { text: "Finance Committee", color: "text-[#7C55D7]" },
  ];

  const sliderImages: string[] = [
    "/images/events/event0.jpg",
    "/images/events/event6.jpg",
    "/images/events/event15.jpg",
    "/images/events/event16.jpg",
    "/images/events/event17.jpg",
  ];

  const eventCards = useMemo<EventCard[]>(
    () => [
      {
        id: 1,
        title: "FinQuest 2025",
        cardGifs: ["/images/events/event04.gif", "/images/events/event06.gif"],
        images: [
          "/images/events/event04.gif",
          "/images/events/event1.jpg",
          "/images/events/event2.jpg",
          "/images/events/event4.jpg",
          "/images/events/event5.jpg",
          "/images/events/event6.jpg",
          "/images/events/event06.gif",
          "/images/events/event7.jpg",
          "/images/events/event8.jpg",
          "/images/events/event9.jpg",
          "/images/events/event10.jpg",
          "/images/events/event11.jpg",
          "/images/events/event12.jpg",
          "/images/events/event13.jpg",
          "/images/events/event14.jpg",
          "/images/events/event18.jpg",
          "/images/events/event19.jpg",
          "/images/events/event20.jpg",
          "/images/events/event21.jpg",
          "/images/events/event22.jpg",
          "/images/events/event23.jpg",
          "/images/events/event24.jpg",
          "/images/events/event25.jpg",
          "/images/events/event26.jpg",
          "/images/events/event27.jpg",
          "/images/events/event28.jpg",
          "/images/events/event29.jpg",
          "/images/events/event15.jpg",
          "/images/events/event16.jpg",
          "/images/events/event17.jpg",
        ],
        description:
          "FinQuest is a high-intensity finance quiz that challenges participants on markets, economics, accounting, and real-world financial scenarios.",
        date: "04 Nov 2025 and 06 Nov 2025",
        participants: "200+ participants",
      },
    ],
    []
  );

  // ------------ AUTO SLIDER ------------
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, sliderImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCardImageIndex((prev) => {
        const updated = { ...prev };

        eventCards.forEach((card) => {
          const current = prev[card.id] ?? 0;
          updated[card.id] = (current + 1) % card.cardGifs.length;
        });

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [eventCards]);

  function nextSlide() {
    setActiveIndex((prev) => (prev + 1) % sliderImages.length);
  }

  function prevSlide() {
    setActiveIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  }

  // ------------ MODAL ZOOM HANDLERS ------------
  function modalNextImage() {
    setSelectedEvent((prev) =>
      prev
        ? { ...prev, current: (prev.current + 1) % prev.images.length }
        : prev
    );
    resetZoom();
  }

  function modalPrevImage() {
    setSelectedEvent((prev) =>
      prev
        ? {
            ...prev,
            current:
              prev.current === 0 ? prev.images.length - 1 : prev.current - 1,
          }
        : prev
    );
    resetZoom();
  }

  function resetZoom() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function handleWheel(e: WheelEvent<HTMLDivElement>) {
    const newZoom = zoom + e.deltaY * -0.0015;
    setZoom(Math.min(Math.max(newZoom, 1), 4));
  }

  function startDrag(e: MouseEvent<HTMLDivElement>) {
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function endDrag() {
    setDragStart(null);
  }

  function duringDrag(e: MouseEvent<HTMLDivElement>) {
    if (!dragStart) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }

  return (
    <div className="relative">
      {/* ------------ HERO SECTION ------------ */}
      <section className="relative w-full py-20 min-h-[550px] md:min-h-[650px] lg:min-h-[700px]">
        <Image
          src="/images/events/event-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#A78BFF]/30 via-[#7C5DFF]/25 to-[#1E0F2F]/40 backdrop-blur-[14px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Events
            </h2>
            <p className="mt-4 text-3xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Our beautiful memories
            </p>

            <div className="flex gap-16 mt-12">
              <div>
                <p className="text-4xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  1+
                </p>
                <p className="text-xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Events
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div
            className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {sliderImages.map((src, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-700 rounded-2xl overflow-hidden border border-white/10 shadow-xl ${
                  idx === activeIndex
                    ? "opacity-100 scale-100 z-20"
                    : "opacity-0 scale-95 z-10"
                }`}
              >
                <Image src={src} alt="event" fill className="object-cover" />
              </div>
            ))}

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black/80 hover:bg-white/90 p-4 rounded-full shadow-lg transition"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black/80 hover:bg-white/90 p-4 rounded-full shadow-lg transition"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    idx === activeIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------ EVENT CARDS SECTION ------------ */}
      <section className="max-w-[1500px] mx-auto px-10 lg:px-20 mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-70 items-start">
          {/* LEFT TEXT BLOCK */}
          <div className="pr-6">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {textSegments.map((segment, index) => (
                <span key={index} className={`${segment.color}`}>
                  {segment.text}&nbsp;
                </span>
              ))}
            </h2>
          </div>

          {/* RIGHT EVENT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {eventCards.map((ev, idx) => (
              <div
                key={ev.id}
                onClick={() => setSelectedEvent({ ...ev, current: 0 })}
                className="relative group rounded-2xl overflow-hidden cursor-pointer
                     w-[380px] md:w-[400px] lg:w-[500px] mx-auto"
              >
                <div className="relative h-[330px] w-full">
                  <Image
                    src={ev.cardGifs[cardImageIndex[ev.id] ?? 0]}
                    alt={ev.title}
                    fill
                    className="object-cover transition-opacity duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div
                    className="absolute bottom-4 left-4 right-4 z-10 
     bg-black/35 backdrop-blur-md rounded-xl p-4 border border-white/10"
                  >
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      {ev.title}
                    </h3>
                    {ev.date && (
                      <p className="text-white text-sm mt-1">{ev.date}</p>
                    )}
                    {ev.participants && (
                      <p className="text-white text-sm">{ev.participants}</p>
                    )}
                  </div>
                </div>

                <span className="absolute top-4 right-4 text-6xl font-extrabold text-white/20">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------ VIEW MORE ------------ */}
      {/* <section className="max-w-7xl mx-auto px-6 lg:px-4 mt-14 mb-20">
        <div className="flex items-center gap-4">
          <div className="w-full border-t-2 border-[#7C55D7]"></div>

          <Link href="/gallery">
            <p className="text-xl text-black hover:text-[#9F7FFF] transition cursor-pointer whitespace-nowrap">
              View More
            </p>
          </Link>
        </div>
      </section> */}

      {/* ------------ MODAL ------------ */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-[999] pt-24">
          <div
            className="relative bg-white border border-gray-200 rounded-2xl 
                    p-5 w-[95%] md:w-[70%] lg:w-[55%] shadow-2xl 
                    animate-[fadeScale_0.35s_ease] min-h-[150px]"
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
              onClick={() => {
                setSelectedEvent(null);
                resetZoom();
              }}
            >
              ×
            </button>

            {/* Image Wrapper (Reduced Height) */}
            <div
              className="relative w-full h-[350px] md:h-[420px] rounded-xl overflow-hidden mb-4 
                   cursor-grab active:cursor-grabbing bg-gray-50"
              onWheel={handleWheel}
              onMouseDown={startDrag}
              onMouseUp={endDrag}
              onMouseMove={duringDrag}
            >
              <Image
                src={selectedEvent.images[selectedEvent.current]}
                alt={selectedEvent.title}
                fill
                className="object-contain select-none"
                style={{
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${
                    offset.y / zoom
                  }px)`,
                  transition: dragStart ? "none" : "transform 0.2s ease",
                }}
                draggable={false}
              />

              {/* LEFT ARROW */}
              <button
                onClick={modalPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white 
                     text-gray-700 hover:text-black shadow-md rounded-full p-3 backdrop-blur-md
                     transition"
              >
                ‹
              </button>

              {/* RIGHT ARROW */}
              <button
                onClick={modalNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white 
                     text-gray-700 hover:text-black shadow-md rounded-full p-3 backdrop-blur-md
                     transition"
              >
                ›
              </button>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              {selectedEvent.title}
            </h2>

            {/* Description */}
            <p className="mt-2 text-gray-700 text-base leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>

          {/* Animation */}
          <style>{`
      @keyframes fadeScale {
        0% { opacity: 0; transform: scale(0.85); }
        100% { opacity: 1; transform: scale(1); }
      }
    `}</style>
        </div>
      )}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
