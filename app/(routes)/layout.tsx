import type { Metadata } from "next";

import ClientWrapper from "@/wrapper/clientWrapper";
import NavBar from "@/components/molecules/NavBar";
import Footer from "@/components/molecules/Footer";

import "@/app/globals.css";

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
      <body>
        <ClientWrapper>
          <NavBar />
          {children}
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
