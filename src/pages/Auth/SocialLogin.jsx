import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { googleSignInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleGoogleSignin = () => {
    googleSignInUser().then((res) => {
      navigate(location.state || "/");
      const userInfo = {
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };
      axiosSecure.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log("user added to database.");
        }
      });
    });
  };
  return (
    <div>
      <p className="py-4 text-center">Or</p>
      <button
        onClick={handleGoogleSignin}
        className="flex items-center gap-1.5 btn w-full"
      >
        <FcGoogle className="text-2xl" />
        Sign in with google
      </button>
    </div>
  );
};

export default SocialLogin;
