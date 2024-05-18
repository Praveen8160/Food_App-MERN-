import React, { useEffect, useState } from "react";
// import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ component: Component}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/Order/checkAuth", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? <Component /> : <Navigate to="/SignIn" />;
};

export default ProtectedRoute;
