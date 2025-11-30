import React, { useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const handleAssignRiders = (parcel) => {
    riderModalRef.current.showModal();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Assign Riders ({parcels.length})
      </h1>

      <div className="overflow-x-auto md:block hidden">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Info</th>
              <th>Sender Info</th>
              <th>Receiver Info</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel.trackingId}>
                <th>{index + 1}</th>

                {/* Parcel Info */}
                <td>
                  <div className="font-semibold text-lg">
                    {parcel.parcelName}
                  </div>

                  <div className="text-sm text-gray-600">
                    Weight:{" "}
                    <span className="font-medium">
                      {parcel.parcelWeight} kg
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    Cost: <span className="font-medium">৳{parcel.cost}</span>
                  </div>

                  {/* Created At */}
                  <div className="text-sm text-gray-600">
                    Created:{" "}
                    <span className="font-medium">
                      {moment(parcel.createdAt).format(
                        "MMM DD, YYYY | hh:mm A"
                      )}
                    </span>
                  </div>

                  {/* Status Badges */}
                  <div className="mt-2 flex gap-2">
                    <span className="badge badge-info capitalize">
                      {parcel.deliveryStatus}
                    </span>
                    <span className="badge badge-success capitalize">
                      {parcel.paymentStatus}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    Tracking: {parcel.trackingId}
                  </div>
                </td>

                {/* Sender Info */}
                <td>
                  <div className="font-medium">{parcel.senderName}</div>
                  <div className="text-sm">{parcel.senderEmail}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {parcel.senderAddress}, {parcel.senderDistrict},{" "}
                    {parcel.senderRegion}
                  </div>
                </td>

                {/* Receiver Info */}
                <td>
                  <div className="font-medium">{parcel.receiverName}</div>
                  <div className="text-sm">{parcel.receiverEmail}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {parcel.receiverAddress}, {parcel.receiverDistrict},{" "}
                    {parcel.receiverRegion}
                  </div>
                </td>

                {/* Assign Button */}
                <td>
                  <button
                    onClick={() => handleAssignRiders(parcel)}
                    className="btn btn-primary btn-sm text-accent"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Mobile cards for small screens */}
      <div className="md:hidden space-y-4">
        {parcels.map((p, i) => (
          <article key={p.trackingId ?? i} className="card shadow-sm rounded-lg p-4 bg-base-100">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">{p.parcelName}</h2>
                <div className="text-xs text-gray-500">Tracking: {p.trackingId}</div>
              </div>

              <div className="text-right">
                <div className="font-medium">৳{p.cost}</div>
                <div className="text-sm text-gray-600">{p.parcelWeight} kg</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="font-medium">Sender</div>
                <div>{p.senderName}</div>
                <div className="truncate text-xs">{p.senderEmail}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {p.senderAddress}, {p.senderDistrict}
                </div>
              </div>

              <div>
                <div className="font-medium">Receiver</div>
                <div>{p.receiverName}</div>
                <div className="truncate text-xs">{p.receiverEmail}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {p.receiverAddress}, {p.receiverDistrict}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={
                    p.deliveryStatus === "pending-pickup"
                      ? "badge badge-info"
                      : p.deliveryStatus === "in-transit"
                      ? "badge badge-warning"
                      : p.deliveryStatus === "delivered"
                      ? "badge badge-success"
                      : p.deliveryStatus === "cancelled"
                      ? "badge badge-error"
                      : "badge"
                  }
                >
                  {p.deliveryStatus?.replace(/-/g, " ") ?? "unknown"}
                </span>

                <span className={p.paymentStatus === "paid" ? "badge badge-success" : "badge badge-outline"}>
                  {p.paymentStatus ?? "unknown"}
                </span>

                <span className="text-xs text-gray-500 ml-2">
                  {p.createdAt
                    ? new Date(p.createdAt).toLocaleString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "Asia/Dhaka",
                      })
                    : "-"}
                </span>
              </div>

              <div>
                <button
                  onClick={() => handleAssignRiders(p)}
                  className="btn btn-primary btn-sm"
                  aria-label={`Assign rider to ${p.trackingId}`}
                >
                  Assign
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
