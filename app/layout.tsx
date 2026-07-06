import type { Metadata } from "next";
import { Chakra_Petch, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noel George Thomas — Full-Stack Developer",
  description:
    "Full-stack developer building production-grade systems in Go, Flutter and React. 2+ years shipping to real users.",
  openGraph: {
    title: "Noel George Thomas — Full-Stack Developer",
    description:
      "Full-stack developer building production-grade systems in Go, Flutter and React.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
