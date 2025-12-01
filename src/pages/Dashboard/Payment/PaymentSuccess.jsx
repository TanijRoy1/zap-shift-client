import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  CheckCircle,
  Mail,
  Tag,
  Package,
  CreditCard,
  Calendar,
  Hash,
} from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo(res.data.paymentInfo);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle className="text-green-500 w-10 h-10" />
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful
        </h1>
      </div>

      <p className="text-gray-600 mb-6">
        Thank you! Your payment was completed successfully.
      </p>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium flex gap-2 items-center">
            <Tag size={18} /> Amount
          </span>
          <span className="font-semibold">
            ${paymentInfo.amount} {paymentInfo.currency}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium flex gap-2 items-center">
            <Mail size={18} /> Customer Email
          </span>
          <span>{paymentInfo.customerEmail}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium flex gap-2 items-center">
            <Package size={18} /> Parcel Name
          </span>
          <span>{paymentInfo.parcelName}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium flex gap-2 items-center">
            <CreditCard size={18} /> Transaction ID
          </span>
          <span className="font-mono text-sm">{paymentInfo.transactionId}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium flex gap-2 items-center">
            <Hash size={18} /> Tracking ID
          </span>
          <span className="font-mono text-sm">{paymentInfo.trackingId}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium flex gap-2 items-center">
            <Calendar size={18} /> Paid At
          </span>
          <span>{new Date(paymentInfo.paidAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="text-center mt-6">
        <a
          href="/dashboard/payments-history"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          View Payment History
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
