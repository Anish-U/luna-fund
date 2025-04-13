"use client";

import { useContext, useState } from "react";
import Link from "next/link";

import { LunaFundContext } from "@/context/LunaFund";
import CreateMissionPageSection from "@/components/organisms/create-mission";

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
    <div className=" px-20 p-2 flex flex-col gap-4">
      <Link href="/missions" className="text-sm underline mb-4">
        Back to all Missions
      </Link>
      <h1 className="text-4xl font-primary mb-6">Create Mission</h1>
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
  );
}
