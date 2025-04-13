"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { LunaFundContext } from "@/context/LunaFund";
import { Mission } from "@/types/mission";

import MissionSection from "@/components/organisms/mission";
import { BsArrowLeft } from "react-icons/bs";

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
    <div className="lg:px-20 md:px-10 px-6 p-2 flex flex-col gap-4 flex-1">
      <Link href="/missions" className="text-sm">
        <p className="flex items-center justify-left gap-2 hover:text-blue-accent transition-all ease-in-out duration-300">
          <span>
            <BsArrowLeft className="w-4 h-4 font-bold" />
          </span>
          Back to all Missions
        </p>
      </Link>
      {mission && <MissionSection mission={mission} />}
    </div>
  );
}
