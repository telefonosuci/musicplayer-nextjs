import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import '../../styles/musicplayer/layout.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Next App",
  description: "Generated music player by create next app",
};

export default function RootLayout({
  children,
  aside
}: Readonly<{
  children: React.ReactNode;
  aside: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <div className="container">

        <aside>{aside}</aside>
        <main>
          {children}
        </main>
        </div>
      </body>
    </html>
  );
}
