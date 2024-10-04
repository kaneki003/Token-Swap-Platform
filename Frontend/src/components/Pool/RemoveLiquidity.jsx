import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "antd";
import {
  getLpAmount,
  removeLiquidity,
} from "../../contractFunctions/poolFunctions";

const RemoveLiquidity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(false);
  const [lpamount, setLpamount] = useState(null);

  const onSubmit = async (obj) => {
    try {
      const res = await removeLiquidity(
        obj.token1Address,
        obj.token2Address,
        obj.amount
      );
      setSuccess(true);
      setDisplayAmount(false);
      console.log(res);
    } catch (error) {
      notification.error({
        message: "Error Occcured!",
      });
    }
  };

  const balance = async (obj) => {
    try {
      const res = await getLpAmount(obj.token1Address, obj.token2Address);
      setLpamount(res);
      setDisplayAmount(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = (e) => {
    setSuccess(false);
  };

  const onClose1 = (e) => {
    setDisplayAmount(false);
  };

  return (
    <div className="rounded-lg border-blue-950  border-2 p-6 max-w-sm py-16 w-full backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-3">
      <h2 className="text-4xl text-center mb-10 text-white font-bold">
        Remove Liquidity
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <input
            type="text"
            {...register("token1Address", {
              required: "Token Address is required",
            })}
            className={`peer w-full p-3 border ${
              errors.token1Address ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token1 Address"
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
              required: "Token Address is required",
            })}
            className={`peer w-full p-3 border ${
              errors.token2Address ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token2 Address"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter Token2 Address{" "}
            {errors.token2Address && <span className="text-red-500">*</span>}
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            {...register("amount")}
            className={`peer w-full p-3 border ${
              errors.amount ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token2 Address"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter amount{" "}
            {errors.amount && <span className="text-red-500">*</span>}
          </label>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 text-red-500 text-sm">
            <p>
              <span className="text-red-500">*</span> This is a required field
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit(balance)}
          className="w-full bg-gradient-to-br from-[#ffffffce] to-[#030169] text-white text-lg p-3 rounded-xl hover:bg-blue-700 transform duration-300 shadow-xl font-semibold mb-4"
        >
          Check Balance
        </button>

        <button
          type="submit"
          className="w-full bg-gradient-to-br from-[#ffffffce] to-[#030169] text-white text-lg p-3 rounded-xl hover:bg-blue-700 transform duration-300 shadow-xl font-semibold"
        >
          Remove Liquidity
        </button>
        {success && (
          <>
            <br />
            <br />
            <Alert
              message={`Transaction is successful.Please check your balance.`}
              type="warning"
              closable
              onClose={onClose}
              className="bg-[#bac9f3a6] text-blue-950"
            />
          </>
        )}
        {displayAmount && (
          <>
            <br />
            <br />
            <Alert
              message={`Current Balance : ${lpamount} tokens`}
              type="warning"
              closable
              onClose={onClose1}
              className="bg-[#bac9f3a6] text-blue-950"
            />
          </>
        )}
      </form>
    </div>
  );
};

export default RemoveLiquidity;
