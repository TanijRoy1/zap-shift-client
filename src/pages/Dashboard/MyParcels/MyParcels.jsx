import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteParcel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.assign(res.data.url);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          My Parcels:{" "}
          <span className="text-sm text-accent">
            {parcels.length} parcels found
          </span>
        </h1>
      </div>

      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Tracking ID</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id || index}>
                <th>{index + 1}</th>
                <td className="max-w-xs truncate">{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-600 bg-green-100 rounded-full font-semibold px-3 py-1 text-xs">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-primary btn-sm text-accent"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="capitalize">{parcel.deliveryStatus || "-"}</td>
                <td>
                  <Link
                    to={`/parcel-track/${parcel.trackingId}`}
                    className="link link-accent"
                  >
                    {parcel.trackingId || "-"}
                  </Link>
                </td>
                <td className="flex justify-center gap-2">
                  <button className="btn btn-square btn-sm" aria-label="View">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square btn-sm" aria-label="Edit">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteParcel(parcel._id)}
                    className="btn btn-square btn-sm"
                    aria-label="Delete"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD LIST for small screens */}
      <div className="md:hidden space-y-3">
        {parcels.map((parcel, index) => (
          <div
            key={parcel._id || index}
            className="bg-white rounded-lg shadow p-3 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-500">#{index + 1}</div>
                <div className="font-semibold text-base truncate">
                  {parcel.parcelName}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {parcel.trackingId ? (
                    <Link
                      to={`/parcel-track/${parcel.trackingId}`}
                      className="text-accent"
                    >
                      {parcel.trackingId}
                    </Link>
                  ) : (
                    "-"
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-sm font-medium">{parcel.cost}</div>
                <div>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-600 bg-green-100 rounded-full font-semibold px-3 py-1 text-xs">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-sm btn-primary text-accent"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="capitalize">{parcel.deliveryStatus || "-"}</div>
              <div className="flex items-center gap-2">
                <button className="btn btn-ghost btn-sm" aria-label="View">
                  <FaMagnifyingGlass />
                </button>
                <button className="btn btn-ghost btn-sm" aria-label="Edit">
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDeleteParcel(parcel._id)}
                  className="btn btn-ghost btn-sm"
                  aria-label="Delete"
                >
                  <FaTrashCan />
                </button>
              </div>
            </div>
          </div>
        ))}

        {parcels.length === 0 && (
          <div className="text-center text-gray-500 p-4">No parcels found.</div>
        )}
      </div>
    </div>
  );
};

export default MyParcels;
