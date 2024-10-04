import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deployToken } from "../../contractFunctions/tokenFunctions";
import { Alert } from "antd";

const CreatingToken = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tokenAddress, setTokenAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (obj) => {
    try {
      const res = await deployToken(obj.tokenName, obj.tokenSymbol);
      setTokenAddress(res.contractAddress);
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
    <div className="rounded-lg border-blue-950  border-2 p-6 max-w-sm py-16 w-full backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">
      <h2 className="text-4xl text-center mb-10 text-white font-bold">
        Deploy Token
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <input
            type="text"
            {...register("tokenName", { required: "Token name is required" })}
            className={`peer w-full p-3 border ${
              errors.tokenName ? "border-red-500" : "border-gray-400"
            }  rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent mb-4 font-bold`}
            placeholder="Enter Token Name"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter token name{" "}
            {errors.tokenName && <span className="text-red-500">*</span>}
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            {...register("tokenSymbol", {
              required: "Token symbol is required",
            })}
            className={`peer w-full p-3 border ${
              errors.tokenSymbol ? "border-red-500" : "border-gray-400"
            } rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent text-white mb-4 font-bold`}
            placeholder="Enter token symbol"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter token symbol{" "}
            {errors.tokenSymbol && <span className="text-red-500">*</span>}
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
          type="submit"
          className="w-full bg-gradient-to-br from-[#ffffffce] to-[#030169] text-white text-lg p-3 rounded-xl hover:bg-blue-700 transform duration-300 shadow-xl font-semibold"
        >
          Create Token
        </button>
        {success && (
          <>
            <br />
            <br />
            <Alert
              message={`Your token is successfully deployed at address : ${tokenAddress}.1000 tokens have been sent to your account`}
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

export default CreatingToken;
