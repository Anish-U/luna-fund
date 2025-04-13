"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { LunaFundContext } from "@/context/LunaFund";
import { Mission } from "@/types/mission";

import MissionSection from "@/components/organisms/mission";

export interface PageProps {
  params: {
    missionId: string;
  };
}

export default function Page({ params }: PageProps) {
  const { getMission } = useContext(LunaFundContext);
  const [mission, setMission] = useState<Mission>();

  useEffect(() => {
    const _getMission = async () => {
      const { missionId } = await params;
      const res = await getMission(parseInt(missionId));
      setMission({
        pId: res.pId,
        creator: res.creator,
        title: res.title,
        description: res.description,
        targetAmount: res.targetAmount,
        totalRaised: res.totalRaised,
        completed: res.completed,
      });
    };

    _getMission();
  }, [getMission, params]);

  return (
    <div className=" px-20 p-2 flex flex-col gap-4">
      <Link href="/missions" className="text-sm underline">
        Back to all Missions
      </Link>
      {mission && <MissionSection mission={mission} />}
    </div>
  );
}
