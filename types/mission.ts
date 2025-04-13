export interface Mission {
  completed: boolean;
  creator: string;
  title: string;
  description: string;
  targetAmount: number;
  totalRaised: number;
  pId: number;
}

export interface CreateMissionProps {
  title: string;
  description: string;
  targetAmount: number;
}

export interface Request {
  amount: number;
  recipient: string;
  approvalCount: number;
  completed: boolean;
  description: string;
  rId: number;
}

export interface LunaFundContextType {
  titleData: string;
  currentAccount: string;
  createMission: (mission: CreateMissionProps) => Promise<void>;
  getMission: (pId: number) => Promise<Mission>;
  getAllMissions: () => Promise<Mission[]>;
  getUserMissions: () => Promise<Mission[]>;
  contributeFuel: (pId: number, amount: number) => Promise<void>;
  getContributions: (
    pId: number
  ) => Promise<{ contributor: string; amount: string }[]>;
  getMissionRequests: (pId: number) => Promise<Request[]>;
  checkIfWalletConnected: () => Promise<void>;
  connectWallet: () => Promise<void>;
}

export interface Contribution {
  contributor: string;
  amount: number;
}
