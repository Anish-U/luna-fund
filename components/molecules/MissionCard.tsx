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
    (
      mission.description ||
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release o"
    ).slice(0, 150) + (mission.description?.length || 0 > 150 ? "..." : "");

  return (
    <Link href={"/missions/" + mission.pId}>
      <div className="rounded-xl bg-blue-light h-full p-2 border border-white/20 hover:bg-blue-light/90 cursor-pointer">
        <div key={mission.pId} className="flex flex-col gap-3 p-6 h-full">
          <h1 className="text-2xl text-wrap font-bold">
            {mission.title || "Tech Education in Rural Areas of India"}
          </h1>
          <p className="text-wrap text-sm py-4 flex-1">{shortDescription}</p>
          <ProgressBar
            percentage={
              ((mission.totalRaised || 0) / (mission.targetAmount || 1)) * 100
            }
          />
          <div className="flex justify-between">
            <p className="text-sm">{mission.totalRaised || 0} ETH</p>
            <p className="text-sm">{mission.targetAmount || 0} ETH (Target)</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MissionCard;
