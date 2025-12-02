import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Legend, Pie, PieChart, Tooltip } from "recharts";
import {
  FaBoxOpen,
  FaCreditCard,
  FaUser,
  FaMapMarkedAlt,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const DashboardAdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const statusArr = [
    "parcel_created",
    "parcel_paid",
    "rider_assigned",
    "rider_arriving",
    "parcel_picked_up",
    "parcel_delivered",
  ];

  const icons = {
    parcel_created: <FaBoxOpen />,
    parcel_paid: <FaCreditCard />,
    rider_assigned: <FaUser />,
    rider_arriving: <FaMapMarkedAlt />,
    parcel_picked_up: <FaTruck />,
    parcel_delivered: <FaCheckCircle />,
  };

  console.log(statusArr.find((s) => s === icons));
  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const getPiechartData = (deliveryStats) => {
    return deliveryStats.map((stat) => {
      return { name: stat.status, value: stat.count };
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-accent text-center">
        Admin Dashboard Overview
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        A quick summary of parcel delivery progress across all stages.
      </p>

      <div className="flex items-center justify-center flex-wrap gap-8 mt-10">
        {statusArr.map((status, i) => (
          <div
            key={i}
            className="text-center rounded-2xl px-25 py-8 bg-accent text-base-300 shadow-xl"
          >
            <div className="flex justify-center text-5xl text-green-600 mb-5 ">
              {icons[status]}
            </div>
            <div className="w-33 capitalize">{status.split("_").join(" ")}</div>
            <div className="text-3xl font-bold text-primary py-1">
              {deliveryStats.find((stat) => stat.status === status)?.count ?? 0}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-[400px] flex md:flex-row flex-col">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 2,
          }}
          responsive
        >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={getPiechartData(deliveryStats)}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            fill="#8884d8"
            label
            isAnimationActive={true}
          />
          <Legend></Legend>
          <Tooltip></Tooltip>
        </PieChart>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10 md:ml-13">
          {statusArr.map((status, i) => (
            <div
              key={i}
              className="rounded-2xl pl-4 pr-20 py-5 flex items-center bg-accent text-base-300 shadow-xl"
            >
              <div className="flex gap-5 items-center">
                <div className="flex justify-center items-center md:text-5xl text-3xl text-green-600">
                  {icons[status]}
                </div>
                <div>
                  <div className="w-33 capitalize">
                    {status.split("_").join(" ")}
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {deliveryStats.find((stat) => stat.status === status)
                      ?.count ?? 0}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminHome;
