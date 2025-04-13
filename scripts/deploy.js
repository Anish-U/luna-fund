import hardhat from "hardhat";

const _ethers = hardhat.ethers;

async function main() {
  const LunaFund = await _ethers.getContractFactory("LunaFund");
  const lundFund = await LunaFund.deploy();
  await lundFund.deployed();

  console.log("LunaFund deployed to:", lundFund.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
