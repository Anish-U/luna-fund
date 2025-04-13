"use client";

import { FC, useContext } from "react";

import { LunaFundContext } from "@/context/LunaFund";

export interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const { currentAccount, connectWallet } = useContext(LunaFundContext);

  return (
    <div className="flex gap-4 flex-row items-center p-4">
      <h1 className="text-2xl font-bold">Luna Fund</h1>
      {!currentAccount && (
        <button
          type="button"
          onClick={connectWallet}
          className="p-2 border rounded-md cursor-pointer"
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default NavBar;
