"use client";

import { useContext, useState } from "react";

import { LunaFundContext } from "@/context/LunaFund";

export interface PageProps {}

export default function Page({}: PageProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { createMission } = useContext(LunaFundContext);

  const onSubmit = async () => {
    setIsLoading(true);
    const res = await createMission({ title, description, targetAmount });
    console.log(res);
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Create Mission</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target Amount"
        onChange={(e) => setTargetAmount(parseInt(e.target.value))}
      />
      <button
        className="p-2 border rounded-md cursor-pointer"
        onClick={onSubmit}
        disabled={isLoading}
      >
        Submit
      </button>
    </div>
  );
}
