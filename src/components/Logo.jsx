import React from "react";
import LogoImg from "../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={'/'} className="flex items-end">
      <img src={LogoImg} alt="" />
      <h1 className="text-2xl font-black -ml-3.5">ZapShift</h1>
    </Link>
  );
};

export default Logo;
