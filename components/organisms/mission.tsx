"use client";

import { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

import ProgressBar from "@/components/atoms/progress-bar";
import Button from "@/components/atoms/button";

import { Contribution, Mission } from "@/types/mission";
import { LunaFundContext } from "@/context/LunaFund";

export interface MissionPageSection {
  mission: Mission;
}

const MissionSection: FC<MissionPageSection> = ({ mission }) => {
  const { getContributions, contributeFuel } = useContext(LunaFundContext);
  const inputValue = 1;

  const [contributions, setContributions] = useState<Contribution[]>();

  const randomImage = () => {
    const images = ["1", "2", "3"];
    return images[Math.floor(Math.random() * images.length)];
  };

  const contribute = async () => {
    const { value: contributionAmount } = await Swal.fire({
      title: "Enter your contribution",
      input: "number",
      inputLabel: `${
        mission.targetAmount - mission.totalRaised
      } ETH to be raised`,
      inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
        if (Number(value) <= 0) {
          return "Value must be greater than 0";
        }
      },
    });

    if (contributionAmount) {
      await contributeFuel(mission.pId, contributionAmount);
    }
  };

  useEffect(() => {
    const _getContributions = async () => {
      const contributions = await getContributions(mission.pId);
      setContributions(contributions as unknown as Contribution[]);
    };

    _getContributions();
  }, [getContributions, mission.pId]);

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 mb-5">
        <h1 className="text-4xl font-primary col-span-1 md:col-span-2">
          Mission: {mission.title}
        </h1>
        <Image
          src={`/images/planets/${randomImage()}.png`}
          alt="logo"
          height={500}
          width={500}
          className="col-span-1 absolute top-10 right-14 hidden lg:block"
        />
      </div>
      <div className="text-md py-2">Creator: {mission.creator}</div>
      <div className="lg:w-[70%] text-lg text-justify">
        Goal: {mission.description}
      </div>
      <div className="flex justify-center flex-col gap-2 lg:w-[70%] mt-4 md:mt-6">
        <ProgressBar
          percentage={
            ((mission.totalRaised || 0) / (mission.targetAmount || 1)) * 100
          }
        />
        <div className="flex justify-between">
          <p className="text-sm">{mission.totalRaised || 0} ETH</p>
          <p className="text-sm">{mission.targetAmount || 0} ETH</p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <Button
          type="secondary"
          onClick={contribute}
          disabled={mission.completed}
        >
          Donate Fuel
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl my-4 font-primary">Contributors</h1>
        <div className="flex flex-col gap-2 w-[80%]">
          {contributions && contributions.length > 0 ? (
            contributions.map((contribution) => (
              <div
                className="flex justify-between"
                key={contribution.contributor}
              >
                <p className="text-sm">{contribution.contributor}</p>
                <p className="text-sm">{contribution.amount} ETH</p>
              </div>
            ))
          ) : (
            <p className="text-sm">No contributions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
