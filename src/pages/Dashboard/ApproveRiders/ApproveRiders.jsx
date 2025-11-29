import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck, FaUserMinus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleString() : "-");

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders`);
      return res.data;
    },
  });
  const updateStatus = (rider, status) => {
    axiosSecure
      .patch(`/riders/${rider._id}`, { status, email: rider.email })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Rider status is set to ${status}`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };
  const handleApprovedRider = (rider) => {
    updateStatus(rider, "approved");
  };
  const handleRejectRider = (rider) => {
    updateStatus(rider, "rejected");
  };
  const handleDeleteRider = (rider) => {};
  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Approve Riders
          </h1>
          <p className="text-sm text-gray-500">
            Pending riders: <span className="font-medium">{riders.length}</span>
          </p>
        </div>
      </header>

      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Region / District
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {riders.map((rider, idx) => (
              <tr key={rider._id ?? idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{idx + 1}</td>

                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {rider.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  {rider.contact}
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  <div>{rider.region}</div>
                  <div className="text-xs text-gray-400">{rider.district}</div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  {rider.email}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      rider.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : rider.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleApprovedRider(rider)}
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                      title="Approve"
                    >
                      <FaUserCheck />
                      <span className="hidden sm:inline">Approve</span>
                    </button>

                    <button
                      onClick={() => handleRejectRider(rider)}
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500 text-white hover:bg-orange-600"
                      title="Reject"
                    >
                      <FaUserMinus />
                      <span className="hidden sm:inline">Reject</span>
                    </button>

                    <button
                      onClick={() => handleDeleteRider(rider)}
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-md border text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <FaTrashAlt />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {riders.map((r, idx) => (
          <article
            key={r._id ?? idx}
            className="bg-white shadow rounded-lg p-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-gray-900">
                    {r.name}
                  </h2>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      r.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : r.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1">{r.email}</p>
                <p className="text-xs text-gray-500">Contact: {r.contact}</p>

                <div className="mt-3 text-sm text-gray-700">
                  <div>
                    <strong>NID:</strong> {r.nid}
                  </div>
                  <div>
                    <strong>Age:</strong> {r.age}
                  </div>
                  <div>
                    <strong>Region:</strong> {r.region} — {r.district}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Created: {fmtDate(r.createdAt)}
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <div className="text-lg font-semibold text-gray-900"></div>

                <button
                  onClick={() => handleApprovedRider(r)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                  title="Approve"
                >
                  <FaUserCheck />
                  <span className="text-xs">Approve</span>
                </button>

                <button
                  onClick={() => handleRejectRider(r)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500 text-white hover:bg-orange-600"
                  title="Reject"
                >
                  <FaUserMinus />
                  <span className="text-xs">Reject</span>
                </button>

                <button
                  onClick={() => handleDeleteRider(r)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <FaTrashAlt />
                  <span className="text-xs">Delete</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ApproveRiders;
