"use client";

import { FC, useContext } from "react";

import { LunaFundContext } from "@/context/LunaFund";
import Button from "../atoms/button";
import Image from "next/image";
import Link from "next/link";

export interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const { currentAccount, connectWallet } = useContext(LunaFundContext);

  return (
    <header className="flex justify-between items-center pb-2 md:px-8 px-4 p-2">
      <Link href="/">
        <div className="flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            height={150}
            width={150}
            className="object-cover -ml-8 h-48 w-48 md:h-32 md:w-32 md:-ml-2"
          />
          <h1 className="--ml-4 text-4xl hidden md:block font-primary text-nowrap">
            Luna Fund
          </h1>
        </div>
      </Link>
      <div className="ml-auto md:w-fit flex items-center justify-center md:text-sm text-sm">
        {currentAccount ? (
          <Button type="primary" disabled>
            {currentAccount.slice(0, 4) + "..." + currentAccount.slice(-4)}
          </Button>
        ) : (
          <Button onClick={connectWallet} type="primary">
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};

export default NavBar;
