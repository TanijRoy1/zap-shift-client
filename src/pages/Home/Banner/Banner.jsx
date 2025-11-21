import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import MyContainer from "../../../components/MyContainer";
import { IoArrowForwardCircle } from "react-icons/io5";

const Banner = () => {
  return (
    <MyContainer>
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div className="relative">
          <img src={bannerImg1} />
          <div className="absolute left-21.5 bottom-18 flex gap-3">
            <div className="flex items-center">
              <button className="btn btn-primary">Track Your Parcel</button>
              <IoArrowForwardCircle className="text-4xl transform -rotate-45 cursor-pointer" />
            </div>
            <button className="btn btn-outline">Be A Rider</button>
          </div>
        </div>
        <div className="relative">
          <img src={bannerImg2} />
          <div className="absolute left-21.5 bottom-18 flex gap-3">
            <div className="flex items-center">
              <button className="btn btn-primary">Track Your Parcel</button>
              <IoArrowForwardCircle className="text-4xl transform -rotate-45 cursor-pointer" />
            </div>
            <button className="btn btn-outline">Be A Rider</button>
          </div>
        </div>
        <div className="relative">
          <img src={bannerImg3} />
          <div className="absolute left-21.5 bottom-18 flex gap-3">
            <div className="flex items-center">
              <button className="btn btn-primary">Track Your Parcel</button>
              <IoArrowForwardCircle className="text-4xl transform -rotate-45 cursor-pointer" />
            </div>
            <button className="btn btn-outline">Be A Rider</button>
          </div>
        </div>
      </Carousel>
    </MyContainer>
  );
};

export default Banner;
