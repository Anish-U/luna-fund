"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { LunaFundContext } from "@/context/LunaFund";
import { Mission } from "@/types/mission";

export interface PageProps {}

export default function Page({}: PageProps) {
  const { getAllMissions, currentAccount } = useContext(LunaFundContext);
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const _getAllMissions = async () => {
      const res = await getAllMissions();
      console.log(res);
      setMissions(res);
    };

    _getAllMissions();
  }, [currentAccount, getAllMissions]);

  return (
    <div>
      All Missions Page
      {missions.map((mission) => (
        <div key={mission.pId} className="flex flex-col p-4">
          <p>Creator: {mission.creator}</p>
          <p>Title: {mission.title}</p>
          <p>Description: {mission.description}</p>
          <p>Target Amount{mission.targetAmount}</p>
          <p>Raised: {mission.totalRaised}</p>
          <p>Completed: {mission.completed}</p>
          <Link href={`/missions/${mission.pId}/`}>View Mission</Link>
        </div>
      ))}
    </div>
  );
}
