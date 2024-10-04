const { mintMockToken } = require("../Controllers/TokenController.js");
const express = require("express");
const { signer } = require("../blockChain.js");
const router = express.Router();

// Route to mint tokens
router.post("/mint", async (req, res) => {
  try {
    const tokenAddress = req.body.tokenAddress;
    const amount = req.body.amount;
    const recipientAddress = req.body.recipientAddress;

    const tx = await mintMockToken(
      tokenAddress,
      amount,
      recipientAddress,
      signer
    );
    res.send(tx);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error minting tokens");
  }
});

module.exports = router;
