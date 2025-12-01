import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const statusRules = {
  pending_pickup: {
    accept: { disabled: false, text: "Accept" },
    reject: { disabled: false, text: "Reject" },
    picked: { disabled: true, text: "Mark as Picked Up" },
    delivered: { disabled: true, text: "Mark as Delivered" },
  },

  rider_assigned: {
    accept: { disabled: false, text: "Accept" },
    reject: { disabled: false, text: "Reject" },
    picked: { disabled: true, text: "Mark as Picked Up" },
    delivered: { disabled: true, text: "Mark as Delivered" },
  },

  rider_arriving: {
    accept: { disabled: true, text: "Accepted" },
    reject: { disabled: true, text: "Reject" },
    picked: { disabled: false, text: "Mark as Picked Up" },
    delivered: { disabled: true, text: "Mark as Delivered" },
  },

  parcel_picked_up: {
    accept: { disabled: true, text: "Accepted" },
    reject: { disabled: true, text: "Reject" },
    picked: { disabled: true, text: "Parcel Picked Up" },
    delivered: { disabled: false, text: "Mark as Delivered" },
  },

  parcel_delivered: {
    accept: { disabled: true, text: "Accepted" },
    reject: { disabled: true, text: "Reject" },
    picked: { disabled: true, text: "Parcel Picked Up" },
    delivered: { disabled: true, text: "Delivered" },
  },
};


const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider_assigned`
      );
      return res.data;
    },
  });

  const handleUpdateDeliveryStatus = (parcel, status) => {
    const statusInfo = { deliveryStatus: status, riderId: parcel.riderId, trackingId: parcel.trackingId };
    let message = `Parcel status is updated with ${status.split("_").join(" ")}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h1>Assign Deliveries: {parcels.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  {parcel.receiverAddress}, {parcel.receiverDistrict},{" "}
                  {parcel.receiverRegion}
                </td>
                <td>
                  
                      <button onClick={()=>handleUpdateDeliveryStatus(parcel, "rider_arriving")} disabled={statusRules[parcel.deliveryStatus].accept.disabled} className="btn btn-primary text-accent">
                        {statusRules[parcel.deliveryStatus].accept.text}
                      </button>
                      <button disabled={statusRules[parcel.deliveryStatus].reject.disabled} className="btn btn-warning text-accent ml-2">
                        {statusRules[parcel.deliveryStatus].reject.text}
                      </button>
                    
                </td>
                <td>
                  
                      <button onClick={()=>handleUpdateDeliveryStatus(parcel, "parcel_picked_up")} disabled={statusRules[parcel.deliveryStatus].picked.disabled} className="btn btn-primary text-accent">
                        {statusRules[parcel.deliveryStatus].picked.text}
                      </button>
                      <button onClick={()=>handleUpdateDeliveryStatus(parcel, "parcel_delivered")} disabled={statusRules[parcel.deliveryStatus].delivered.disabled} className="btn btn-primary text-accent ml-2">
                        {statusRules[parcel.deliveryStatus].delivered.text}
                      </button>
                   
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
