import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartcount } from "../Context/CartProvider";
import { AuthContext } from "../Context/AuthProvider";
import { MdMenu, MdClose } from "react-icons/md";

function Header() {
  const { count } = useContext(cartcount);
  const { isAuthenticated, logout, Role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleselect = async (event) => {
    const value = event.target.value;
    if (value === "Logout") {
      try {
        await logout();
        navigate("/SignIn");
      } catch (error) {
        console.error("Error logging out", error);
      }
    } else {
      navigate(`/${value}`);
      event.target.value = "";
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-red-400 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.yEF7JTCS1sTJEphGsADZTQHaHa&pid=Api&P=0&h=180"
          alt="logo"
          className="h-10 w-10 mr-2"
        />
        <div className="text-white text-2xl font-bold">FOoDy</div>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>
      <ul
        className={`md:flex md:items-center md:space-x-6 ${
          menuOpen ? "block" : "hidden"
        } absolute md:static top-16 left-0 w-full md:w-auto bg-red-300 md:bg-transparent p-4 md:p-0 z-10`}
      >
        {Role !== "Seller" && (
          <li>
            <Link
              to={"/"}
              className="text-white text-xl font-bold hover:underline block md:inline"
            >
              Home
            </Link>
          </li>
        )}
        {isAuthenticated && Role === "Customer" && (
          <li>
            <Link
              to={"/Myorder"}
              className="text-white text-xl font-bold hover:underline block md:inline"
            >
              My Order
            </Link>
          </li>
        )}
        {isAuthenticated && Role === "Seller" && (
          <>
            <li>
              <Link
                to={"/Dashboard"}
                className="text-white text-xl font-bold hover:underline block md:inline"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <select
                className="bg-transparent text-white font-bold text-xl mt-2 md:mt-0 outline-none"
                onChange={handleselect}
                defaultValue=""
              >
                <option value="" disabled>
                  Option
                </option>
                <option value="Add_food" className="text-black">
                  Add Food
                </option>
                <option value="View_food" className="text-black">
                  View Food
                </option>
                <option value="View_Order" className="text-black">
                  View Order
                </option>
              </select>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            {Role === "Customer" && (
              <li>
                <Link
                  className="text-white text-xl font-bold hover:underline block md:hidden"
                  to={"/Cart"}
                >
                  My Cart{" "}
                  <span className="bg-red-400 rounded-full p-1">{count}</span>
                </Link>
              </li>
            )}
            <li>
              <select
                className="bg-transparent text-white font-bold text-xl mt-2 md:mt-0 outline-none block md:hidden"
                onChange={handleselect}
                defaultValue=""
              >
                <option value="" disabled>
                  Account
                </option>
                <option value="Logout" className="text-black">Logout</option>
                <option value="Profile" className="text-black">Profile</option>
              </select>
            </li>
          </>
        )}
      </ul>
      {!isAuthenticated ? (
        <div className="hidden md:flex space-x-4">
          <button className="bg-white rounded-md p-3 hover:bg-gray-300">
            <Link to="/SignIn" className="text-black font-bold text-xl">
              Login
            </Link>
          </button>
          <button className="bg-white rounded-md p-3 hover:bg-gray-300">
            <Link to={"/SignUp"} className="text-black font-bold text-xl">
              Sign Up
            </Link>
          </button>
        </div>
      ) : (
        <div className="hidden md:flex space-x-4">
          {Role === "Customer" && (
            <button className="bg-white rounded-md p-3 hover:bg-gray-300">
              <Link to="/Cart" className="text-black font-bold text-xl">
                My Cart{" "}
                <span className="bg-red-400 rounded-full p-1">{count}</span>
              </Link>
            </button>
          )}
          <select
            className="bg-white rounded-md p-3 border-none font-bold text-xl text-black"
            onChange={handleselect}
            defaultValue=""
          >
            <option value="" disabled>
              Account
            </option>
            <option value="Logout">Logout</option>
            <option value="Profile">Profile</option>
          </select>
        </div>
      )}
    </nav>
  );
}

export default Header;
