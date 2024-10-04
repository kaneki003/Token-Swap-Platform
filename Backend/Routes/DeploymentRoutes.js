const express = require("express");
const router = express.Router();
const { deployPoolFactory } = require("../Controllers/DeployController.js");
const { signer } = require("../blockChain.js");

//Route 1: Deploy Pool Factory
router.get("/deployPoolFactory", async (req, res) => {
  try {
    const contract = await deployPoolFactory(signer);
    res.send(contract);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deploying Pool Factory");
  }
});

module.exports = router;
