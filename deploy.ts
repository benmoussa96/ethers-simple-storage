import { ethers } from "ethers";
import * as fs from "fs-extra";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "c8f5f777db2e3eade9f179d8240aafd0ff34275ca7427cb538c572dd4043dd1d",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);

  console.log("Deploying, please wait...");

  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
