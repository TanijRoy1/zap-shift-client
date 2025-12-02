import React from "react";
import MyContainer from "../../../components/MyContainer";
import Logo from "../../../components/Logo";
import { Link } from "react-router";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-black text-base-300 text-center">
      <MyContainer className={`flex flex-col items-center gap-5 py-10`}>
        <Logo></Logo>
        <p className="max-w-3xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {[
            "Services",
            "Coverage",
            "About Us",
            "Pricing",
            "Blog",
            "Contact",
          ].map((anchor, index) => (
            <Link
              to={`/${anchor}`}
              key={index}
              className="font-semibold hover:text-blue-500 hover:underline"
            >
              {anchor}
            </Link>
          ))}
        </div>
        <div className="flex text-2xl items-center gap-6">
          <a
            href="#"
            className="bg-[#0575B3] rounded-full text-white p-1.5 text-sm"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            className="bg-[#FFFFFF] rounded-full text-black font-bold p-1.5 text-sm"
          >
            <FaXTwitter />
          </a>
          <a href="#" className="text-[#006AFF] bg-white rounded-full">
            <FaFacebook />
          </a>
          <a
            href="#"
            className="bg-[#FF0000] rounded-full text-white p-1.5 text-sm"
          >
            <IoLogoYoutube />
          </a>
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;
