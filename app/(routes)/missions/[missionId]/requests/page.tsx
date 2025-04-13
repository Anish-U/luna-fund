"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

import { LunaFundContext } from "@/context/LunaFund";
import { Request } from "@/types/mission";
import { BigNumber } from "ethers";

export interface PageProps {
  params: {
    missionId: string;
  };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();

  const { getMissionRequests } = useContext(LunaFundContext);
  const [requests, setRequests] = useState<Request[]>();
  const [missionId, setMissionId] = useState<number>();

  useEffect(() => {
    const _getMission = async () => {
      const { missionId } = await params;
      const id = parseInt(missionId);
      setMissionId(id);
      const res = await getMissionRequests(id);
      const formatted = res.map((r: Request) => ({
        ...r,
        approvalCount:
          r.approvalCount && BigNumber.isBigNumber(r.approvalCount)
            ? r.approvalCount.toNumber()
            : 0,
      }));
      setRequests(formatted);
    };

    _getMission();
  }, [getMissionRequests, missionId, params, router]);

  return (
    <div className="lg:px-20 md:px-10 px-6 p-2 flex flex-col gap-4 flex-1">
      <Link href={`/missions/${missionId}`} className="text-sm mb-2">
        <p className="flex items-center justify-left gap-2 hover:text-blue-accent transition-all ease-in-out duration-300">
          <span>
            <BsArrowLeft className="w-4 h-4 font-bold" />
          </span>
          Back to Mission Page
        </p>
      </Link>
      <h2 className="text-2xl font-bold mb-2 md:mb-4">Withdrawal Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {requests && requests.length === 0 ? (
          <p className="text-gray-400">No withdrawal requests found.</p>
        ) : (
          requests &&
          requests.map((request) => (
            <div
              key={request.rId}
              className="rounded-xl bg-blue-light h-full p-2 border-2 border-white/20 hover:border-white/60 ease-in-out duration-300 cursor-pointer"
            >
              <div className="flex flex-col gap-3 md:p-4 p-3 h-full">
                <h3 className="text-lg md:text-xl font-bold">
                  {request.description}
                </h3>
                <div className="flex flex-col gap-1 text-xs md:text-sm py-2 flex-1">
                  <p>
                    <span className="text-white font-semibold">Amount:</span>{" "}
                    {request.amount} ETH
                  </p>
                  <p>
                    <span className="text-white font-semibold">Recipient:</span>{" "}
                    {request.recipient}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Approvals:</span>{" "}
                    {request.approvalCount}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Status:</span>{" "}
                    {request.completed ? (
                      <span className="text-green-400">Completed</span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
