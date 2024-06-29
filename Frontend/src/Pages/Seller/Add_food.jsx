import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Add_food() {
  const { id } = useParams();
  const [FoodData, setFoodData] = useState({
    name: "",
    foodType: "",
    category: "Fast Food",
    Food_img: "",
    description: "",
    price: "",
  });
  const [Updatefood, setUpdatefood] = useState(false);
  const [foodcategory, setFoodCategory] = useState([]);
  const [image, setimage] = useState();
  const [errors, seterrors] = useState([]);
  const navigate = useNavigate();

  const getFoodCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/Food/Allfood",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFoodCategory(response.data.categoryData);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getFoodCategory();
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/Food/Singlefood/${id}`
          );
          const fooddata = response.data.fooddata;
          setFoodData({
            name: fooddata.name,
            foodType: fooddata.foodType,
            category: fooddata.category,
            Food_img: "",
            description: fooddata.description,
            price: fooddata.price,
          });
          setUpdatefood(true);
        } catch (error) {
          console.error("Error fetching task:", error);
        }
      }
    };

    fetchData();
  }, [id]);
  const onchange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...FoodData, [name]: value });
  };

  const handleFileChange = (event) => {
    setimage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Updatefood === false) {
      const formData = new FormData();
      formData.append("name", FoodData.name);
      formData.append("foodType", FoodData.foodType);
      formData.append("category", FoodData.category);
      formData.append("Food_img", image);
      formData.append("description", FoodData.description);
      formData.append("price", FoodData.price);
      try {
        const response = await axios.post(
          `http://localhost:5000/Food/Add-Food`,
          formData,
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const res = response.data;
        if (res.success) {
          alert("food add successfully");
        } else if (res.errors) {
          seterrors(res.errors);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (Updatefood === true) {
      console.log(FoodData);
      const formData = new FormData();
      formData.append("name", FoodData.name);
      formData.append("foodType", FoodData.foodType);
      formData.append("category", FoodData.category);
      formData.append("Food_img", image);
      formData.append("description", FoodData.description);
      formData.append("price", FoodData.price);
      try {
        const response = await axios.put(
          `http://localhost:5000/Food/Edit-Food/${id}`,
          formData,
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const res = response.data;
        console.log(res);
        if (res.success) {
          navigate("/View_food");
        } else if (res.errors) {
          seterrors(res.errors);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <>
      {errors.length > 0 ? (
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
                      className="h-6 w-6 text-black bg-red-600"
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
                      {errors.map((error) => (
                        <p className="text-sm text-red-900" key={error.msg}>
                          {error.msg}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-black hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => seterrors("")}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-screen bg-red-200 justify-center px-6 py-12 lg:px-8 text-black">
          <div
            className="max-w-4xl w-full p-10 rounded-3xl bg-transparent shadow-2xl mb-52"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-10">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.yEF7JTCS1sTJEphGsADZTQHaHa&pid=Api&P=0&h=180"
                alt="logo"
                className="mx-auto h-20 w-20 rounded-full"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-black">
                {Updatefood ? "Update Food" : "Add Food"}
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={onchange}
                      value={FoodData.name}
                      className="block w-full rounded-xl border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Category
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      onChange={onchange}
                      value={FoodData.category}
                      required
                      className="block w-full rounded-xl border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                    >
                      {foodcategory.map((item) => (
                        <option key={item._id} value={item.categoryName}>
                          {item.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="foodType"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Food Type
                  </label>
                  <div className="mt-1">
                    <input
                      id="foodType"
                      name="foodType"
                      type="text"
                      onChange={onchange}
                      value={FoodData.foodType}
                      className="block w-full rounded-xl border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="img"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Food Image
                  </label>
                  <div className="mt-1">
                    <input
                      id="img"
                      type="file"
                      name="Food_img"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full rounded-xl border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <input
                      id="description"
                      name="description"
                      type="text"
                      onChange={onchange}
                      value={FoodData.description}
                      required
                      className="block w-full rounded-xl border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Price
                  </label>
                  <div className="mt-1">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      onChange={onchange}
                      value={FoodData.price}
                      required
                      className="block w-full rounded-xl border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-xl bg-red-400 hover:bg-red-300 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                >
                  {Updatefood ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Add_food;
