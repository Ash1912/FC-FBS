"use client";
import React, { useState } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import Image from "next/image";
import {
  FaArrowLeft,
  FaArrowRight,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
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

const NextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <div
    className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowRight size={36} className="text-[#8C5BFF] hover:text-[#3c3450]" />
  </div>
);

const PrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <div
    className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowLeft size={36} className="text-[#8C5BFF] hover:text-[#3c3450]" />
  </div>
);

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false, dots: true },
      },
    ],
  };

  return (
    <div className="w-full mt-12 bg-gradient-to-tr from-[#faf5ff] via-[#f3e8ff] via-[#e9d5ff] to-[#c4b5fd] py-12">
      <div className="text-center">
        <h2 className="text-[48px] font-extrabold text-[#3c3450] mb-6">
          Meet{" "}
          <span className="font-monospace font-bold text-[44px] align-middle text-[#8C5BFF] inline-block mx-1"></span>
          our beautiful <span className="text-[#8C5BFF]">Team</span>
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-1 team-carousel">
        <Slider {...settings}>
          {teamMembers.map((member, idx) => {
            const isCenter = idx === currentSlide % teamMembers.length;
            return (
              <div key={idx} className="px-2">
                <div
                  className={`bg-white rounded-xl shadow-lg transition-transform duration-500 mx-auto ${
                    isCenter ? "scale-99" : "scale-90 grayscale"
                  }`}
                  style={{
                    minHeight: "380px",
                    maxWidth: "300px",
                    width: "90%",
                  }}
                >
                  <div className="flex items-center justify-center overflow-hidden pt-3">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={250}
                      height={250}
                      className={`object-contain transition-transform duration-500 ${
                        isCenter ? "scale-110" : "scale-95"
                      }`}
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-lg font-semibold text-[#3c3450]">
                      {member.name}
                    </h3>
                    <p className="text-[#8C5BFF99] text-sm">{member.role}</p>
                    <div className="flex justify-center space-x-4 mt-2">
                      <a href={member.linkedin} target="_blank">
                        <FaLinkedin size={26} className="text-[#0A66C2]" />
                      </a>
                      <a href={member.instagram} target="_blank">
                        <FaInstagram size={26} className="text-[#E1306C]" />
                      </a>
                      <a href={`mailto:${member.email}`}>
                        <FaEnvelope size={26} className="text-[#EA4335]" />
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
  );
}
