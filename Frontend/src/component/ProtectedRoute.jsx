import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";

const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (isAuthenticated === false) {
        navigate("/SignIn");
      }
    };
    verifyAuth();
  }, [isAuthenticated, navigate, checkAuth]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? <Component /> : null;
};

export default ProtectedRoute;
