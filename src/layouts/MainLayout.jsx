import React from 'react';
import Navbar from '../pages/Home/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/Home/Shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;