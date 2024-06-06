import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
export default function View_food() {
  const [FoodData, setFoodData] = useState([]);
  const GetAllFoodData = async () => {
    const response = await axios.get("http://localhost:5000/api/Food/Allfood", {
      params: {
        user: "Role", // Correct way to include query parameters
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFoodData(response.data.FoodData);
  };
  const handledelete = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/Food/Delete-Food`,
        { id: id },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      GetAllFoodData();
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    GetAllFoodData();
  }, []);
  return (
    <div className="bg-red-200 min-h-screen flex flex-col p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif mx-auto mt-10 underline">
        View Food
      </h1>
      <div className="hidden md:flex justify-center px-4 sm:px-6 lg:px-8">
        <table className="w-full max-w-6xl mt-10 mb-32 border-separate border-spacing-2 bg-red-300 border rounded-xl text-white border-slate-500">
          <thead>
            <tr>
              {[
                "ID",
                "Name",
                "Category",
                "Food Type",
                "Image",
                "Description",
                "Price",
                "Delete",
                "Edit",
              ].map((header) => (
                <th
                  key={header}
                  className="border text-sm sm:text-lg md:text-2xl border-slate-600 rounded-md p-2"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FoodData.map((val, index) => (
              <tr key={index} className="text-center">
                <td className="border border-slate-700 rounded-md p-2">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md p-2">
                  {val.name}
                </td>
                <td className="border border-slate-700 rounded-md p-2">
                  {val.category}
                </td>
                <td className="border border-slate-700 rounded-md p-2">
                  {val.foodType}
                </td>
                <td className="border border-slate-700 rounded-md p-2">
                  <img
                    className="object-cover h-20 w-20 mx-auto"
                    src={val.Image}
                    alt={val.name}
                  />
                </td>
                <td className="border border-slate-700 rounded-md p-2">
                  {val.description}
                </td>
                <td className="border border-slate-700 rounded-md p-2">
                  {val.price}
                </td>
                <td className="border text-xl text-center cursor-pointer border-slate-700 rounded-md p-2">
                  <Link to={`/Edit_food/${val._id}`}>
                    <FaRegEdit />
                  </Link>
                </td>
                <td className="border text-xl text-center cursor-pointer border-slate-700 rounded-md p-2">
                  <MdDelete onClick={() => handledelete(val._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden flex flex-col space-y-4 mt-10">
        {FoodData.map((val, index) => (
          <div
            key={index}
            className="bg-red-300 p-4 rounded-xl shadow-md text-white"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">ID: {index + 1}</span>
              <div className="flex space-x-2">
                <MdDelete
                  className="text-xl cursor-pointer"
                  onClick={() => handledelete(val._id)}
                />
                <MdDelete className="text-xl cursor-pointer" />
              </div>
            </div>
            <div className="mt-2">
              <span className="block">
                <strong>Name:</strong> {val.name}
              </span>
              <span className="block">
                <strong>Category:</strong> {val.category}
              </span>
              <span className="block">
                <strong>Food Type:</strong> {val.foodType}
              </span>
              <img
                className="object-cover h-20 w-full my-2"
                src={val.Image}
                alt={val.name}
              />
              <span className="block">
                <strong>Description:</strong> {val.description}
              </span>
              <span className="block">
                <strong>Price:</strong> {val.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
