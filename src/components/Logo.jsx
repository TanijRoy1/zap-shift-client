import React from "react";
import LogoImg from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img src={LogoImg} alt="" />
      <h1 className="text-2xl font-black -ml-3.5">ZapShift</h1>
    </div>
  );
};

export default Logo;
