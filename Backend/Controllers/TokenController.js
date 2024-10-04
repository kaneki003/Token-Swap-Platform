const { ethers } = require("hardhat");

// async function getTokenBalance(tokenAddress, publicKey, signer) {
//   const tokenContract = await ethers.getContractAt("IERC20", tokenAddress);
//   const tokenWithSigner = tokenContract.connect(signer);
//   const balance = await tokenWithSigner.balanceOf(publicKey);
//   return balance;
// }

async function mintMockToken(tokenAddress, amount, recipientAddress, signer) {
  const token = await ethers.getContractAt("MockToken", tokenAddress);
  const tx = await token
    .connect(signer)
    .getTokens(ethers.parseEther(amount.toString()), recipientAddress);
  await tx.wait();
  return tx;
}

module.exports = {
  // getTokenBalance,
  mintMockToken,
};
