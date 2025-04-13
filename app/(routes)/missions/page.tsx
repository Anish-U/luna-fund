"use client";

import { useContext, useEffect, useState } from "react";

import { LunaFundContext } from "@/context/LunaFund";
import { Mission } from "@/types/mission";
import MissionsSection from "@/components/organisms/missions";

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
      <h1 className="text-4xl font-primary mb-4">Missions</h1>
      <MissionsSection missions={[...missions, ...missions]} />
    </div>
  );
}
