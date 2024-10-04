
# Swapify

**Swapify** is a decentralized exchange (DEX) platform where users can create their own liquidity pools, manage liquidity, and swap tokens.

## Video Demo
[![Watch the video](https://img.youtube.com/vi/your_video_id/0.jpg)](https://drive.google.com/file/d/1RraW589E979h74nq7WuBP0e13Kas57HI/view?usp=sharing)

## Features

1. **Create Tokens**  
   - Users can create their own ERC-20 tokens and have the ability to mint these tokens into other accounts.

2. **Liquidity Pools**  
   - Users can create liquidity pools for their tokens, add liquidity to existing pools, and remove liquidity based on the LP tokens they hold.

3. **Swap Tokens**  
   - Users can check the availability of token pools and swap tokens if liquidity is available.

## Implementation

1. **Create Tokens**  
   - Implemented an ERC-20 standard contract `MockToken.sol` that takes token name and symbol as input, generating corresponding tokens. The contract is deployed using the connected MetaMask wallet via a signer provided by MetaMask.

2. **Pool Factory**  
   - The `PoolFactory.sol` contract manages liquidity pool addresses corresponding to token pairs. If no pool exists for a pair, it creates a new one, deploying the `LiquidityPool.sol` contract and saving its address.

3. **Liquidity Pool**  
   - The `LiquidityPool.sol` contract handles liquidity management, including:
     - Adding liquidity while maintaining the pool ratio.
     - Removing liquidity based on LP tokens.
     - Managing token price rate conversions (token A to token B).
     - Charging a 0.1% fee on all transactions.

All contracts were thoroughly tested using Hardhat in the `Backend/test` directory.

## Architecture

![Architecture](https://iili.io/dbSzLcF.png)

## Challenges

1. **Limited testnet tokens**  
   - Deployment issues were solved by using a local Hardhat network, enabling more flexibility for multiple test scenarios.

2. **Contract testing issues**  
   - Faced challenges while testing the contracts' functionality.

3. **Updates to Ethers.js documentation**  
   - Spent extra time researching current methods due to changes in the Ethers library documentation.

4. **Understanding how DEXs work**  
   - Initially had limited knowledge of DEX mechanics, which required additional learning through videos and documentation.

5. **MetaMask integration**  
   - First-time integration of MetaMask for signing transactions.

6. **Deployment challenges**  
   - Running two servers simultaneously (local Hardhat chain and the main backend server) complicated the deployment process.

7. **Cross-Chain**
   - Lack of time and multiple local chain were difficult to handle.
