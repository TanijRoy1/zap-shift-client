import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const DashboardRiderHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: deliveriesPerDay = [] } = useQuery({
    queryKey: ["deliveriesPerDay", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-accent text-center">
        Rider Dashboard Overview
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Track assigned parcels, update delivery statuses, and manage daily
        tasks.
      </p>

      <div className="flex mt-10 items-center justify-center gap-8">
        {deliveriesPerDay.map((delivery) => (
          <div
            key={delivery._id}
            className="text-center rounded-2xl px-25 py-8 bg-accent text-base-300 shadow-xl"
          >
            <p>
              <span className="font-semibold">Date:</span> {delivery._id}
            </p>
            <p className="text-3xl font-bold text-primary py-1">
              {delivery.deliveredCount}
            </p>
            <p className="text-gray-400">Parcel Delivered</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRiderHome;
