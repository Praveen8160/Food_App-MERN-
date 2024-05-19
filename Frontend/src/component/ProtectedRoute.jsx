import React, { useEffect, useState } from "react";
// import { Route, Redirect } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";

const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/SignIn");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? <Component /> : null;
};

export default ProtectedRoute;
