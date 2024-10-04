async function main() {
  const deployers = await ethers.getSigners();

  const deployAccount = deployers[0]; // Deployer account

  const Contract = await ethers.getContractFactory(
    "PoolFactory",
    deployAccount
  );

  // Deploy PoolFactory contract
  const contract = await Contract.deploy();
  const factoryAddress = contract;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
