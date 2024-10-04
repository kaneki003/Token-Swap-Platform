const express = require("express");
const router = express.Router();
const {
  createPool,
  getPool,
} = require("../Controllers/PoolFactoryController.js");
const { signer } = require("../blockChain.js");

//Route 1: Create Pool
router.post("/createPool", async (req, res) => {
  try {
    const factoryAddress = req.body.factoryAddress;
    const tokenA = req.body.tokenA;
    const tokenB = req.body.tokenB;

    await createPool(factoryAddress, tokenA, tokenB, signer);
    const poolAddress = await getPool(factoryAddress, tokenA, tokenB, signer);
    res.send(poolAddress);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating pool");
  }
});

//Route 2: Get Pool
router.post("/getPool", async (req, res) => {
  try {
    const factoryAddress = req.body.factoryAddress;
    const tokenA = req.body.tokenA;
    const tokenB = req.body.tokenB;

    const poolAddress = await getPool(factoryAddress, tokenA, tokenB);
    res.send(poolAddress);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting pool");
  }
});

module.exports = router;
