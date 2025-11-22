import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div>
      <p className="py-4 text-center">Or</p>
      <button className="flex items-center gap-1.5 btn w-full">
        <FcGoogle className="text-2xl" />
        Sign in with google
      </button>
    </div>
  );
};

export default SocialLogin;
