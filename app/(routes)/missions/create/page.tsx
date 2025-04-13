"use client";

import { useContext, useState } from "react";
import Link from "next/link";

import { LunaFundContext } from "@/context/LunaFund";
import CreateMissionPageSection from "@/components/organisms/create-mission";
import { BsArrowLeft } from "react-icons/bs";

export interface PageProps {}

export default function Page({}: PageProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { createMission } = useContext(LunaFundContext);

  const onSubmit = async () => {
    setIsLoading(true);
    const res = await createMission({ title, description, targetAmount });
    console.log(res);
    setIsLoading(false);
  };

  return (
    <div className="md:px-20 px-8 p-2 flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full md:w-fit">
        <Link
          href="/missions"
          className="items-left text-sm mb-4 lg:min-w-[700px] md:min-w-[500px]"
        >
          <p className="flex items-center justify-left gap-2 hover:text-blue-accent transition-all ease-in-out duration-300">
            <span>
              <BsArrowLeft className="w-4 h-4 font-bold" />
            </span>
            Back to all Missions
          </p>
        </Link>
        <h1 className="text-2xl md:text-4xl font-primary md:mb-4 items-left">
          Launch Mission
        </h1>
        <CreateMissionPageSection
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          targetAmount={targetAmount}
          setTargetAmount={setTargetAmount}
          createMission={onSubmit}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
