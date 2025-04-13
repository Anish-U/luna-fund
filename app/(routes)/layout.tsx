import type { Metadata } from "next";

import ClientWrapper from "@/wrapper/clientWrapper";
import NavBar from "@/components/molecules/NavBar";
import Footer from "@/components/molecules/Footer";

import "@/app/globals.css";
import "@fontsource/inter";
import "@fontsource/orbitron/600.css";

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
          <div className="flex flex-col min-h-screen font-secondary">
            <NavBar />
            <div className="flex-1 flex">{children}</div>
            <Footer />
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}
