import React, { useEffect, useState } from "react";
import Wenb3Modal from "web3modal";
import { ethers, Signer } from "ethers";

import { lunaFundAddress, lunaFundABI } from "./constants";
import {
  CreateMissionProps,
  LunaFundContextType,
  Mission,
} from "@/types/mission";

const fetchContract = (
  signerOrProvider: Signer | ethers.providers.Provider | undefined
) => new ethers.Contract(lunaFundAddress, lunaFundABI, signerOrProvider);

export const LunaFundContext = React.createContext<LunaFundContextType | null>(
  null
);

export const LunaFundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const titleData = "Luna Fund Contract";
  const [currentAccount, setCurrentAccount] = useState("");

  const createMission = async (mission: CreateMissionProps) => {
    const { title, description, targetAmount } = mission;

    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = fetchContract(signer);

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

  const getAllMissions = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const missions = await contract.getMissions();

    const parsedMissions = missions.map((mission: Mission, i: number) => ({
      creator: mission.creator,
      title: mission.title,
      description: mission.description,
      targetAmount: ethers.utils.formatEther(mission.targetAmount.toString()),
      totalRaised: ethers.utils.formatEther(mission.totalRaised.toString()),
      completed: mission.completed,
      pId: i,
    }));

    return parsedMissions;
  };

  const getUserMissions = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const missions = await contract.getMissions();
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    const currentUser = accounts[0];

    console.log(currentUser);

    const filteredCampaigns = missions.filter(
      (mission: Mission) =>
        mission.creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );

    const parsedMissions = filteredCampaigns.map(
      (mission: Mission, i: number) => ({
        creator: mission.creator,
        title: mission.title,
        description: mission.description,
        targetAmount: ethers.utils.formatEther(mission.targetAmount.toString()),
        totalRaised: ethers.utils.formatEther(mission.totalRaised.toString()),
        completed: mission.completed,
        pId: i,
      })
    );

    return parsedMissions;
  };

  const contributeFuel = async (pId: number, amount: number) => {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = fetchContract(signer);

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
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const [contributors, amounts] = await contract.getContributors(pId);

    const parsedContributors = [];

    for (let i = 0; i < contributors.length; i++) {
      parsedContributors.push({
        contributor: contributors[i],
        amount: ethers.utils.formatEther(amounts[i].toString()),
      });
    }

    return parsedContributors;
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        return console.log("Install MetaMask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log("Something went wrong while connecting to wallet: ", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return console.log("Install MetaMask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Something went wrong while connecting to wallet: ", error);
    }
  };

  return (
    <LunaFundContext.Provider
      value={{
        titleData,
        currentAccount,
        createMission,
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
