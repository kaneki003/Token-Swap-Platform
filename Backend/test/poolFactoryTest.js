// test/PoolFactory.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PoolFactory", function () {
  let PoolFactory;
  let LiquidityPool;
  let poolFactory;
  let liquidityPool;
  let tokenA;
  let tokenB;

  beforeEach(async function () {
    // Deploy mock tokens
    const MockToken = await ethers.getContractFactory("MockToken");
    tokenA = await MockToken.deploy(
      "Token A",
      "TKA",
      ethers.parseEther("1000")
    );
    tokenB = await MockToken.deploy(
      "Token B",
      "TKB",
      ethers.parseEther("1000")
    );

    // Deploy the PoolFactory contract
    PoolFactory = await ethers.getContractFactory("PoolFactory");
    poolFactory = await PoolFactory.deploy();
    // await poolFactory.deployed();
  });

  it("should create a new pool", async function () {
    const poolAddress = await poolFactory.createPool(
      tokenA.target,
      tokenB.target
    );

    // Check if the pool is created
    expect(await poolFactory.getPool(tokenA.target, tokenB.target)).to.equal(
      await poolFactory.getPool(tokenB.target, tokenA.target)
    );
    expect(await poolFactory.allPoolsLength()).to.equal(1);
  });

  it("should emit PoolCreated event on pool creation", async function () {
    await expect(await poolFactory.createPool(tokenA.target, tokenB.target))
      .to.emit(poolFactory, "PoolCreated")
      .withArgs(
        tokenA.target,
        tokenB.target,
        await poolFactory.getPool(tokenA.target, tokenB.target)
      );
  });

  it("should not create a pool with the same tokens", async function () {
    await poolFactory.createPool(tokenA.target, tokenB.target);
    await expect(
      poolFactory.createPool(tokenA.target, tokenB.target)
    ).to.be.revertedWith("Pool already exists!");
  });

  it("should not create a pool with identical tokens", async function () {
    await expect(
      poolFactory.createPool(tokenA.target, tokenA.target)
    ).to.be.revertedWith("Tokens must be different");
  });
});
