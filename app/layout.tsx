"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/auth/");

  // 🧠 Auto-generate dynamic title
  let pageTitle = "FC - FOSTIIMA Chapter";
  if (pathname !== "/") {
    const formatted = pathname
      .replace("/", "")
      .split("/")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" / ");
    pageTitle = `${formatted} - FC - FOSTIIMA Chapter`;
  }

  // ✅ Dynamically set <title> and <link rel="icon"> safely on client side
  useEffect(() => {
    document.title = pageTitle;

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.setAttribute("href", "/icons/Transparentlogo.ico");
      favicon.setAttribute("type", "image/x-icon");
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = "/icons/Transparentlogo.ico";
      link.type = "image/x-icon";
      document.head.appendChild(link);
    }
  }, [pageTitle]);

  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        {showNavbar && <Navbar />}
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
