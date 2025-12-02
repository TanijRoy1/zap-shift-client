import React from "react";
import { SiComma } from "react-icons/si";

const ReviewCard = ({ review }) => {
  const { user_email, userName, review: testimonial, user_photoURL } = review;
  return (
    <div className="border border-base-300 rounded-xl p-4 shadow-md bg-base-100">
      <div className="flex">
        <SiComma />
        <SiComma />
      </div>
      <p className="py-4 border-b border-dashed my-6">{testimonial}</p>

      <div className="flex md:flex-row flex-col items-center gap-4">
        <img
          src={user_photoURL}
          alt=""
          className="rounded-full w-15 object-cover"
        />
        <div>
          <p className="lg:text-xl text-sm font-semibold">{userName}</p>
          <p className="lg:text-sm text-xs lg:block hidden">{user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
