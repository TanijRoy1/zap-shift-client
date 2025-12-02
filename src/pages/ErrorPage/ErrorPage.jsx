import React from 'react';
import errorImg from "../../assets/error.png"
import { Link } from 'react-router';
import MyContainer from '../../components/MyContainer';

const ErrorPage = () => {
    return (
        <MyContainer className={`flex items-center justify-center min-h-screen`} >
            <div><img src={errorImg} alt="Error" />
            <div className='flex gap-3 justify-center'>
                <Link to={`/`} className='btn btn-primary text-accent'>Go to Home</Link>
                <Link to={`/dashboard`} className='btn btn-accent text-base-100'>Go to Dashboard</Link>
            </div></div>
        </MyContainer>
    );
};

export default ErrorPage;