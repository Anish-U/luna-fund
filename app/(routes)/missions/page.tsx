"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import Button from "@/components/atoms/button";
import MissionsSection from "@/components/organisms/missions";

import { Mission } from "@/types/mission";
import { LunaFundContext } from "@/context/LunaFund";

export interface PageProps {}

export default function Page({}: PageProps) {
  const { getAllMissions, currentAccount } = useContext(LunaFundContext);
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const _getAllMissions = async () => {
      const res = await getAllMissions();
      setMissions(res);
    };

    _getAllMissions();
  }, [currentAccount, getAllMissions]);

  return (
    <div className=" px-20 p-2 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-4xl font-primary mb-4">Missions</h1>
        <Link href="/missions/create" className="">
          <Button type="secondary">Create Mission</Button>
        </Link>
      </div>
      <MissionsSection missions={missions} />
    </div>
  );
}
