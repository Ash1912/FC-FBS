"use client";
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import Slider, { CustomArrowProps } from "react-slick";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const teamMembers = [
  {
    name: "Kriti Jain",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Rajat Jain",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Ashish Mishra",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Diksha Sharma",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Sparsh Jain",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Aman",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Prateek",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Anurag Sharma",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Aryan Sehrawat",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Payal Naik",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Shubh Gupta",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Surbhi Arora",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Tanishk Ghadiya",
    role: "",
    image: "/images/Ashish.jpg",
    linkedin: "#",
    instagram: "#",
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

const TeamCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-1 py-14">
      <Slider {...settings}>
        {teamMembers.map((member, idx) => {
          const isCenter = idx === currentSlide % teamMembers.length;
          return (
            <div key={idx} className="px-2">
              <div
                className={`bg-white rounded-xl shadow-lg transition-transform duration-500 ${
                  isCenter
                    ? "scale-110 w-[90%] sm:w-[80%] md:w-[45%]"
                    : "scale-90 w-[95%] sm:w-[85%] md:w-[60%] grayscale"
                } mt-6.5 md:mt-0 mx-auto`}
                style={{ height: "500px", width: "100%" }}
              >
                {/* Top image portion */}
                <div className="h-2/3 w-full flex items-center justify-center md:pt-2 lg:pt-0 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className={`object-contain max-h-full transition-transform duration-500
      ${
        isCenter
          ? "scale-95 sm:scale-100 md:scale-105 lg:scale-110"
          : "scale-80 sm:scale-90 md:scale-95"
      }
    `}
                  />
                </div>

                {/* Bottom profile details */}
                <div className="h-1/3 p-1 text-center flex flex-col justify-start mt-3">
                  <h3 className="text-lg font-semibold text-[#3c3450]">
                    {member.name}
                  </h3>
                  <p className="text-[#8C5BFF99] text-sm mb-0">{member.role}</p>
                  <div className="flex justify-center space-x-4 mt-1">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin
                        className="text-[#0A66C2] hover:scale-110 transition"
                        size={32}
                      />
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram
                        className="text-[#E1306C] hover:scale-110 transition"
                        size={32}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section
      id="contact"
      className="w-full flex justify-center items-center mt-12"
    >
      <form
        className="w-[90%] max-w-[900px] bg-gradient-radial-ellipse-60-40 rounded-[32px] shadow-[0_4px_32px_#e6e0fa33] p-12 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="text-[40px] font-extrabold text-[#3c3450] mb-2 text-center">
          Get In <span className="text-[#8C5BFF]">Touch</span>
        </div>
        <div className="text-[#6d6a7c] text-[20px] font-normal mb-8 text-center">
          Have questions about events? <br />
          Reach out to ensure clarity, transparency, and smooth collaboration.
        </div>
        <div className="about-contact-names-row flex gap-6 w-full mb-4">
          <input
            type="text"
            placeholder="Enter your First Name"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            style={{
              flex: 1,
              padding: "16px 18px",
              fontSize: 18,
              borderRadius: 8,
              border: "1.5px solid #b9aaff",
              outline: "none",
              background: "#fff",
              color: "#313053",
              fontWeight: 500,
              transition: "border 0.2s",
            }}
          />
          <input
            type="text"
            placeholder="Enter your Last Name"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            style={{
              flex: 1,
              padding: "16px 18px",
              fontSize: 18,
              borderRadius: 8,
              border: "1.5px solid #b9aaff",
              outline: "none",
              background: "#fff",
              color: "#313053",
              fontWeight: 500,
              transition: "border 0.2s",
            }}
          />
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            width: "100%",
            padding: "16px 18px",
            fontSize: 18,
            borderRadius: 8,
            border: "1.5px solid #b9aaff",
            outline: "none",
            background: "#fff",
            color: "#313053",
            fontWeight: 500,
            marginBottom: 18,
            transition: "border 0.2s",
          }}
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
          className="w-full px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium mb-4 transition-colors duration-200"
        />
        <textarea
          placeholder="Enter your message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
          rows={4}
          className="w-full px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium mb-7 resize-y transition-colors duration-200"
        />
        <button
          type="submit"
          className="w-full bg-[#8C5BFF] text-white border-none rounded-[10px] text-[22px] font-semibold py-3 cursor-pointer shadow-[0_2px_8px_#8C5BFF22] transition-colors duration-200"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-f6f3ff flex flex-col">
      <Navbar />
      <section className="w-full min-h-[48vh] flex flex-col items-center justify-center py-16 bg-[#FAFEF6] relative overflow-hidden">
        <div className="text-center w-full max-w-[1100px] mx-auto">
          <div className="text-[#a18fff] font-bold text-[24px] mb-3 mt-16">
            Discover Our Journey
          </div>
          <h1 className="text-[56px] font-extrabold text-[#3c3450] leading-tight">
            We&apos;re Shaping the future of
            <br />
            <span className="text-[#8C5BFF]">Campus Events</span>
          </h1>
          <div className="text-[#6d6a7c] text-[22px] font-normal mt-5">
            Supporting students in organizing memorable campus events, managing
            budgets responsibly,
            <br />
            and ensuring transparency in every allocation.
          </div>
        </div>
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
      <section className="w-full flex justify-center items-center mb-12">
        <div className="w-[90%] max-w-[1300px] rounded-[24px] overflow-hidden shadow-[0_4px_32px_#e6e0fa33] bg-white">
          <Image
            src="/images/aboutUS.jpg"
            alt="Team working on tablet"
            width={1300}
            height={650}
            className="w-full h-auto block"
            priority
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center justify-center py-12">
        <div className="about-columns-row flex flex-row justify-between items-start gap-12 mb-24">
          <div className="flex-1 text-center px-8">
            <div className="text-[38px] font-bold text-[#3c3450] mb-2">
              Our <span className="text-[#8C5BFF]">Story</span>
            </div>
            <div className="text-[#b3b3b3] text-[22px] font-medium mb-6">
              Why We Started
            </div>
            <div className="text-[#6d6a7c] text-[20px] font-normal leading-relaxed">
              We are a student-led committee dedicated to organizing campus
              events, managing budgets responsibly, and ensuring that every
              activity is transparent and benefits the student community.
            </div>
          </div>
          <div className="w-1 bg-gradient-to-b from-[#ede7ff] to-[#8C5BFF22] h-full self-center opacity-40 rounded-full" />
          <div className="flex-1 text-center px-8">
            <div className="text-[38px] font-bold text-[#3c3450] mb-2">
              Our <span className="text-[#8C5BFF]">Mission</span>
            </div>
            <div className="text-[#b3b3b3] text-[22px] font-medium mb-6">
              What We Aim to Achieve
            </div>
            <div className="text-[#6d6a7c] text-[20px] font-normal leading-relaxed">
              To organize impactful campus events, ensure responsible budget
              management, and promote student engagement with full transparency
              in every allocation.
            </div>
          </div>
          <div className="w-1 bg-gradient-to-b from-[#ede7ff] to-[#8C5BFF22] h-full self-center opacity-40 rounded-full" />
          <div className="flex-1 text-center px-8">
            <div className="text-[38px] font-bold text-[#3c3450] mb-2">
              Our <span className="text-[#8C5BFF]">Vision</span>
            </div>
            <div className="text-[#b3b3b3] text-[22px] font-medium mb-6">
              Our Long-Term Goal
            </div>
            <div className="text-[#6d6a7c] text-[20px] font-normal leading-relaxed">
              To create a vibrant campus life where every event is
              well-organized, financially responsible, and transparent,
              empowering students to participate and thrive.
            </div>
          </div>
        </div>
        <div className="w-full mt-12 bg-gradient-to-tr from-[#faf5ff] via-[#f3e8ff] via-[#e9d5ff] to-[#c4b5fd]">
          <div className="text-center">
            <div className="text-[48px] font-extrabold text-[#3c3450] mb-1">
              Meet{" "}
              <span className="font-monospace font-bold text-[44px] align-middle text-[#8C5BFF] inline-block mx-1"></span>
              our beautiful <span className="text-[#8C5BFF]">Team</span>
            </div>
            <TeamCarousel />
          </div>
        </div>
      </section>
      <div className="mt-[-120]">
        <ContactFormSection />
      </div>
      <section className="w-full flex justify-center items-start mt-24">
        <div className="w-[90%] max-w-[1400px] flex flex-row gap-16 items-start justify-center"></div>
      </section>

      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          .team-carousel {
            max-width: 98vw !important;
            gap: 12px !important;
          }
          .about-section,
          .about-form {
            padding: 18px !important;
          }
          .about-card,
          .team-card {
            min-width: 180px !important;
            width: 180px !important;
            height: 200px !important;
            font-size: 1rem !important;
          }
          .about-form input,
          .about-form textarea {
            font-size: 1rem !important;
            padding: 10px !important;
          }
        }
        @media (max-width: 600px) {
          .team-carousel {
            max-width: 100vw !important;
            gap: 6px !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
          }
          .about-section,
          .about-form {
            padding: 8px !important;
          }
          .about-card,
          .team-card {
            min-width: 120px !important;
            width: 120px !important;
            height: 120px !important;
            font-size: 0.9rem !important;
          }
          .about-form input,
          .about-form textarea {
            font-size: 0.9rem !important;
            padding: 6px !important;
          }
          .about-btn {
            width: 100% !important;
            font-size: 1rem !important;
            padding: 10px 0 !important;
          }
          .about-columns-row {
            flex-direction: column !important;
            width: 98vw !important;
            max-width: 98vw !important;
            gap: 0 !important;
            margin-bottom: 24px !important;
          }
          .about-columns-row > * {
            width: 100% !important;
            max-width: 100vw !important;
            margin-bottom: 24px !important;
            box-sizing: border-box !important;
          }
          .about-contact-names-row {
            flex-direction: column !important;
            gap: 10px !important;
            width: 100% !important;
            flex-wrap: wrap !important;
            min-height: unset !important;
            overflow: visible !important;
          }
          .about-contact-names-row input {
            width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
            display: block !important;
            position: static !important;
            visibility: visible !important;
          }
        }
      `}</style>
    </div>
  );
}
