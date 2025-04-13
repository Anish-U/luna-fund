# 🌌 Luna Fund

Luna Fund is a futuristic, Ethereum-powered crowdfunding application designed with a space mission theme. Users can create and fund innovative project proposals. Luna Fund brings together decentralized finance, community governance, and sci-fi aesthetics to make funding projects fun, secure, and interactive.

> 🌙 **Why 'Luna Fund'?**  
> "Luna" means Moon — a symbol of exploration, ambition, and new frontiers. This platform lets users fund missions as if launching them to the Moon and beyond, turning crowdfunding into a galactic experience.

---

## 🚀 Features

- **Create a Mission**

  - Submit project ideas with title, description, and funding goal
  - Hosted on-chain as smart contracts

- **Contribute ETH**

  - Fund missions in real time with your wallet
  - Watch progress update with a live progress bar

- **Governed Withdrawals**

  - Mission creators submit withdrawal requests
  - Contributors vote to approve or deny them

- **Fully Decentralized**

  - All logic handled by Ethereum smart contracts
  - Transparent and trustless

- **Immersive UI**
  - Space-themed design
  - Animated elements, illustrations, and modern UX

---

## 🛠 Tech Stack

### 🧩 Frontend

- **NextJS** + **TypeScript**
- **TailwindCSS**
- **Ethers.js** for blockchain interaction
- **Web3Modal** for wallet connection

### 💽 Backend

- **Solidity** Smart Contracts
- **Hardhat** for local blockchain, testing, deployment

---

## 🧪 Smart Contract Functions

- `createMission(title, description, targetAmount)`
- `contribute(pId)`
- `createRequest(pId, description, amount, recipient)`
- `approveRequest(pId, rId)`
- `finalizeRequest(pId, rId)`

---

## 🧭 How to Run Locally

```bash
# Clone project
git clone https://github.com/Anish-U/luna-fund.git

# Install dependencies
npm install

# Setup blockchain
npx hardhat node #Keep this terminal open
npx hardhat run --network localhost scripts/deploy.js # Run in a new terminal

# Run Frontend
npm run dev
```

---

## 🎥 App Screenshots & Demo

#### Home Page

![Home Page](/demo/home-page.png)

#### Launch Mission Page

![Launch Mission Page](/demo/launch-mission-page.png)

#### Explore Missions Page

![Explore Missions Page](/demo/explore-missions-page.png)

#### Mission Page

![Mission Page](/demo/mission-page.png)

### Raise Withdrawal Request Page

![Raise Withdrawal Request Page](/demo/create-withdrawal-request-page.png)

#### All Requests Page

![All Requests Page](/demo/all-requests-page.png)

## 💡 Inspiration

Luna Fund was built during a 24-hour hackathon with the theme **“Space”**. It re-imagines crowdfunding as an interstellar experience, empowering users to launch bold ideas.
