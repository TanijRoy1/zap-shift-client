import React from 'react';
import useRole from '../../../hooks/useRole';
import DashboardAdminHome from './DashboardAdminHome';
import DashboardRiderHome from './DashboardRiderHome';
import DashboardUserHome from './DashboardUserHome';

const DashboardHome = () => {
    const {role, roleLoading} = useRole();
    if(roleLoading){
        return <h1>Loaddiingg...</h1>
    }

    if(role === "admin"){
        return <DashboardAdminHome></DashboardAdminHome>;
    } else if (role === "rider"){
        return <DashboardRiderHome></DashboardRiderHome>;
    }else {
        return <DashboardUserHome></DashboardUserHome>;
    }
    
};

export default DashboardHome;