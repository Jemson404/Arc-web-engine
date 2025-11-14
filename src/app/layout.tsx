import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARC Engine - Two Minds. One Spark.",
  description: "Experience the convergence of dual perspectives, synthesized into breakthrough insights.",
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
