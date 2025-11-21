import React from 'react';
import Banner from './Banner/Banner';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';
import HowItWorks from './HowItWorks/HowItWorks';
import Services from './Services/Services';

const reviewsPromise = fetch("./reviews.json").then(res => res.json());

const Home = () => {
    return (
        <div className='bg-base-200'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;