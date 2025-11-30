import React from "react";
import MyContainer from "../../../components/MyContainer";
import { FaTruckMoving } from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    icon: <FaTruckMoving />,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 2,
    icon: <FaTruckMoving />,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 3,
    icon: <FaTruckMoving />,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 4,
    icon: <FaTruckMoving />,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowItWorks = () => {
  return (
    <MyContainer className={`py-10`}>
      <h1 className="text-3xl font-bold mb-8 text-accent">How it Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="p-8 border border-base-300 bg-base-100 shadow-md rounded-lg"
          >
            <h1 className="text-3xl text-accent">{service.icon}</h1>
            <h1 className="text-xl font-bold py-5 text-accent">
              {service.title}
            </h1>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </MyContainer>
  );
};

export default HowItWorks;
