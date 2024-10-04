import React, { useState } from "react";
import { Alert } from "antd";
import { useForm } from "react-hook-form";
import {
  addLiquidity,
  getReserves,
} from "../../contractFunctions/poolFunctions";
import { getPool } from "../../contractFunctions/poolFactoryFunctions";
import { ethers } from "ethers";

const AddLiquidity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [poolAddress, setPoolAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const [reserves, setReserves] = useState(null);

  const onSubmit = async (obj) => {
    try {
      const res = await addLiquidity(
        obj.token1Address,
        obj.token2Address,
        obj.token1Amount,
        obj.token2Amount
      );
      const pool = await getPool(
        obj.token1Address,
        obj.token2Address,
        "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"
      );
      setPoolAddress(pool);
      setSuccess(true);
    } catch (error) {
      notification.error({
        message: "Error Occurred!",
      });
    }
  };

  const reserve = async (token1Address, token2Address) => {
    try {
      const res = await getReserves(token1Address, token2Address);
      console.log(res);
      setReserves(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeToken1 = async (e) => {
    const token1Amount = ethers.parseUnits(e.target.value, 18); // Parse token1 amount with 18 decimals

    const token2Amount = watch("token2Amount"); // Watch current token2Amount value

    try {
      if (!reserves) {
        await reserve(watch("token1Address"), watch("token2Address")); // Ensure addresses are watched values
      }

      if (reserves.tokenB && reserves.tokenA) {
        // Check for existence and type safety (using BigInt instead of Number)
        const bigIntToken1Amount = ethers.getBigInt(token1Amount);
        const bigIntReserveB = ethers.getBigInt(
          ethers.parseUnits(reserves.tokenB, 18)
        );
        const bigIntReserveA = ethers.getBigInt(
          ethers.parseUnits(reserves.tokenA, 18)
        );

        const calculatedToken2Amount =
          (bigIntToken1Amount * bigIntReserveB) / bigIntReserveA;
        const formattedToken2Amount = ethers.formatUnits(
          calculatedToken2Amount,
          18
        ); // Format with 18 decimals

        setValue("token2Amount", formattedToken2Amount); // Dynamically update token2Amount
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeToken2 = async (e) => {
    const token2Amount = ethers.parseUnits(e.target.value, 18); // Parse token2 amount with 18 decimals

    const token1Amount = watch("token1Amount"); // Watch current token1Amount value

    try {
      if (!reserves) {
        await reserve(watch("token1Address"), watch("token2Address")); // Ensure addresses are watched values
      }

      if (reserves.tokenB && reserves.tokenA) {
        // Check for existence and type safety
        const bigIntToken2Amount = ethers.getBigInt(token2Amount);
        const bigIntReserveA = ethers.getBigInt(
          ethers.parseUnits(reserves.tokenA, 18)
        );
        const bigIntReserveB = ethers.getBigInt(
          ethers.parseUnits(reserves.tokenB, 18)
        );

        const calculatedToken1Amount =
          (bigIntToken2Amount * bigIntReserveA) / bigIntReserveB;
        const formattedToken1Amount = ethers.formatUnits(
          calculatedToken1Amount,
          18
        ); // Format with 18 decimals

        setValue("token1Amount", formattedToken1Amount); // Dynamically update token1Amount
      }
    } catch (error) {
      notification.error({
        message: "Error Occurred!",
      });
    }
  };

  const onClose = (e) => {
    setSuccess(false);
  };

  return (
    <div className="rounded-lg border-blue-950  border-2 p-6 max-w-sm py-16 w-full backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-3">
      <h2 className="text-4xl text-center mb-10 text-white font-bold">
        Add Liquidity
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <input
            type="text"
            {...register("token1Address", {
              required: "Token1 address is required",
            })}
            className={`peer w-full p-3 border ${
              errors.token1Address ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token1  Address"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter Token1 Address{" "}
            {errors.token1Address && <span className="text-red-500">*</span>}
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            {...register("token2Address", {
              required: "Token2 address is required",
            })}
            className={`peer w-full p-3 border ${
              errors.token2Address ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token2  Address"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter Token2 Address{" "}
            {errors.token2Address && <span className="text-red-500">*</span>}
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            {...register("token1Amount", {
              required: "Token1 amount is required",
            })}
            className={`peer w-full p-3 border ${
              errors.token1Amount ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token1 Amount"
            onChange={onChangeToken1}
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter Token1 Amount{" "}
            {errors.token1Amount && <span className="text-red-500">*</span>}
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            {...register("token2Amount", {
              required: "Token2 amount is required",
            })}
            className={`peer w-full p-3 border ${
              errors.token2Amount ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token2 Amount"
            onChange={onChangeToken2}
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter Token2 Amount{" "}
            {errors.token2Amount && <span className="text-red-500">*</span>}
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-br from-[#ffffffce] to-[#030169] text-white text-lg p-3 rounded-xl hover:bg-blue-700 transform duration-300 shadow-xl font-semibold"
        >
          Add Liquidity
        </button>
        {success && (
          <>
            <br />
            <br />
            <Alert
              message={`Liquidity added successfully to pool : ${poolAddress}`}
              type="warning"
              closable
              onClose={onClose}
              className="bg-[#bac9f3a6] text-blue-950"
            />
          </>
        )}
      </form>
    </div>
  );
};

export default AddLiquidity;
