"use client";

import { LunaFundContext } from "@/context/LunaFund";
import { Mission } from "@/types/mission";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

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
      console.log(res);
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
    <div key={mission?.pId} className="flex flex-col p-4">
      <p>Creator: {mission?.creator}</p>
      <p>Title: {mission?.title}</p>
      <p>Description: {mission?.description}</p>
      <p>Target Amount{mission?.targetAmount}</p>
      <p>Raised: {mission?.totalRaised}</p>
      <p>Completed: {mission?.completed}</p>
      <Link href={`/missions/${mission?.pId}/requests`}>View Requests</Link>
    </div>
  );
}
