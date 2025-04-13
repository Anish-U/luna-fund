"use client";

import { FC, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import ProgressBar from "@/components/atoms/progress-bar";
import Button from "@/components/atoms/button";

import { Contribution, Mission, Request } from "@/types/mission";
import { LunaFundContext } from "@/context/LunaFund";
import Link from "next/link";

export interface MissionPageSectionProps {
  mission: Mission;
}

const MissionSection: FC<MissionPageSectionProps> = ({ mission }) => {
  const { getContributions, contributeFuel, getMissionRequests } =
    useContext(LunaFundContext);

  const [inputValue, setInputValue] = useState<number>(1);
  const [contributions, setContributions] = useState<Contribution[]>();
  const [missionRequests, setMissionRequests] = useState<Request[]>();

  const contribute = () => {
    if (!inputValue || inputValue <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Value must be greater than 0",
      });
    }

    contributeFuel(mission.pId, inputValue);
  };

  useEffect(() => {
    const _getContributions = async () => {
      const contributions = await getContributions(mission.pId);
      setContributions(contributions as unknown as Contribution[]);
    };

    const _getWithdrawals = async () => {
      const withdrawals = await getMissionRequests(mission.pId);
      setMissionRequests(withdrawals as unknown as Request[]);
    };

    _getContributions();
    _getWithdrawals();
  }, [getContributions, getMissionRequests, mission.pId]);

  return (
    <div className="flex flex-col gap-4 py-4 px-2">
      <div className="grid grids-col-1 md:grid-cols-2 gap-6 md:gap-8 md:mb-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-4xl font-primary">
            Mission: {mission.title}
          </h1>
          <div className="text-xs md:text-md py-2 text-wrap">
            Creator: {mission.creator}
          </div>
          <div className="text-sm md:text-md text-justify">
            Goal: {mission.description}
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-evenly">
          <div className="w-full flex flex-col gap-3 justify-center border-2 border-white/20 bg-blue-light rounded-lg p-2 px-3">
            <p className="text-sm md:text-md">Fuel Raised</p>
            <p className="text-lg md:text-2xl font-bold">
              {mission.totalRaised || 0} ETH
            </p>
            <p className="text-sm md:text-md">
              Target of {mission.targetAmount || 0} ETH
            </p>
            <ProgressBar
              percentage={
                ((mission.totalRaised || 0) / (mission.targetAmount || 1)) * 100
              }
            />
          </div>

          <div className="w-full flex flex-col gap-3 justify-center border-2 border-blue-light text-blue-dark bg-white rounded-lg p-2 px-3">
            <h1 className="text-md md:text-lg font-primary">
              Raise Fuel Now !
            </h1>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="py-2 px-3 rounded-lg"
            />
            <Button
              type="secondary"
              onClick={contribute}
              disabled={mission.completed}
            >
              Donate Fuel
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:mb-4">
        <h1 className="text-2xl my-4 font-primary">Contributors</h1>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {contributions && contributions.length > 0 ? (
              contributions.map((contribution) => (
                <div
                  className="flex flex-col text-center bg-white rounded-lg text-blue-dark gap-2 p-2 px-3 text-wrap"
                  key={contribution.contributor}
                >
                  <p className="text-sm md:text-lg font-bold">
                    {contribution.amount} ETH
                  </p>
                  <p className="text-xs md:text-sm text-wrap">
                    {contribution.contributor}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs md:text-sm">No contributions yet !</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:mb-4">
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-2xl my-4 font-primary">Withdrawal Requests</h1>
          <Link href={`/missions/${mission.pId}/requests`}>
            <Button type="primary">View All</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {missionRequests && missionRequests.length > 0 ? (
              missionRequests.map((request) => (
                <div
                  className="flex flex-col text-center bg-white rounded-lg text-blue-dark gap-2 p-2 px-3 text-wrap"
                  key={request.rId}
                >
                  <p className="text-sm md:text-lg font-bold">
                    {request.amount} ETH
                  </p>
                  <p className="text-xs md:text-sm text-wrap">
                    {request.recipient}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs md:text-sm">No withdrawal requests yet !</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
