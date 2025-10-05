"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NavButton: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
}> = ({ children, href, className = "" }) => (
  <Link
    href={href}
    className={`text-[#313053] hover:text-[#615fa1] cursor-pointer text-lg font-semibold transition ${className}`}
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("fcUserName");
    const storedEmail = localStorage.getItem("fcUserEmail");
    setUserName(storedName);
    setUserEmail(storedEmail);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  function handleLogout() {
    localStorage.removeItem("fcUserName");
    localStorage.removeItem("fcUserEmail");
    window.location.reload();
  }

  function getInitials(name: string | null): string {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const isLoggedIn = !!userName;
  const userInitials = getInitials(userName);
  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-[1002] bg-gradient-to-tr from-[#faf5ff] via-[#f3e8ff] via-[#e9d5ff] to-[#c4b5fd]
 min-h-[60px] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center w-full">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/Transparent logo.png"
              alt="Finance Committee logo"
              width={80}
              height={80}
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
              priority
            />
            <Link href="/">
              <span className="block text-[#8C5BFF] text-xl md:text-2xl font-semibold cursor-pointer hover:text-[#615fa1] transition">
                Finance Committee
              </span>
              <span className="block text-[#6d6a7c] text-sm md:text-base font-medium">
                FOSTIIMA Chapter
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-[#313053] font-medium">
            <NavButton href="/aboutus">About Us</NavButton>
            <NavButton href="/blog">Blog</NavButton>
            <div className="ml-6 flex items-center">
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="w-10 h-10 rounded-full bg-[#6356D7] text-white flex items-center justify-center text-lg font-bold shadow cursor-pointer border-4 border-white hover:scale-105 transition-all"
                    onClick={() => setShowDropdown((v) => !v)}
                    title={userName || undefined}
                  >
                    {userInitials}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200 animate-fade-in">
                      <div className="mb-2 text-base font-bold text-[#6356D7]">
                        {userName}
                      </div>
                      <div className="mb-1 text-gray-700 text-xs font-semibold">
                        {userEmail}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="mt-3 w-full px-3 py-2 bg-[#6356D7] text-white rounded hover:bg-[#7E5FFF] font-semibold transition-all text-sm"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/signin">
                  <div className="w-10 h-10 rounded-full bg-[#6356D7] text-white flex items-center justify-center text-lg font-bold shadow cursor-pointer border-4 border-white hover:scale-105 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368"
                      />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-transparent transition relative z-[1003]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            style={{
              border: "none",
              boxShadow: "none",
              background: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="5" width="24" height="2.5" rx="1.25" fill="#313053" />
              <rect y="11" width="24" height="2.5" rx="1.25" fill="#313053" />
              <rect y="17" width="24" height="2.5" rx="1.25" fill="#313053" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden absolute top-[60px] left-0 right-0 w-[100vw] bg-white rounded-b-lg shadow-lg py-4 px-0 flex flex-col items-center gap-4 text-[#313053] font-medium z-[1004] border-b border-x border-[#ede7ff]"
            style={{ marginTop: "2px" }}
          >
            <Link
              href="/aboutus"
              className="text-lg w-full"
              onClick={() => setMenuOpen(false)}
            >
              <button
                className="w-full text-center py-3 hover:bg-[#f6f3ff] transition"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                About Us
              </button>
            </Link>
            <Link
              href="/blog"
              className="text-lg w-full"
              onClick={() => setMenuOpen(false)}
            >
              <button
                className="w-full text-center py-3 hover:bg-[#f6f3ff] transition"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                Blog
              </button>
            </Link>
            <div className="w-full flex justify-center mt-2">
              {isLoggedIn ? (
                <div className="w-10 h-10 rounded-full bg-[#6356D7] text-white flex items-center justify-center text-lg font-bold shadow cursor-pointer border-4 border-white hover:scale-105 transition-all">
                  {userInitials}
                </div>
              ) : (
                <Link href="/auth/signin" className="w-10 h-10">
                  <div className="w-10 h-10 rounded-full bg-[#6356D7] text-white flex items-center justify-center text-lg font-bold shadow cursor-pointer border-4 border-white hover:scale-105 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368"
                      />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
