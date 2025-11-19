import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwingMe - Modern Dating Platform",
  description: "SwingMe е съвременна платформа за потребители турсещи познанства и партньори",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
