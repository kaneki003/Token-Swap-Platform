const { ethers } = require("hardhat");

async function deployPoolFactory(signer) {
  const Contract = await ethers.getContractFactory("PoolFactory", signer);
  const contract = await Contract.deploy();
  return contract;
}

async function deployMockToken(tokenName, tokenSymbol, signer) {
  const MockToken = await ethers.getContractFactory("MockToken", signer);
  const token = await MockToken.deploy(
    tokenName,
    tokenSymbol,
    ethers.parseEther("1000")
  );
  return token;
}

module.exports = {
  deployPoolFactory,
  deployMockToken,
};
