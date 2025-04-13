import { FC } from "react";

import MissionCard from "@/components/molecules/MissionCard";

import { Mission } from "@/types/mission";

export interface MissionsPageSection {
  missions: Mission[];
}

const MissionsSection: FC<MissionsPageSection> = ({ missions }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {missions.map((mission) => (
        <MissionCard key={mission.pId} mission={mission} />
      ))}
    </div>
  );
};

export default MissionsSection;
