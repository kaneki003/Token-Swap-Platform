const express = require("express");
const router = express.Router();
const ethers = require("hardhat");
const signer = require("../blockChain.js");
const {
  getPrice,
  getlp,
  getReserves,
} = require("../Controllers/LiquidityPoolController.js");

// Route 1: Get Price
router.post("/getPrice", async (req, res) => {
  try {
    const poolAddress = req.body.poolAddress;
    const tokenAddress = req.body.tokenAddress;
    const price = await getPrice(poolAddress, tokenAddress, signer);
    res.send(price);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting price");
  }
});

//Route 2: Get Reserves
router.post("/getReserves", async (req, res) => {
  try {
    const poolAddress = req.body.poolAddress;
    const reserves = await getReserves(poolAddress, signer);
    res.send(reserves);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting reserves");
  }
});

//Route 3 : Get LP Amount
router.post("/getLpAmount", async (req, res) => {
  try {
    const publicKey = req.body.publicKey;
    const poolAddress = req.body.poolAddress;
    const amount = await getlp(poolAddress, publicKey);
    res.send(amount);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting reserves");
  }
});

module.exports = router;
