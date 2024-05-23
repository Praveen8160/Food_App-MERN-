import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function SignUp() {
  const [credentials, setcredentials] = useState({
    Name: "",
    email: "",
    password: "",
    location: "",
    Mobile: "",
    OTP: "",
    Role: "Customer",
  });
  const [error, seterror] = useState();
  const [otp, setotp] = useState(30);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const otptimer = () => {
    setotp((pre) => pre - 1);
  };
  const handleotp = async (e) => {
    setloading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/otp/sendotp",
        {
          to: credentials.Mobile,
          email: credentials.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = res.data;
      // console.log(response);
      if (response.success == true) {
        const otptimeout = setInterval(otptimer, 1000);
        setTimeout(() => {
          clearInterval(otptimeout);
          setloading(false);
          setotp(30);
        }, 30000);
        alert(response.message);
      } else {
        seterror(response.errors);
        setloading(false);
      }
    } catch (error) {
      if (res.data.error) {
        seterror(res.data.errors);
      }
      setloading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/Signup",
        {
          Name: credentials.Name,
          email: credentials.email,
          password: credentials.password,
          Mobile: credentials.Mobile,
          OTP: credentials.OTP,
          location: credentials.location,
          Role: credentials.Role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = response.data;
      console.log(res);
      if (res.success) {
        navigate("/SignIn");
      } else {
        seterror(res.message);
      }
    } catch (error) {
      // console.log(error);
      seterror(error.message);
    }
  };
  const onchange = (e) => {
    const { name, value } = e.target;
    if (name === "Mobile") {
      setloading(false);
    }
    setcredentials({ ...credentials, [name]: value });
  };
  return (
    <>
      {!error ? (
        <div
          className="min-h-full flex flex-col items-center justify-center px-6 py-12 lg:px-8 text-white"
          style={{}}
        >
          <div
            className="max-w-md w-4/5 border-solid border-2 p-10 rounded-3xl "
            style={{ backgroundColor: "#333" }}
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.yEF7JTCS1sTJEphGsADZTQHaHa&pid=Api&P=0&h=180"
                alt="logo"
                style={{ height: "100px" }}
                className=" ml-32 rounded-full align-middle text-2xl font-bold leading-9 border-blue-50"
              />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="Name"
                      type="text"
                      onChange={onchange}
                      value={credentials.Name}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={onchange}
                      value={credentials.email}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={onchange}
                      value={credentials.password}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="Mobile"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Mobile
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="Mobile"
                      name="Mobile"
                      type="text"
                      disabled={loading}
                      onChange={onchange}
                      value={credentials.Mobile}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Role"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Role
                  </label>
                  <select
                    name="Role"
                    onChange={onchange}
                    value={credentials.Role}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="Location"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <input
                      id="Location"
                      name="location"
                      onChange={onchange}
                      value={credentials.location}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="OTP"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      OTP
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="OTP"
                      name="OTP"
                      type="text"
                      onChange={onchange}
                      value={credentials.OTP}
                      // required
                      className=" w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      onClick={handleotp}
                      disabled={loading}
                      className={`ml-1 rounded-md ${
                        loading ? "bg-indigo-500" : "bg-indigo-700"
                      } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      {loading ? "Sent" : "Send OTP"}
                    </button>
                    {loading ? otp + " second" : ""}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign Up
                  </button>
                  <Link
                    to={"/SignIn"}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                  >
                    {" "}
                    I'm Already User
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 bg-red-600 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                    <svg
                      className="h-6 w-6 text-white bg-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-red-900">
                      Error
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-red-900">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => seterror("")}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
