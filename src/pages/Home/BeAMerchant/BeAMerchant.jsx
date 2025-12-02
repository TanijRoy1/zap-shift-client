import React from 'react';
import MyContainer from '../../../components/MyContainer';
import beAMerchantImg from '../../../assets/be-a-merchant-bg.png';
import locationMerchantImg from '../../../assets/location-merchant.png';
import customerTop from '../../../assets/customer-top.png'


const BeAMerchant = () => {
    return (
        <MyContainer className={`flex flex-col items-center gap-8`}>
            <div className='bg-secondary rounded-2xl'>
                <img src={beAMerchantImg} alt="" />

                <div className='flex lg:flex-row flex-col items-center p-4 lg:-mt-30'>
                    <div className='flex flex-col gap-8'>
                        <h1 className="text-3xl font-bold text-base-100">
                            Merchant and Customer Satisfaction is Our First Priority
                        </h1>
                        <p className="text-base-300">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <div className='flex lg:flex-row flex-col items-center gap-4'>
                            <button className='btn btn-primary text-secondary rounded-full'>Become a Merchant</button>
                            <button className='btn btn-outline btn-primary hover:text-secondary rounded-full'>Earn with ZapShift Courier</button>
                        </div>
                    </div>
                    <img src={locationMerchantImg} alt="" className='lg:-ml-20 lg:my-0 my-6' />
                </div>
            </div>
            <img src={customerTop} alt="" />
        </MyContainer>
    );
};

export default BeAMerchant;