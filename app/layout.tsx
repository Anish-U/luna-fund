import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luna Fund",
  description: "Luna Fund",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
