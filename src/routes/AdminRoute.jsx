import React from 'react';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../pages/Dashboard/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const {role, roleLoading} = useRole();

    if(roleLoading){
        return <Loading></Loading>;
    }
    if(role !== "admin"){
        return <Forbidden></Forbidden>;
    }
    return children;
};

export default AdminRoute;