import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
function SignIn() {
  const [credentials, setcredentials] = useState({});
  const { login, SetRole, Role } = useContext(AuthContext);
  const [error, seterror] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/user/SignIn`,
      {
        email: credentials.email,
        password: credentials.password,
      },
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = response.data;
    if (res.success) {
      if (res.user.role == "Customer") {
        login();
        SetRole("Customer");
        navigate("/");
      } else {
        login();
        SetRole("Seller");
        navigate("/Add_food");
      }
    } else {
      seterror(res.errors);
    }
  };
  const onchange = (e) => {
    const { name, value } = e.target;
    setcredentials({ ...credentials, [name]: value });
  };
  return (
    <>
      {!error ? (
        <div
          className="flex flex-col items-center justify-center px-6 py-12 lg:px-8 bg-red-200 text-white"
          style={{height:"90vh"}}
        >
          <div
            className="max-w-md w-4/5 p-10 rounded-t-full bg-transparent shadow-2xl"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.yEF7JTCS1sTJEphGsADZTQHaHa&pid=Api&P=0&h=180"
                alt="logo"
                style={{ height: "100px" }}
                className=" ml-32 rounded-full align-middle text-2xl font-bold leading-9 border-blue-50"
              />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-700">
                Sign In
              </h2>
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
                    htmlFor="email"
                    className="block text-lg font-bold leading-6 text-zinc-700"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={onchange}
                      value={credentials.email}
                      autoComplete="email"
                      required
                      className="block w-full rounded-xl border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg font-bold leading-6 text-zinc-700"
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
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-xl border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-xl px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-700 shadow-sm bg-red-400 hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                  >
                    Sign in
                  </button>
                  <Link
                    to={"/SignUp"}
                    className="flex w-full justify-center rounded-xl  px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-700 shadow-sm bg-red-400 hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400  mt-4"
                  >
                    {" "}
                    I'm New User
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

export default SignIn;
