"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/auth/");

  let pageTitle = "FC - FOSTIIMA Chapter";

  if (pathname !== "/") {
    const formatted = pathname
      .replace("/", "")
      .split("/")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" / ");

    pageTitle = `${formatted} - FC - FOSTIIMA Chapter`;
  }

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SessionProvider>
            {showNavbar && <Navbar />}
            <Toaster position="top-right" />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}