import React from "react";
import liveTrakingImg from "../../../assets/live-tracking.png";
import safeDeliveryImg from "../../../assets/safe-delivery.png";
import MyContainer from "../../../components/MyContainer";

const keyServices = [
  {
    id: 1,
    image: liveTrakingImg,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    id: 2,
    image: safeDeliveryImg,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    id: 3,
    image: safeDeliveryImg,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const KeyServices = () => {
  return (
    <MyContainer className={`border-t-2 border-dashed py-10`}>
      <div className={`flex flex-col gap-6`}>
        {keyServices.map((service) => (
          <div
            key={service.id}
            className="flex lg:flex-row flex-col items-center gap-2 bg-base-100 border border-base-300 rounded-md shadow"
          >
            <img
              src={service.image}
              alt={service.title}
              className="rounded-md p-4"
            />
            <div className="p-6 lg:border-l border-t border-dashed flex flex-col gap-5">
              <h1 className="text-xl font-semibold text-accent">
                {service.title}
              </h1>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </MyContainer>
  );
};

export default KeyServices;
