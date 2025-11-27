import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <h1 className="text-center py-30">
        <span className="loading loading-bars loading-xl"></span>
      </h1>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to={`/login`}></Navigate>;
};

export default PrivateRoute;
