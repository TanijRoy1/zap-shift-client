import React from 'react';
import Banner from './Banner/Banner';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';
import HowItWorks from './HowItWorks/HowItWorks';
import Services from './Services/Services';
import KeyServices from './KeyServices/KeyServices';
import BeAMerchant from './BeAMerchant/BeAMerchant';
import FaqSection from './FaqSection/FaqSection';

const reviewsPromise = fetch("./reviews.json").then(res => res.json());

const Home = () => {
    return (
        <div className='bg-base-300'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Brands></Brands>
            <KeyServices></KeyServices>
            <BeAMerchant></BeAMerchant>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;