import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router";

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleString() : "-");

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500">
            Total payments:{" "}
            <span className="font-medium">{payments.length}</span>
          </p>
        </div>
      </div>

      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Parcel
              </th>
              
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment Info
              </th>
              
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Transaction ID/Tracking
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {payments.map((p, i) => (
              <tr key={p._id || i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{i + 1}</td>

                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">
                      {p.parcelName}
                    </span>
                    <span className="text-xs text-gray-400">{p.parcelId}</span>
                  </div>
                </td>


                <td className="px-4 py-3 text-sm text-gray-700">
                  {p.customerEmail}
                </td>


                <td className="px-4 py-3 flex flex-col">
                  <p className=" py-3 text-sm font-medium text-gray-900">Cost: <span>{p.currency?.toUpperCase() === "USD"
                    ? `$${p.amount}`
                    : `${p.amount} ${p.currency}`}</span></p>
                  <p>Status: <span
                    className={` py-0.5 rounded-full text-sm px-2.5 font-bold capitalize ${
                      p.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {p.paymentStatus}
                  </span></p>
                  <p className="py-3 text-sm text-gray-600">Paid At: <span>{fmtDate(p.paidAt)}</span></p>
                </td>

        

                <td className="px-4 py-3 text-sm text-gray-700">
                  <p className="font-semibold">Transaction ID: <span className="font-normal">{p.transactionId}</span></p>
                  <p className="font-semibold">Tracking ID: <span className="font-normal">{p.trackingId}</span></p>
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        navigator.clipboard?.writeText(p.transactionId || "")
                      }
                      className="px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FiCopy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </button>

                    <Link
                      to={`/parcel-track/${p.trackingId}`}
                      className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Track</span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {payments.map((p, i) => (
          <div key={p._id || i} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-gray-900">
                  {p.parcelName}
                </h2>
                <p className="text-xs text-gray-500">{p.parcelId}</p>

                <p className="mt-2 text-sm font-mono text-gray-700 truncate">
                  {p.transactionId}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  <strong>Customer:</strong> {p.customerEmail}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Paid:</strong> {fmtDate(p.paidAt)}
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {p.currency?.toUpperCase() === "USD"
                    ? `$${p.amount}`
                    : `${p.amount} ${p.currency}`}
                </div>

                <div className="mt-3 flex flex-col gap-2 text-xs">
                  <button
                    onClick={() =>
                      navigator.clipboard?.writeText(p.transactionId)
                    }
                    className="px-3 py-1 border rounded-md flex items-center gap-1"
                  >
                    <FiCopy className="w-4 h-4" /> Copy
                  </button>

                  <a
                    href={`/track/${p.trackingId}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md flex items-center gap-1"
                  >
                    <FiExternalLink className="w-4 h-4" /> Track
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-2">{p.trackingId}</p>
          </div>
        ))}

        {payments.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No payments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
