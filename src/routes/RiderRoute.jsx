import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../pages/Dashboard/Forbidden/Forbidden';

const RiderRoute = ({children}) => {
    const {loading} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || roleLoading){
        return <Loading></Loading>;
    }
    if(role !== "rider"){
        return <Forbidden></Forbidden>;
    }
    return children;
};

export default RiderRoute;