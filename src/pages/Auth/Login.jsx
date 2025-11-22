import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  return (
    <div>
      <h1 className="text-3xl text-accent font-bold">Welcome Back</h1>
      <p className="mb-6">Login with ZapShift</p>
      <form className="">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary text-accent mt-4">Login</button>
        </fieldset>
      </form>
      <p className="mt-3">
        Don’t have any account?{" "}
        <Link to={`/register`} className="text-primary hover:underline">
          Register
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
