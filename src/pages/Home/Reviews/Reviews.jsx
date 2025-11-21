import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewCard from "./ReviewCard/ReviewCard";
import MyContainer from "../../../components/MyContainer";



const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  return (
    <MyContainer className={`py-10`}>
      <div className="text-center">
        <h1 className="sectionHeading mb-5">What our customers are sayings</h1>
        <p className="text-accent-content max-w-2xl mx-auto mb-10">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      <div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: "50%",
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          autoplay={{
          delay: 1100,
          disableOnInteraction: false,
        }}
          pagination={true}
          modules={[EffectCoverflow,Autoplay, Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>


  
      </div>
    </MyContainer>
  );
};

export default Reviews;
