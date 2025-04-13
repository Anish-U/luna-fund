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
    <header className="flex justify-between items-center px-12 pb-2">
      <Link href="/">
        <div className="flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            height={150}
            width={150}
            className="object-cover -ml-4"
          />
          <h1 className="-ml-6 md:-ml-4 md:text-4xl text-2xl font-primary text-nowrap">
            Luna Fund
          </h1>
        </div>
      </Link>
      <div className="ml-auto md:w-fit flex items-center justify-center text-sm">
        {currentAccount ? (
          <Button type="primary" disabled>
            {currentAccount.slice(0, 3) + "..." + currentAccount.slice(-3)}
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
