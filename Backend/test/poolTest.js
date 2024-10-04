// test/LiquidityPool.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LiquidityPool", function () {
  let liquidityPool, tokenA, tokenB;
  let owner, user1, user2;

  beforeEach(async () => {
    // Deploy ERC20 tokens (mock)
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

    // Deploy LiquidityPool contract
    const LiquidityPool = await ethers.getContractFactory("LiquidityPool");
    liquidityPool = await LiquidityPool.deploy(tokenA.target, tokenB.target);

    [owner, user1, user2] = await ethers.getSigners();

    // Transfer some tokens to user1 for testing
    await tokenA.transfer(user1.address, ethers.parseEther("500"));
    await tokenB.transfer(user1.address, ethers.parseEther("500"));
    await tokenA.transfer(user2.address, ethers.parseEther("500"));
    await tokenB.transfer(user2.address, ethers.parseEther("500"));
  });

  describe("Adding Liquidity", function () {
    it("should add liquidity correctly", async () => {
      await tokenA
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("100"));
      await tokenB
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("100"));

      await liquidityPool
        .connect(user1)
        .addLiquidity(ethers.parseEther("100"), ethers.parseEther("100"));

      const reserves = await liquidityPool.Reserves();
      expect(reserves[0]).to.equal(ethers.parseEther("100"));
      expect(reserves[1]).to.equal(ethers.parseEther("100"));
      expect(await liquidityPool.balanceOf(user1.address)).to.equal(
        ethers.parseEther("100")
      );
    });
  });

  describe("Removing Liquidity", function () {
    it("should remove liquidity correctly", async () => {
      await tokenA
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("100"));
      await tokenB
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("100"));
      await liquidityPool
        .connect(user1)
        .addLiquidity(ethers.parseEther("100"), ethers.parseEther("100"));

      await liquidityPool
        .connect(user1)
        .removeLiquidity(ethers.parseEther("100"));

      const reserves = await liquidityPool.Reserves();
      expect(reserves[0]).to.equal(0);
      expect(reserves[1]).to.equal(0);
      expect(await liquidityPool.balanceOf(user1.address)).to.equal(0);
    });
  });

  describe("Swapping Tokens", function () {
    it("should swap tokens correctly", async () => {
      await tokenA
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("100"));
      await tokenB
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("100"));
      await liquidityPool
        .connect(user1)
        .addLiquidity(ethers.parseEther("100"), ethers.parseEther("100"));

      // User1 swaps Token A for Token B
      await tokenA
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("10"));
      await liquidityPool
        .connect(user1)
        .swap(tokenA.target, ethers.parseEther("10"));

      const reserves = await liquidityPool.Reserves();
      expect(reserves[0]).to.equal(ethers.parseEther("110")); // 100 + 10
      expect(reserves[1]).to.be.greaterThan(ethers.parseEther("90")); // Should decrease
    });
  });

  describe("Price Calculation", function () {
    it("should calculate price correctly", async () => {
      await tokenA
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("100"));
      await tokenB
        .connect(user1)
        .approve(liquidityPool.target, ethers.parseEther("100"));
      await liquidityPool
        .connect(user1)
        .addLiquidity(ethers.parseEther("100"), ethers.parseEther("100"));

      const priceAToB = await liquidityPool.getPrice(true);
      expect(priceAToB).to.equal(ethers.parseEther("1")); // 100 B / 100 A

      const priceBToA = await liquidityPool.getPrice(false);
      expect(priceBToA).to.equal(ethers.parseEther("1")); // 100 A / 100 B
    });
  });
});
