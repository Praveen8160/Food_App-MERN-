import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const [User, setuser] = useState({});
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
        } else {
          alert("Please Try Again!");
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
  );
}

export default Profile;
