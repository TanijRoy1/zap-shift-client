import React from "react";
import MyContainer from "../components/MyContainer";
import Logo from "../components/Logo";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <MyContainer className={`py-10`}>
      <Logo></Logo>
      <div className="flex lg:flex-row flex-col items-center justify-between gap-6 pt-8">
        <div className="flex-1 max-w-sm">
          <Outlet></Outlet>
        </div>
        <div className="">
          <img src={authImage} alt="" />
        </div>
      </div>
    </MyContainer>
  );
};

export default AuthLayout;
