import React, { useState } from "react";
import { Alert } from "antd";
import { useForm } from "react-hook-form";
import {
  addLiquidity,
  getPrice,
  getReserves,
  swap,
} from "../../contractFunctions/poolFunctions";
import { getPool } from "../../contractFunctions/poolFactoryFunctions";

const SwapToken = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [success, setSuccess] = useState(false);
  const [conversion1, setConversion1] = useState(0);
  const [conversion2, setConversion2] = useState(0);

  const onSubmit = async (obj) => {
    try {
      const res = await swap(
        obj.token1Address,
        obj.token2Address,
        obj.token1Amount
      );
      setSuccess(true);
    } catch (error) {
      notification.error({
        message: "Error Occurred!",
      });
    }
  };

  const price1 = async (token1Address, token2Address) => {
    try {
      const res = await getPrice(token1Address, token2Address);
      setConversion1(res);
    } catch (error) {
      console.log(error);
    }
  };

  const price2 = async (token1Address, token2Address) => {
    try {
      const res = await getPrice(token1Address, token2Address);
      setConversion2(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSellAmount = async (e) => {
    const token1Amount = Number(e.target.value); // Get the token1 amount from the event
    try {
      if (!conversion1) {
        await price1(watch("token1Address"), watch("token2Address")); // Ensure addresses are watched values
      }
      const calculatedToken2Amount = token1Amount * conversion1;
      setValue("token2Amount", calculatedToken2Amount.toString()); // Dynamically update token2Amount
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeBuyAmount = async (e) => {
    const token2Amount = Number(e.target.value); // Get the token1 amount from the event
    try {
      if (!conversion2) {
        await price2(watch("token2Address"), watch("token1Address")); // Ensure addresses are watched values
      }
      const calculatedToken1Amount = token2Amount * conversion2;
      setValue("token1Amount", calculatedToken1Amount.toString()); // Dynamically update token2Amount
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = (e) => {
    setSuccess(false);
  };

  return (
    <div className="rounded-lg border-blue-950  border-2 p-6 max-w-sm py-16 w-full backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-3">
      <h2 className="text-4xl text-center mb-10 text-white font-bold">Swap</h2>
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
            Enter Sell Token Address{" "}
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
            Enter Buy Token Address{" "}
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
            onChange={onChangeSellAmount}
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter Sell Amount{" "}
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
            onChange={onChangeBuyAmount}
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter Buy Amount{" "}
            {errors.token2Amount && <span className="text-red-500">*</span>}
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-br from-[#ffffffce] to-[#030169] text-white text-lg p-3 rounded-xl hover:bg-blue-700 transform duration-300 shadow-xl font-semibold"
        >
          Swap
        </button>
        {success && (
          <>
            <br />
            <br />
            <Alert
              message={`Transaction completed successfully.Please check your wallet`}
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

export default SwapToken;
