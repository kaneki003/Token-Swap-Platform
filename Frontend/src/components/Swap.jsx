import React, { useState } from "react";
import SwapToken from "./Swap/SwapToken";
import CheckAvailalbilty from "./Swap/CheckAvailalbilty";

const Swap = () => {
  const [available, setAvailable] = useState(false);
  const changeState = (val) => {
    setAvailable(true);
  };
  return (
    <div className="main-content h-screen">
      <div className="navbar sticky bg-gradient-to-r from-black to-[#030029] h-16 flex items-center justify-around px-2">
        <div className="container text-white text-4xl font-semibold px-2">
          Swapify
        </div>
        <button className="rounded-md p-1 text-sm  min-w-32 bg-gradient-to-br from-[#ff0c0c] to-[#ec7e3f] flex justify-center">
          Connect Wallet
        </button>
      </div>
      <div className="content bg-[url('/1341130.png')] bg-cover bg-center h-[91%] relative flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-black/8 invert"></div>
        {available ? <SwapToken /> : <CheckAvailalbilty />}
      </div>
    </div>
  );
};

export default Swap;
