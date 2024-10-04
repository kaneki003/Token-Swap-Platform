import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "antd";
import { mintTokens } from "../../contractFunctions/tokenFunctions";

const MintToken = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");

  const onSubmit = async (obj) => {
    try {
      const res = await mintTokens(
        obj.tokenAddress,
        obj.amount,
        obj.recipientAddress
      );
      setAmount(obj.amount);
      setSuccess(true);
      console.log(res);
    } catch (error) {
      notification.error({
        message: "Error Occcured!",
      });
    }
  };

  const onClose = (e) => {
    setSuccess(false);
  };
  return (
    <div className="rounded-lg border-blue-950 border-2 p-6 max-w-sm py-16 w-full backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-3">
      <h2 className="text-4xl text-center mb-10 text-white font-bold">
        Mint Token
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <input
            type="text"
            {...register("tokenAddress", {
              required: "Token address is required",
            })}
            className={`peer w-full p-3 border ${
              errors.tokenAddress ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token Address"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter token address{" "}
            {errors.tokenAddress && <span className="text-red-500">*</span>}
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            {...register("recipientAddress", {
              required: "Recipient address is required",
            })}
            className={`peer w-full p-3 border ${
              errors.recipientAddress ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter recipient address"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter recipient address{" "}
            {errors.recipientAddress && <span className="text-red-500">*</span>}
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            {...register("amount", {
              required: "amount is required",
            })}
            className={`peer w-full p-3 border ${
              errors.amount ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter amount"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter amount{" "}
            {errors.amount && <span className="text-red-500">*</span>}
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-br from-[#ffffffce] to-[#030169] text-white text-lg p-3 rounded-xl hover:bg-blue-700 transform duration-300 shadow-xl font-semibold"
        >
          Mint Tokens
        </button>
        {success && (
          <>
            <br />
            <br />
            <Alert
              message={`Successfully minted ${amount} tokens to recipient account`}
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

export default MintToken;
