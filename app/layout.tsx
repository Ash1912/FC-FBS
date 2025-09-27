"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/auth/");
  return (
    <html
      lang="en"
      className="overflow-x-hidden"
      suppressHydrationWarning={true}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            background: #fff;
            min-height: 100vh;
          }
        `}</style>
      </head>
      <body className="overflow-x-hidden">
        {showNavbar && <Navbar />}

        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
