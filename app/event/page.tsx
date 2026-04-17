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
import Navbar from "../components/Navbar";

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
    null,
  );
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<DragPosition>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<DragPosition | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const [cardImageIndex, setCardImageIndex] = useState<Record<number, number>>(
    {},
  );

  const textSegments = [
    { text: "Recently", color: "text-[var(--text-secondary)]" },
    { text: "at", color: "text-[var(--text-secondary)]" },
    { text: "Finance Committee", color: "text-[var(--primary)]" },
  ];

  const sliderImages: string[] = [
    "/images/event_StockiFy26/grandFinale/58.jpg",
    "/images/event_StockiFy26/grandFinale/57.jpg",
    "/images/event_StockiFy26/grandFinale/65.jpg",
    "/images/event_StockiFy26/grandFinale/61.jpg",
    "/images/event_StockiFy26/grandFinale/56.jpg",
    "/images/event_StockiFy26/grandFinale/62.jpg",
    "/images/event_FinQuest25/0.jpg",
    "/images/event_FinQuest25/1.jpg",
    "/images/event_FinQuest25/2.jpg",
    "/images/event_FinQuest25/3.jpg",
    "/images/event_FinQuest25/final/9.jpg",
    "/images/event_FinQuest25/semifinal/6.jpg",
  ];

  const eventCards = useMemo<EventCard[]>(
    () => [
      {
        id: 1,
        title: "FinQuest 2025 SemiFinal",
        cardGifs: ["/images/event_FinQuest25/semifinal/0.gif"],
        images: [
          "/images/event_FinQuest25/semifinal/0.gif",
          "/images/event_FinQuest25/semifinal/1.jpg",
          "/images/event_FinQuest25/semifinal/2.jpg",
          "/images/event_FinQuest25/semifinal/3.jpg",
          "/images/event_FinQuest25/semifinal/4.jpg",
          "/images/event_FinQuest25/semifinal/5.jpg",
          "/images/event_FinQuest25/semifinal/6.jpg",
        ],
        description:
          "FinQuest is a high-intensity finance quiz that challenges participants on markets, economics, accounting, and real-world financial scenarios.",
        date: "04 Nov 2025",
        participants: "210 participants",
      },
      {
        id: 2,
        title: "FinQuest 2025 Final",
        cardGifs: ["/images/event_FinQuest25/final/0.gif"],
        images: [
          "/images/event_FinQuest25/final/0.gif",
          "/images/event_FinQuest25/final/1.jpg",
          "/images/event_FinQuest25/final/2.jpg",
          "/images/event_FinQuest25/final/3.jpg",
          "/images/event_FinQuest25/final/4.jpg",
          "/images/event_FinQuest25/final/5.jpg",
          "/images/event_FinQuest25/final/6.jpg",
          "/images/event_FinQuest25/final/7.jpg",
          "/images/event_FinQuest25/final/8.jpg",
          "/images/event_FinQuest25/final/9.jpg",
          "/images/event_FinQuest25/final/10.jpg",
          "/images/event_FinQuest25/final/11.jpg",
          "/images/event_FinQuest25/final/12.jpg",
          "/images/event_FinQuest25/final/13.jpg",
          "/images/event_FinQuest25/final/14.jpg",
          "/images/event_FinQuest25/final/15.jpg",
          "/images/event_FinQuest25/final/16.jpg",
          "/images/event_FinQuest25/final/17.jpg",
          "/images/event_FinQuest25/final/18.jpg",
          "/images/event_FinQuest25/final/19.jpg",
          "/images/event_FinQuest25/final/20.jpg",
          "/images/event_FinQuest25/final/21.jpg",
        ],
        description:
          "FinQuest is a high-intensity finance quiz that challenges participants on markets, economics, accounting, and real-world financial scenarios.",
        date: "06 Nov 2025",
        participants: "18 participants",
      },
      {
        id: 3,
        title: "StockiFy 2026 Prelims",
        cardGifs: ["/images/event_StockiFy26/prelims/01.gif"],
        images: [
          "/images/event_StockiFy26/prelims/01.gif",
          "/images/event_StockiFy26/prelims/1.jpg",
          "/images/event_StockiFy26/prelims/2.jpg",
          "/images/event_StockiFy26/prelims/3.jpg",
          "/images/event_StockiFy26/prelims/02.gif",
          "/images/event_StockiFy26/prelims/4.jpg",
          "/images/event_StockiFy26/prelims/5.jpg",
          "/images/event_StockiFy26/prelims/6.jpg",
          "/images/event_StockiFy26/prelims/03.gif",
          "/images/event_StockiFy26/prelims/7.jpg",
          "/images/event_StockiFy26/prelims/8.jpg",
          "/images/event_StockiFy26/prelims/9.jpg",
          "/images/event_StockiFy26/prelims/04.gif",
          "/images/event_StockiFy26/prelims/10.jpg",
          "/images/event_StockiFy26/prelims/11.jpg",
          "/images/event_StockiFy26/prelims/12.jpg",
        ],
        description:
          "StockiFy is a high-intensity stock market simulation event that challenges participants to apply financial knowledge, analytical thinking, and strategic decision-making in real-time market scenarios involving buying, selling, and holding financial instruments.",
        date: "19 Jan 2026",
        participants: "123 participants",
      },
      {
        id: 4,
        title: "StockiFy 2026 Grand Finale",
        cardGifs: ["/images/event_StockiFy26/grandFinale/04.gif"],
        images: [
          "/images/event_StockiFy26/grandFinale/01.gif",
          "/images/event_StockiFy26/grandFinale/1.jpg",
          "/images/event_StockiFy26/grandFinale/2.jpg",
          "/images/event_StockiFy26/grandFinale/3.jpg",
          "/images/event_StockiFy26/grandFinale/4.jpg",
          "/images/event_StockiFy26/grandFinale/5.jpg",
          "/images/event_StockiFy26/grandFinale/6.jpg",
          "/images/event_StockiFy26/grandFinale/7.jpg",
          "/images/event_StockiFy26/grandFinale/8.jpg",
          "/images/event_StockiFy26/grandFinale/9.jpg",
          "/images/event_StockiFy26/grandFinale/10.jpg",
          "/images/event_StockiFy26/grandFinale/11.jpg",
          "/images/event_StockiFy26/grandFinale/12.jpg",
          "/images/event_StockiFy26/grandFinale/13.jpg",
          "/images/event_StockiFy26/grandFinale/14.jpg",
          "/images/event_StockiFy26/grandFinale/15.jpg",
          "/images/event_StockiFy26/grandFinale/16.jpg",
          "/images/event_StockiFy26/grandFinale/17.jpg",
          "/images/event_StockiFy26/grandFinale/02.gif",
          "/images/event_StockiFy26/grandFinale/18.jpg",
          "/images/event_StockiFy26/grandFinale/19.jpg",
          "/images/event_StockiFy26/grandFinale/20.jpg",
          "/images/event_StockiFy26/grandFinale/21.jpg",
          "/images/event_StockiFy26/grandFinale/22.jpg",
          "/images/event_StockiFy26/grandFinale/23.jpg",
          "/images/event_StockiFy26/grandFinale/24.jpg",
          "/images/event_StockiFy26/grandFinale/25.jpg",
          "/images/event_StockiFy26/grandFinale/26.jpg",
          "/images/event_StockiFy26/grandFinale/27.jpg",
          "/images/event_StockiFy26/grandFinale/28.jpg",
          "/images/event_StockiFy26/grandFinale/29.jpg",
          "/images/event_StockiFy26/grandFinale/30.jpg",
          "/images/event_StockiFy26/grandFinale/31.jpg",
          "/images/event_StockiFy26/grandFinale/32.jpg",
          "/images/event_StockiFy26/grandFinale/33.jpg",
          "/images/event_StockiFy26/grandFinale/34.jpg",
          "/images/event_StockiFy26/grandFinale/03.gif",
          "/images/event_StockiFy26/grandFinale/35.jpg",
          "/images/event_StockiFy26/grandFinale/36.jpg",
          "/images/event_StockiFy26/grandFinale/37.jpg",
          "/images/event_StockiFy26/grandFinale/38.jpg",
          "/images/event_StockiFy26/grandFinale/39.jpg",
          "/images/event_StockiFy26/grandFinale/40.jpg",
          "/images/event_StockiFy26/grandFinale/41.jpg",
          "/images/event_StockiFy26/grandFinale/42.jpg",
          "/images/event_StockiFy26/grandFinale/43.jpg",
          "/images/event_StockiFy26/grandFinale/44.jpg",
          "/images/event_StockiFy26/grandFinale/45.jpg",
          "/images/event_StockiFy26/grandFinale/46.jpg",
          "/images/event_StockiFy26/grandFinale/47.jpg",
          "/images/event_StockiFy26/grandFinale/48.jpg",
          "/images/event_StockiFy26/grandFinale/49.jpg",
          "/images/event_StockiFy26/grandFinale/50.jpg",
          "/images/event_StockiFy26/grandFinale/51.jpg",
          "/images/event_StockiFy26/grandFinale/04.gif",
          "/images/event_StockiFy26/grandFinale/53.jpg",
          "/images/event_StockiFy26/grandFinale/54.jpg",
          "/images/event_StockiFy26/grandFinale/55.jpg",
          "/images/event_StockiFy26/grandFinale/56.jpg",
          "/images/event_StockiFy26/grandFinale/57.jpg",
          "/images/event_StockiFy26/grandFinale/58.jpg",
          "/images/event_StockiFy26/grandFinale/59.jpg",
          "/images/event_StockiFy26/grandFinale/60.jpg",
          "/images/event_StockiFy26/grandFinale/61.jpg",
          "/images/event_StockiFy26/grandFinale/62.jpg",
          "/images/event_StockiFy26/grandFinale/63.jpg",
          "/images/event_StockiFy26/grandFinale/64.jpg",
          "/images/event_StockiFy26/grandFinale/65.jpg",
          "/images/event_StockiFy26/grandFinale/66.jpg",
        ],
        description:
          "StockiFy is a high-intensity stock market simulation event that challenges participants to apply financial knowledge, analytical thinking, and strategic decision-making in real-time market scenarios involving buying, selling, and holding financial instruments.",
        date: "21 Jan 2026",
        participants: "45 participants",
      },
    ],
    [],
  );

  // ------------ AUTO SLIDER ------------
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderImages.length);
    }, 2000);

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
        : prev,
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
        : prev,
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

  const recentEvent = eventCards[eventCards.length - 1];
  const otherEvents = eventCards.slice(0, -1);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      
      {/* ------------ HERO SECTION ------------ */}
      <section className="relative w-full py-20 min-h-[620px] md:min-h-[720px] lg:min-h-[780px] overflow-hidden mt-16">
        {/* BACKGROUND IMAGE */}
        <Image
          src="/images/event_StockiFy26/event-bg.jpg"
          alt="Background"
          fill
          className="object-cover object-top"
          priority
        />

        {/* GLOBAL BLUR + GRADIENT OVERLAY (REDUCED BLUR) */}
        <div
          className="absolute inset-0 
      bg-gradient-to-br 
      from-[var(--primary)]/35 
      via-[var(--primary-dark)]/30 
      to-[var(--footer-bg)]/85
      backdrop-blur-[10px]
      border-b border-white/10"
        />

        {/* CONTENT */}
        <div
          className="
      relative max-w-7xl mx-auto px-6 lg:px-4
      pt-24 md:pt-28 lg:pt-32
      grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr]
      items-center gap-14
      -translate-y-12 md:-translate-y-16
    "
        >
          {/* LEFT TEXT */}
          <div className="relative z-10 flex flex-col justify-center">
            {/* TEXT GLASS PANEL (REDUCED BLUR) */}
            <div className="absolute -inset-6 rounded-3xl bg-black/30 backdrop-blur-md" />

            <div className="relative">
              <h2
                className="
            text-5xl md:text-6xl font-extrabold
            bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--primary-light)]
            bg-clip-text text-transparent
            drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)]
          "
              >
                Events
              </h2>

              <p className="mt-4 text-3xl text-[var(--text-secondary)]/90 drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
                Our beautiful memories
              </p>

              <div className="flex gap-16 mt-14">
                <div>
                  <p className="text-4xl font-bold text-[var(--primary-light)] drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)]">
                    2+
                  </p>
                  <p className="text-xl text-[var(--text-secondary)]/85">Events</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div
            className="relative w-full h-[320px] md:h-[440px] lg:h-[500px]
      overflow-hidden rounded-3xl
      shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {sliderImages.map((src, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-700 ease-out rounded-3xl overflow-hidden border border-white/10 ${
                  idx === activeIndex
                    ? "opacity-100 scale-100 z-20"
                    : "opacity-0 scale-95 z-10"
                }`}
              >
                <Image
                  src={src}
                  alt="event"
                  fill
                  className="object-contain bg-black/20"
                />
              </div>
            ))}

            {/* CONTROLS */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2
        bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2
        bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition"
            >
              ›
            </button>

            {/* DOTS */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === activeIndex ? "bg-white scale-125" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------ EVENT CARDS SECTION ------------ */}
      <section className="max-w-[1500px] mx-auto px-10 lg:px-20 mt-28">
        {/* TOP ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT TEXT BLOCK */}
          <div className="pr-6">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {textSegments.map((segment, index) => (
                <span key={index} className={segment.color}>
                  {segment.text}&nbsp;
                </span>
              ))}
            </h2>
          </div>

          {/* MOST RECENT EVENT */}
          <div
            onClick={() => setSelectedEvent({ ...recentEvent, current: 0 })}
            className="relative group rounded-2xl overflow-hidden cursor-pointer
                 w-[380px] md:w-[400px] lg:w-[500px] mx-auto"
          >
            <div className="relative h-[330px] w-full">
              <Image
                src={recentEvent.cardGifs[cardImageIndex[recentEvent.id] ?? 0]}
                alt={recentEvent.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div
                className="absolute bottom-4 left-4 right-4 z-10 
             bg-black/35 backdrop-blur-md rounded-xl p-4 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white">
                  {recentEvent.title}
                </h3>
                <p className="text-white text-sm mt-1">{recentEvent.date}</p>
                <p className="text-white text-sm">{recentEvent.participants}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW – OTHER EVENTS */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {otherEvents.map((ev, idx) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent({ ...ev, current: 0 })}
              className="relative group rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative h-[300px] w-full">
                <Image
                  src={ev.cardGifs[cardImageIndex[ev.id] ?? 0]}
                  alt={ev.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div
                  className="absolute bottom-4 left-4 right-4 z-10 
               bg-black/35 backdrop-blur-md rounded-xl p-4 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white">{ev.title}</h3>
                  <p className="text-white text-sm">{ev.date}</p>
                  <p className="text-white text-sm">{ev.participants}</p>
                </div>
              </div>

              <span className="absolute top-4 right-4 text-5xl font-extrabold text-white/20">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
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
            className="relative rounded-2xl 
                    p-5 w-[95%] md:w-[70%] lg:w-[55%] shadow-2xl 
                    animate-[fadeScale_0.35s_ease] min-h-[150px]"
            style={{
              background: 'var(--card-bg)',
              border: `1px solid var(--border-color)`,
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-2xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
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
                   cursor-grab active:cursor-grabbing"
              style={{ background: 'var(--bg-secondary)' }}
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
                className="absolute left-4 top-1/2 -translate-y-1/2 
                     text-gray-700 hover:text-black shadow-md rounded-full p-3 backdrop-blur-md
                     transition"
                style={{
                  background: 'var(--card-bg)/70',
                  border: `1px solid var(--border-color)`,
                }}
              >
                ‹
              </button>

              {/* RIGHT ARROW */}
              <button
                onClick={modalNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 
                     text-gray-700 hover:text-black shadow-md rounded-full p-3 backdrop-blur-md
                     transition"
                style={{
                  background: 'var(--card-bg)/70',
                  border: `1px solid var(--border-color)`,
                }}
              >
                ›
              </button>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-2">
              {selectedEvent.title}
            </h2>

            {/* Description */}
            <p className="mt-2 text-[var(--text-muted)] text-base leading-relaxed">
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