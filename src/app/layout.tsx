import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARC Engine",
  description: "A dual-mind reflection system with ARC-0, ARC-1, and Spark outputs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
