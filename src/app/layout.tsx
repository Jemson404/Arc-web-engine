import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARC - Two Minds. One Pulse.",
  description: "Arc Engine: A reflective dialogue system",
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
