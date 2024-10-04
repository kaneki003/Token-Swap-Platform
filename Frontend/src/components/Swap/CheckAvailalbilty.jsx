import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { getPool } from "../../contractFunctions/poolFactoryFunctions";
import { Alert } from "antd";
import SwapToken from "./SwapToken";

const CheckAvailalbilty = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tokenAddress, setTokenAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const [avail, setAvail] = useState(false);

  const onSubmit = async (obj) => {
    try {
      const res = await getPool(
        obj.token1Address,
        obj.token2Address,
        "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"
      );
      if (res === "0x0000000000000000000000000000000000000000") {
        setSuccess(true);
      } else {
        setAvail(true);
        setSuccess(false);
      }
      console.log(res);
    } catch (error) {
      setAvail(false);
      console.error(error);
      notification.error({
        message: "Error Occurred!",
      });
    }
  };

  const onClose = () => {
    setSuccess(false);
    setAvail(true);
  };

  return (
    <>
      {avail ? (
        <SwapToken />
      ) : (
        <div className="rounded-lg border-blue-950 border-2 p-6 max-w-sm py-16 w-full backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-3">
          <h2 className="text-2xl text-center mb-10 text-white font-bold">
            Pool Availability
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
                placeholder="Enter Token1 Address"
              />
              <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
                Enter Token1 Address{" "}
                {errors.token1Address && (
                  <span className="text-red-500">*</span>
                )}
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
                placeholder="Enter Token2 Address"
              />
              <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
                Enter Token2 Address{" "}
                {errors.token2Address && (
                  <span className="text-red-500">*</span>
                )}
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#ffffffce] to-[#030169] text-white text-lg p-3 rounded-xl hover:bg-blue-700 transform duration-300 shadow-xl font-semibold"
            >
              Check Availability
            </button>

            {success && (
              <>
                <br />
                <br />
                <Alert
                  message={
                    "No liquidity pool exists for these tokens currently"
                  }
                  type="warning"
                  closable
                  onClose={onClose}
                  className="bg-[#bac9f3a6] text-blue-950"
                />
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default CheckAvailalbilty;
