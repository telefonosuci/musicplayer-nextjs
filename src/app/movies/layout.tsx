import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My movies",
  description: "Movies next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">


      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


        <header className="flex items-center justify-between px-6 py-4 bg-zinc-900">
          <h1 className="text-3xl font-bold text-red-600">MyFlix</h1>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Serie</a>
            <a href="#" className="hover:underline">Film</a>
            <a href="#" className="hover:underline">La mia lista</a>
          </nav>
        </header>

        <section className="px-6 py-8">
          {children}
        </section>

      </body>
    </html>
  );
}
