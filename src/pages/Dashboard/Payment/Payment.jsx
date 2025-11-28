import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    const {isLoading, data:parcel} = useQuery({
        queryKey: ["parcels", parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    
    const handlePayment = async () => {
        const paymentInfo = {
            cost : parcel.cost,
            senderEmail: parcel.senderEmail,
            parcelId: parcel._id,
            parcelName: parcel.parcelName
        }
        const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
        // console.log(res.data);
        window.location.href = res.data.url;
    }

    if(isLoading){
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <h1>Please pay {parcel.cost} tk for {parcel.parcelName}</h1>
            <button onClick={handlePayment} className='btn btn-primary text-accent'>Pay</button>
        </div>
    );
};

export default Payment;