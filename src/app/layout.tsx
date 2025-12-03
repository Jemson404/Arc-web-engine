import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARC Engine",
  description: "ARC Engine - Dual minds with middle lens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
