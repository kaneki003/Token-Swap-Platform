import axios from "axios";

export async function createPool(addressA, addressB, poolFactoryAddress) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const payload = {
      factoryAddress: "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f",
      tokenA: addressA,
      tokenB: addressB,
    };

    const response = await axios.post(
      "http://localhost:5000/api/poolFactoryRoutes/createPool",
      payload,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error creating pool:", error);
    throw error;
  }
}

export async function getPool(addressA, addressB, poolFactoryAddress) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const payload = {
      factoryAddress: poolFactoryAddress,
      tokenA: addressA,
      tokenB: addressB,
    };

    const response = await axios.post(
      "http://localhost:5000/api/poolFactoryRoutes/getPool",
      payload,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error creating pool:", error);
    throw error;
  }
}
