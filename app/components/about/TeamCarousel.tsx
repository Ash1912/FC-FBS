"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const teamMembers = [
  {
    name: "Kriti Jain",
    role: "",
    image: "/images/teammembers/Kriti.jpg",
    linkedin:
      "https://www.linkedin.com/in/kriti-jain-2b99ba2b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/kritijain1710?igsh=azgwMnV6cmw3MmEx",
    email: "27kriti.jain@fostiima.org",
  },
  {
    name: "Rajat Jain",
    role: "",
    image: "/images/teammembers/Rajat.jpg",
    linkedin: "https://www.linkedin.com/in/rajat-jain-027978204/",
    instagram: "https://www.instagram.com/rajat_jain_____ ",
    email: "27rajat.jain@fostiima.org",
  },
  {
    name: "Shagun Malhotra",
    role: "",
    image: "/images/teammembers/Shagun.jpg",
    linkedin:
      "https://www.linkedin.com/in/shagun-malhotra-83a4b4268?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    instagram: "https://www.instagram.com/_ishagun09?igsh=ZGQwYTA5MW1xb2s3",
    email: "27shagun.malhotra@fostiima.org",
  },
  {
    name: "Ashish Mishra",
    role: "",
    image: "/images/teammembers/Ashish.jpg",
    linkedin:
      "https://www.linkedin.com/in/ashish-kumar-mishra-616321206?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/ash.ish__19?igsh=bGFlOTJueW4yY25m",
    email: "27ashish.mishra@fostiima.org",
  },
  {
    name: "Diksha Sharma",
    role: "",
    image: "/images/teammembers/Diksha.jpg",
    linkedin:
      "https://www.linkedin.com/in/diksha-sharma-90a427259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/dikkshhaa?igsh=MTJxZHpleWZoamtmOQ==",
    email: "27diksha.sharma@fostiima.org",
  },
  {
    name: "Sparsh Jain",
    role: "",
    image: "/images/teammembers/Sparsh.jpg",
    linkedin: "https://www.linkedin.com/in/sparsh-jain-776b27211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram: "https://www.instagram.com/sparsh_j?igsh=MXVxdWdhM2pkOXN4dQ%3D%3D&utm_source=qr",
    email: "27sparsh.jain@fostiima.org",
  },
  {
    name: "Aman",
    role: "",
    image: "/images/teammembers/Aman.jpg",
    linkedin:
      "https://www.linkedin.com/in/aman-96aaa8373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/amangarg1908?igsh=b29ubjNob3JxcGt6",
    email: "27aman1@fostiima.org",
  },
  {
    name: "Prateek",
    role: "",
    image: "/images/teammembers/Prateek.jpg",
    linkedin: "https://www.linkedin.com/in/prateek-3a2268373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/iprateek9?utm_source=qr&igsh=eDhvOW50eWFhcDl1",
    email: "27prateek@fostiima.org",
  },
  {
    name: "Anurag Sharma",
    role: "",
    image: "/images/teammembers/Anurag.jpg",
    linkedin:
      "https://www.linkedin.com/in/anurag-sharma-9b13702ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram:
      "https://www.instagram.com/anurag.sharma02?igsh=MXAxeHpzemoydnc3eQ%3D%3D&utm_source=qr",
    email: "27anurag.sharma@fostiima.org",
  },
  {
    name: "Aryan Sehrawat",
    role: "",
    image: "/images/teammembers/Aryan.jpg",
    linkedin:
      "https://www.linkedin.com/in/aryan-sehrawat-b359a3241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/__aryan.sehrawat__?igsh=MWtmeWU0ZTQ4d3No",
    email: "27aryan.sehrawat@fostiima.org",
  },
  {
    name: "Payal Naik",
    role: "",
    image: "/images/teammembers/Payal.jpg",
    linkedin: "https://www.linkedin.com/in/payal-naik-ba59b9363",
    instagram: "https://www.instagram.com/impayalnaik?igsh=N2RsZXYzeGx4YjBj",
    email: "27payal.naik@fostiima.org",
  },
  {
    name: "Shubh Gupta",
    role: "",
    image: "/images/teammembers/Shubh.jpg",
    linkedin:
      "https://www.linkedin.com/in/shubhgupta410?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/_shubh.gupta_?igsh=MWc3ejg1N2sza3l4eA%3D%3D&utm_source=qr",
    email: "27shubh.gupta@fostiima.org",
  },
  {
    name: "Surbhi Arora",
    role: "",
    image: "/images/teammembers/Surbhi.jpg",
    linkedin:
      "https://www.linkedin.com/in/surbhi-arora-69612520b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/surbhiiaroraa?igsh=cGlvaDJ5ZGRqejhz",
    email: "27surbhi.arora@fostiima.org",
  },
  {
    name: "Tanishk Ghadiya",
    role: "",
    image: "/images/teammembers/Tanishk.jpg",
    linkedin:
      "https://www.linkedin.com/in/tanishk-ghadiya-67a746256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    instagram:
      "https://www.instagram.com/ghadiyasaheb_in?igsh=bmt1NzF4cWp4MXk0",
    email: "27tanishk.ghadiya@fostiima.org",
  },
];

