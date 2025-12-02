import React from "react";
import MyContainer from "../../../components/MyContainer";
import serviceImg from "../../../assets/service.png";

const services = [
  {
    id: 1,
    image: serviceImg,
    title: "Express  & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    id: 2,
    image: serviceImg,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    id: 3,
    image: serviceImg,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    id: 4,
    image: serviceImg,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    id: 5,
    image: serviceImg,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    id: 6,
    image: serviceImg,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const Services = () => {
  return (
    <MyContainer className={`bg-secondary py-10 md:px-8 px-4 rounded-2xl`}>
      <h1 className="text-3xl font-bold text-center mb-5 text-base-100">
        Our Services
      </h1>
      <p className="max-w-2xl mx-auto text-base-300 text-center mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 bg-base-100 border border-base-300 shadow-lg flex flex-col gap-4 items-center text-center rounded-2xl py-8"
          >
            <img
              src={service.image}
              alt={service.title}
              className="p-5 rounded-full bg-[#0000000e] shadow-transparent"
            />
            <h1 className="text-xl font-bold">{service.title}</h1>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </MyContainer>
  );
};

export default Services;
