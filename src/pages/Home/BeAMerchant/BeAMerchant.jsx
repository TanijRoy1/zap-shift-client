import React from 'react';
import MyContainer from '../../../components/MyContainer';
import beAMerchantImg from '../../../assets/be-a-merchant-bg.png';
import locationMerchantImg from '../../../assets/location-merchant.png';


const BeAMerchant = () => {
    return (
        <MyContainer>
            <div className='bg-secondary rounded-2xl'>
                <img src={beAMerchantImg} alt="" />

                <div className='flex items-center p-4 -mt-30'>
                    <div className='flex flex-col gap-8'>
                        <h1 className="text-3xl font-bold text-base-100">
                            Merchant and Customer Satisfaction is Our First Priority
                        </h1>
                        <p className="text-base-300">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <div className='flex items-center gap-4'>
                            <button className='btn btn-primary text-secondary rounded-full'>Become a Merchant</button>
                            <button className='btn btn-outline btn-primary hover:text-secondary rounded-full'>Earn with ZapShift Courier</button>
                        </div>
                    </div>
                    <img src={locationMerchantImg} alt="" className='-ml-20' />
                </div>
            </div>
        </MyContainer>
    );
};

export default BeAMerchant;