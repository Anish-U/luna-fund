import type { Metadata } from "next";

import { LunaFundProvider } from "../../context/LunaFund";

import "../globals.css";

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
        <LunaFundProvider>{children}</LunaFundProvider>
      </body>
    </html>
  );
}
