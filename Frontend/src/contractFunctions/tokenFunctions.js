import axios from "axios";
import { ethers } from "ethers";
import connectMetaMask from "../metaMaskConnection.js";
import MockToken from "../../../Backend/artifacts/contracts/MockToken.sol/MockToken.json";

export async function deployToken(tokenName, tokenSymbol) {
  try {
    const signer = await connectMetaMask();

    // Get contract factory
    const MockTokenFactory = new ethers.ContractFactory(
      MockToken.abi,
      MockToken.bytecode,
      signer
    );

    // Prepare deployment transaction
    const deployTransaction = await MockTokenFactory.getDeployTransaction(
      tokenName,
      tokenSymbol,
      ethers.parseEther("1000")
    );

    // Sign the transaction
    const tx = await signer.sendTransaction(deployTransaction);
    const txResponse = await tx.wait();

    return txResponse;
  } catch (error) {
    console.error("Error deploying token:", error);
  }
}

export async function mintTokens(tokenAddress, amount, recipientAddress) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      tokenAddress,
      amount,
      recipientAddress,
    });

    const res = await axios.post(
      "http://localhost:5000/api/tokenRoutes/mint",
      body,
      config
    );

    return res.data;
  } catch (error) {
    console.error("Error minting tokens:", error);
  }
}
