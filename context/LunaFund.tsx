"use client";

import React, { useEffect, useState } from "react";
import { lunaFundAddress, lunaFundABI } from "@/constants/smartContract";
import {
  CreateMissionProps,
  LunaFundContextType,
  Mission,
} from "@/types/mission";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchContract = async (signerOrProvider: any): Promise<any> => {
  const { ethers } = await import("ethers");
  return new ethers.Contract(lunaFundAddress, lunaFundABI, signerOrProvider);
};

export const LunaFundContext = React.createContext<LunaFundContextType>({
  titleData: "",
  currentAccount: "",
  createMission: async () => {},
  getAllMissions: async () => [],
  getMission: async () => ({
    pId: 0,
    creator: "",
    title: "",
    description: "",
    targetAmount: 0,
    totalRaised: 0,
    completed: false,
  }),
  getUserMissions: async () => [],
  contributeFuel: async () => {},
  getContributions: async () => [],
  checkIfWalletConnected: async () => {},
  connectWallet: async () => {},
});

export const LunaFundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const titleData = "Luna Fund Contract";
  const [currentAccount, setCurrentAccount] = useState("");

  const createMission = async (mission: CreateMissionProps) => {
    const { title, description, targetAmount } = mission;
    const Web3Modal = (await import("web3modal")).default;
    const { ethers } = await import("ethers");

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = await fetchContract(signer);

    try {
      const transaction = await contract.createMission(
        title,
        description,
        ethers.utils.parseEther(targetAmount.toString())
      );

      await transaction.wait();
      console.log("transaction call complete: ", transaction);
    } catch (error) {
      console.log("transaction failed: ", error);
    }
  };

  const getMission = async (pId: number) => {
    const { ethers } = await import("ethers");
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = await fetchContract(provider);

    const mission = await contract.getMission(pId);

    return {
      creator: mission.creator,
      title: mission.title,
      description: mission.description,
      targetAmount: ethers.utils.formatEther(mission.targetAmount.toString()),
      totalRaised: ethers.utils.formatEther(mission.totalRaised.toString()),
      completed: mission.completed,
      pId: pId,
    } as unknown as Mission;
  };

  const getAllMissions = async () => {
    const { ethers } = await import("ethers");
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = await fetchContract(provider);

    const [
      creators,
      titles,
      descriptions,
      targetAmounts,
      totalRaisedAmounts,
      completions,
    ] = await contract.getMissions();

    const missions = creators.map((_: string, i: number) => ({
      creator: creators[i],
      title: titles[i],
      description: descriptions[i],
      targetAmount: ethers.utils.formatEther(targetAmounts[i].toString()),
      totalRaised: ethers.utils.formatEther(totalRaisedAmounts[i].toString()),
      completed: completions[i],
      pId: i,
    }));

    return missions;
  };

  const getUserMissions = async () => {
    if (typeof window === "undefined") return [];

    const { ethers } = await import("ethers");
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = await fetchContract(provider);

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const currentUser = accounts[0];

    const [
      creators,
      titles,
      descriptions,
      targetAmounts,
      totalRaisedAmounts,
      completions,
    ] = await contract.getMissions();

    const missions = creators
      .map((_: string, i: number) => ({
        creator: creators[i],
        title: titles[i],
        description: descriptions[i],
        targetAmount: ethers.utils.formatEther(targetAmounts[i].toString()),
        totalRaised: ethers.utils.formatEther(totalRaisedAmounts[i].toString()),
        completed: completions[i],
        pId: i,
      }))
      .filter(
        (mission: { creator: string }) => mission.creator === currentUser
      );

    return missions;
  };

  const contributeFuel = async (pId: number, amount: number) => {
    const Web3Modal = (await import("web3modal")).default;
    const { ethers } = await import("ethers");

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = await fetchContract(signer);

    try {
      const transaction = await contract.contribute(pId, {
        value: ethers.utils.parseEther(amount.toString()),
      });

      await transaction.wait();
      console.log("transaction call complete: ", transaction);
      location.reload();
      return transaction;
    } catch (error) {
      console.log("transaction failed: ", error);
    }
  };

  const getContributions = async (pId: number) => {
    const { ethers } = await import("ethers");
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = await fetchContract(provider);

    const [contributors, amounts] = await contract.getContributions(pId);

    const parsedContributors: { contributor: string; amount: string }[] = [];

    if (!contributors || !amounts) return parsedContributors;

    for (let i = 0; i < contributors.length; i++) {
      parsedContributors.push({
        contributor: contributors[i],
        amount: ethers.utils.formatEther(amounts[i].toString()),
      });
    }

    return parsedContributors;
  };

  const checkIfWalletConnected = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      console.log("Install MetaMask");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log("Error connecting wallet: ", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      console.log("Install MetaMask");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error requesting wallet connection: ", error);
    }
  };

  return (
    <LunaFundContext.Provider
      value={{
        titleData,
        currentAccount,
        createMission,
        getMission,
        getAllMissions,
        getUserMissions,
        contributeFuel,
        getContributions,
        checkIfWalletConnected,
        connectWallet,
      }}
    >
      {children}
    </LunaFundContext.Provider>
  );
};
