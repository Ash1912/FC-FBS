"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutImage from "../components/about/AboutImage";
import AboutColumns from "../components/about/AboutColumns";
import TeamCarousel from "../components/about/TeamCarousel";
import ContactForm from "../components/about/ContactForm";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-[#f6f3ff]">
      <Navbar />
      <AboutHero />
      <AboutImage />
      <AboutColumns />
      <TeamCarousel />
      <ContactForm />
      <Footer />

      <style jsx global>{`
        .team-carousel .slick-list {
          overflow: hidden !important;
        }
        .team-carousel .slick-track {
          display: flex !important;
          align-items: center !important;
        }
        .team-carousel .slick-slide {
          display: flex !important;
          justify-content: center !important;
          float: none !important;
        }

        @media (max-width: 900px) {
          .team-carousel {
            max-width: 98vw !important;
          }
          .about-columns-row {
            flex-direction: column !important;
          }
          .about-contact-names-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
