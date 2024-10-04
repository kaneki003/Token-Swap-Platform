import axios from "axios";
import { ethers } from "ethers";
import connectMetaMask from "../metaMaskConnection.js";
import LiquidityPool from "../../../Backend/artifacts/contracts/LiquidityPool.sol/LiquidityPool.json";
import IERC20 from "../../../Backend/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json"; // Import the ERC20 ABI
import { getPool } from "./poolFactoryFunctions.js";

export async function addLiquidity(
  token1Address,
  token2Address,
  amountA,
  amountB
) {
  try {
    const signer = await connectMetaMask();

    const poolAddress = await getPool(
      token1Address,
      token2Address,
      "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"
    );

    const pool = new ethers.Contract(poolAddress, LiquidityPool.abi, signer);

    const tokenA = await pool.tokenA();
    const tokenB = await pool.tokenB();

    const tokenAContract = new ethers.Contract(tokenA, IERC20.abi, signer);
    const tokenBContract = new ethers.Contract(tokenB, IERC20.abi, signer);

    const approveTokenATx = await tokenAContract.approve(
      poolAddress,
      ethers.parseEther(amountA.toString())
    );
    await approveTokenATx.wait();

    const approveTokenBTx = await tokenBContract.approve(
      poolAddress,
      ethers.parseEther(amountB.toString())
    );
    await approveTokenBTx.wait();

    const tx = await pool.addLiquidity(
      ethers.parseEther(amountA.toString()),
      ethers.parseEther(amountB.toString())
    );
    const receipt = await tx.wait();

    console.log("Liquidity added successfully:", receipt);
    return receipt;
  } catch (error) {
    console.error("Error adding liquidity:", error);
    throw error;
  }
}

export async function getLpAmount(token1Address, token2Address) {
  const signer = await connectMetaMask();
  const publicKey = await signer.getAddress();
  console.log(token1Address, token2Address, publicKey);
  const poolAddress = await getPool(
    token1Address,
    token2Address,
    "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"
  );

  const payload = {
    poolAddress: poolAddress,
    publicKey: publicKey,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const amount = await axios.post(
    "http://localhost:5000/api/liquidityPoolRoutes/getLpAmount",
    payload,
    config
  );

  return amount.data;
}

//Function to remove liquidity
export async function removeLiquidity(
  token1Address,
  token2Address,
  lpTokenAmount
) {
  const signer = await connectMetaMask();
  const poolAddress = await getPool(
    token1Address,
    token2Address,
    "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"
  );

  const pool = new ethers.Contract(poolAddress, LiquidityPool.abi, signer);
  const tx = await pool.removeLiquidity(ethers.parseEther(lpTokenAmount));
  const receipt = await tx.wait();
  return receipt;
}

//Function to swap tokens
export async function swap(token1Address, token2Address, amountIn) {
  const signer = await connectMetaMask();
  const poolAddress = await getPool(
    token1Address,
    token2Address,
    "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"
  );

  const pool = new ethers.Contract(poolAddress, LiquidityPool.abi, signer);

  const tokenContract = new ethers.Contract(token1Address, IERC20.abi, signer);

  await tokenContract.approve(
    poolAddress,
    ethers.parseEther(amountIn.toString())
  );
  const tx = await pool.swap(
    token1Address,
    ethers.parseEther(amountIn.toString())
  );
  const receipt = await tx.wait();
  return receipt;
}

//Function to get Token Price
export async function getPrice(token1Address, token2Address) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const poolAddress = await getPool(
    token1Address,
    token2Address,
    "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"
  );

  const payload = {
    poolAddress: poolAddress,
    tokenAddress: token2Address,
  };

  const price = await axios.post(
    "http://localhost:5000/api/liquidityPoolRoutes/getPrice",
    payload,
    config
  );
  const priceBigNumber = ethers.getBigInt(price.data.toString()); // Convert to BigNumber
  const convertedPrice = ethers.formatUnits(priceBigNumber, 18);
  return convertedPrice;
}

//Function to get pool reserves
export async function getReserves(token1Address, token2Address) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const poolAddress = await getPool(
    token1Address,
    token2Address,
    "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"
  );

  console.log("Pool Address:", poolAddress);

  const payload = {
    poolAddress: poolAddress,
  };
  const reserve = await axios.post(
    `http://localhost:5000/api/liquidityPoolRoutes/getReserves`,
    payload,
    config
  );

  return reserve.data;
}