interface ArrowProps {
  onClick?: () => void;
  direction: "prev" | "next";
}

const CustomArrow: React.FC<ArrowProps> = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none"
    style={{
      left: direction === "prev" ? "-5px" : "auto",
      right: direction === "next" ? "-5px" : "auto",
      background: 'var(--card-bg)',
      border: `2px solid var(--primary)`,
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--neon-glow)',
    }}
  >
    {direction === "prev" ? (
      <FaArrowLeft size={18} className="text-[var(--primary)]" />
    ) : (
      <FaArrowRight size={18} className="text-[var(--primary)]" />
    )}
  </button>
);

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, dots: true, arrows: false },
      },
    ],
  };

  const isCenterSlide = (index: number) => {
    const totalSlides = teamMembers.length;
    const centerIndex = currentSlide % totalSlides;
    return index === centerIndex;
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="w-full mt-12 bg-gradient-to-tr from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)] py-12 relative overflow-visible">
      <div className="text-center">
        <h2 className="text-[48px] font-extrabold text-[var(--text-primary)] mb-6">
          Meet{" "}
          <span className="font-monospace font-bold text-[44px] align-middle text-[var(--primary)] inline-block mx-1"></span>
          our beautiful <span className="text-[var(--primary)]">Team</span>
        </h2>
      </div>
      
      <div className="max-w-6xl mx-auto team-carousel relative">
        <CustomArrow direction="prev" onClick={goToPrev} />
        <CustomArrow direction="next" onClick={goToNext} />
        
        <div className="px-4">
          <Slider ref={sliderRef} {...settings}>
            {teamMembers.map((member, idx) => {
              const isCenter = isCenterSlide(idx);
              return (
                <div key={idx} className="px-2">
                  <div
                    className={`rounded-xl shadow-lg transition-all duration-500 mx-auto ${
                      isCenter ? "scale-105 shadow-2xl" : "scale-90 opacity-70"
                    }`}
                    style={{
                      background: 'var(--card-bg)',
                      border: `1px solid ${isCenter ? 'var(--primary)' : 'var(--border-color)'}`,
                      minHeight: "380px",
                      maxWidth: "300px",
                      width: "90%",
                      transition: "all 0.5s ease-in-out",
                    }}
                  >
                    <div className="flex items-center justify-center overflow-hidden pt-3">
                      <div className="relative w-[250px] h-[250px]">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className={`object-contain transition-all duration-700 ${
                            isCenter ? "scale-110" : "scale-95 grayscale"
                          }`}
                          style={{
                            filter: isCenter ? "none" : "grayscale(100%)",
                            transition: "filter 0.5s ease-in-out, transform 0.5s ease-in-out",
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                        isCenter ? "text-[var(--primary)]" : "text-[var(--text-muted)]"
                      }`}>
                        {member.name}
                      </h3>
                      <p className="text-[var(--text-dim)] text-sm">{member.role}</p>
                      <div className={`flex justify-center space-x-4 mt-2 transition-all duration-300 ${
                        isCenter ? "opacity-100" : "opacity-50"
                      }`}>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                          <FaLinkedin size={26} className="text-[#0A66C2] hover:opacity-80 transition-opacity" />
                        </a>
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                          <FaInstagram size={26} className="text-[#E1306C] hover:opacity-80 transition-opacity" />
                        </a>
                        <a href={`mailto:${member.email}`} className="hover:scale-110 transition-transform">
                          <FaEnvelope size={26} className="text-[#EA4335] hover:opacity-80 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        /* Hide default slick arrows */
        .team-carousel :global(.slick-prev),
        .team-carousel :global(.slick-next),
        .team-carousel :global(.slick-arrow) {
          display: none !important;
        }
        
        .team-carousel :global(.slick-slide) {
          transition: all 0.5s ease-in-out;
        }
        
        .team-carousel :global(.slick-center) {
          opacity: 1;
        }
        
        .team-carousel :global(.slick-slide:not(.slick-center)) {
          opacity: 0.7;
        }
        
        /* Custom Dots Styling */
        .team-carousel :global(.custom-dots) {
          bottom: -40px;
          display: flex !important;
          justify-content: center;
          gap: 12px;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        
        .team-carousel :global(.custom-dots li) {
          display: inline-block;
          margin: 0;
          width: auto;
          height: auto;
          list-style: none;
        }
        
        .team-carousel :global(.custom-dots li button) {
          padding: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--text-dim);
          opacity: 0.5;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-indent: -9999px;
          overflow: hidden;
        }
        
        .team-carousel :global(.custom-dots li button:before) {
          display: none;
          content: none;
        }
        
        .team-carousel :global(.custom-dots li.slick-active button) {
          width: 30px;
          border-radius: 10px;
          background: var(--primary);
          opacity: 1;
        }
        
        .team-carousel :global(.custom-dots li button) {
          font-size: 0;
          line-height: 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .team-carousel :global(.custom-dots) {
            bottom: -30px;
          }
        }
      `}</style>
    </div>
  );
}