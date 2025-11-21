import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";
import MyContainer from "../../../components/MyContainer";

const Brands = () => {
  const brandLogos = [
    amazon,
    casio,
    moonstar,
    randstad,
    amazonVector,
    star,
    startPeople,
  ];

  return (
    <MyContainer className="py-10 pb-30">
      <h1 className="sectionHeading mb-15">We've helped thousands of sales teams</h1>
      <Swiper
      loop={true}
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt={logo} />
        </SwiperSlide>
      ))}
    </Swiper>
    </MyContainer>
  );
};

export default Brands;
