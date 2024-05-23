import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";

const ProtectedRoute = ({ component: Component, role: requiredRole }) => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth, Role } = useContext(AuthContext);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (
        isAuthenticated === false ||
        (requiredRole && !requiredRole.includes(Role))
      ) {
        navigate("/SignIn");
      }
    };
    verifyAuth();
  }, [isAuthenticated, requiredRole, Role, navigate, checkAuth]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? <Component /> : null;
};

export default ProtectedRoute;
