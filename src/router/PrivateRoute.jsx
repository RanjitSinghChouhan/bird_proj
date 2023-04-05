import React from "react";
import { Navigate } from "react-router-dom";
import LayoutMain from "../components/Layout";
// import { useAuth } from '../customHook/useAuth.jsx';
// import '../assets/scss/Layout.scss';

const PrivateRoute = ({ isLayout = true, children }) => {
  // const validUser = useAuth();
  const validUser = localStorage.getItem("byrdstoken") ? true : false;
  return validUser ? (
    isLayout ? (
      <LayoutMain>{children}</LayoutMain>
    ) : (
      children
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
