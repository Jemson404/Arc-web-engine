import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARC Engine",
  description: "Two Minds. One Spark. A dual-mind reflection system for deeper insights.",
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
