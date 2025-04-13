"use client";

import { FC } from "react";

import { Mission } from "@/types/mission";
import ProgressBar from "../atoms/progress-bar";
import Link from "next/link";

export interface MissionCard {
  mission: Mission;
}

const MissionCard: FC<MissionCard> = ({ mission }) => {
  const shortDescription =
    mission.description.slice(0, 150) +
    (mission.description?.length || 0 > 150 ? "..." : "");

  return (
    <Link href={"/missions/" + mission.pId}>
      <div className="rounded-xl bg-blue-light h-full p-2 border-2 border-white/20 hover:border-white/60 ease-in-out duration-300 cursor-pointer">
        <div
          key={mission.pId}
          className="flex flex-col gap-3 md:p-4 p-3 h-full"
        >
          <h1 className="text-xl md:text-2xl text-wrap font-bold">
            {mission.title}
          </h1>
          <p className="text-wrap text-xs md:text-sm py-4 flex-1">
            {shortDescription}
          </p>
          <ProgressBar
            percentage={
              ((mission.totalRaised || 0) / (mission.targetAmount || 1)) * 100
            }
          />
          <div className="flex justify-between font-bold">
            <p className="text-xs md:text-sm">{mission.totalRaised || 0} ETH</p>
            <p className="text-xs md:text-sm">
              {mission.targetAmount || 0} ETH (Target)
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MissionCard;
