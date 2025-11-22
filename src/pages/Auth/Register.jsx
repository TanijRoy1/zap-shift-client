import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleRegistration = async (data)  => {
        const profileImg = data.photo[0];
        const formData = new FormData();
        formData.append("image", profileImg);
        await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`, formData)
          .then(res => {
            console.log(res.data.data.url);
          })
    }
  return (
    <div>
      <h1 className="text-3xl text-accent font-bold">Create an Account</h1>
      <p className="mb-6">Register with ZapShift</p>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" {...register("name", {required: true})} className="input w-full" placeholder="Name" />
          {errors.name?.type === "required" &&
          <p className="text-red-500">Password is required</p>
          }
          <label className="label">Photo</label>
          <input type="file" {...register("photo", {required: true})} className="file-input w-full" placeholder="Photo" />
          {errors.photo?.type === "required" &&
          <p className="text-red-500">Password is required</p>
          }
          <label className="label">Email</label>
          <input type="email" {...register("email", {required: true})} className="input w-full" placeholder="Email" />
          {errors.email?.type === "required" &&
          <p className="text-red-500">Email is required</p>
          }
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/})}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" &&
          <p className="text-red-500">Password is required</p>
          }
          {errors.password?.type === "minLength" &&
          <p className="text-red-500">Password must be 6 characters or longer</p>
          }
          {errors.password?.type === "pattern" &&
          <p className="text-red-500">Password must have at least one uppercase , one lowercase, one number and one special characters</p>
          }
          <button className="btn btn-primary text-accent mt-4">Register</button>
        </fieldset>
      </form>
      <p className="mt-3">
        Already have an account?{" "}
        <Link to={`/login`} className="text-primary hover:underline">
          Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
