"use client";

import React from "react";
import { LunaFundProvider } from "@/context/LunaFund";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return <LunaFundProvider>{children}</LunaFundProvider>;
};

export default ClientWrapper;
