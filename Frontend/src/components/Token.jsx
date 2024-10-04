import React, { useState } from "react";
import CreatingToken from "./Token/CreatingToken";
import MintToken from "./Token/MintToken";

const Token = () => {
  const [deployToken, setDeployToken] = useState("Deploy Token");

  const changeState = (val) => {
    setDeployToken(val);
  };

  return (
    <div className="main-content h-screen">
      <div className="navbar sticky bg-gradient-to-r from-black to-[#030029] h-16 flex items-center justify-around px-2">
        <div className="container text-white text-4xl font-semibold px-2">
          Swapify
        </div>
        <button
          onClick={() => {
            changeState("Deploy Token");
          }}
          className="tab bg-gradient-to-br from-[#ffffffce] to-[#030169] rounded-md p-1 text-white font-legend text-sm min-w-28 shadow-inner flex justify-center items-center mx-2"
        >
          Deploy Token
        </button>
        <button
          onClick={() => {
            changeState("Mint Token");
          }}
          className="tab bg-gradient-to-br from-[#ffffffce] to-[#030169] rounded-md p-1 text-white font-legend text-sm min-w-28 shadow-inner flex justify-center items-center mx-2"
        >
          Mint Token
        </button>
        <button className="rounded-md p-1 text-sm  min-w-32 bg-gradient-to-br from-[#ff0c0c] to-[#ec7e3f] flex justify-center">
          Connect Wallet
        </button>
      </div>
      <div className="content bg-[url('/1341130.png')] bg-cover bg-center h-[91%] relative flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-black/8 invert"></div>
        {deployToken == "Deploy Token" ? <CreatingToken /> : <MintToken />}
      </div>
    </div>
  );
};

export default Token;
