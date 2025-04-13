"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

import { LunaFundContext } from "@/context/LunaFund";
import CreateRequestPageSection from "@/components/organisms/create-request";
import Swal from "sweetalert2";

export interface PageProps {
  params: {
    missionId: string;
  };
}

export default function Page({ params }: PageProps) {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [missionId, setMissionId] = useState<number>();

  const { createRequest } = useContext(LunaFundContext);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await createRequest(
        missionId!,
        description,
        amount,
        recipient
      );
      console.log("Success: ", res);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Only mission creator can create request",
        text: "",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const _getMissionId = async () => {
      const { missionId: _missionId } = await params;
      setMissionId(parseInt(_missionId));
    };

    _getMissionId();
  }, [params]);

  return (
    <div className="md:px-20 px-6 p-2 flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full md:w-fit">
        <Link
          href={`/missions/${missionId}/requests`}
          className="items-left text-sm mb-4 lg:min-w-[700px] md:min-w-[500px]"
        >
          <p className="flex items-center justify-left gap-2 hover:text-blue-accent transition-all ease-in-out duration-300">
            <span>
              <BsArrowLeft className="w-4 h-4 font-bold" />
            </span>
            Back to the Requests
          </p>
        </Link>
        <h1 className="text-2xl md:text-4xl font-primary md:mb-4 items-left">
          Raise Withdrawal Request
        </h1>
        <CreateRequestPageSection
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          recipient={recipient}
          setRecipient={setRecipient}
          createRequest={onSubmit}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
