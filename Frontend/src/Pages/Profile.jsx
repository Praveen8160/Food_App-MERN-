import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const [User, setuser] = useState({});
  const [error, seterror] = useState();
  const [update, setupdate] = useState(false);
  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/getUser", {
        withCredentials: true,
      });
      setuser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const onchange = (event) => {
    setuser({ ...User, [event.target.name]: event.target.value });
  };
  const updateuser = async () => {
    if (update === false) {
      setupdate(!update);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/user/updateUser",
          { User },
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          alert("Profile Update Successfully");
          setupdate(!update);
        } else if (response.data.error) {
          seterror(response.data.error)
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      {!error ? (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">Profile</h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="Name"
                        value={User.Name}
                        onChange={onchange}
                        readOnly={!update}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={User.email}
                        onChange={onchange}
                        readOnly={!update}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="Address"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="Address"
                        name="location"
                        value={User.location}
                        onChange={onchange}
                        readOnly={!update}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="Mobile"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Mobile
                      </label>
                      <input
                        type="number"
                        id="Mobile"
                        name="Mobile"
                        value={User.Mobile}
                        onChange={onchange}
                        readOnly
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    <button
                      className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                      onClick={updateuser}
                    >
                      {update ? "Save" : "Update"}
                    </button>
                  </div>
                </div>
              </div>
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

export default Profile;
