import React, { useState, useEffect, useContext } from "react";
import style from "../style/Home.module.css";
import Card from "./Card";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const [FoodData, setFoodData] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [search, setsearch] = useState("");
  const navigate = useNavigate();
  const { Role } = useContext(AuthContext);
  const GetAllFoodData = async () => {
    const response = await axios.get("http://localhost:5000/api/Food/Allfood", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFoodData(response.data.FoodData);
    setcategoryData(response.data.categoryData);
  };
  useEffect(() => {
    if (Role === "Seller") {
      navigate("/SignIn");
    } else if (Role === null || Role === "Customer" || Role === undefined) {
      GetAllFoodData();
    } else {
      navigate("/SignIn");
    }
  }, [Role]);
  return (
    <>
      <div className={style.main}>
        <div className={style.head}>
          <p>Order your Food</p>
        </div>
        <div className={style.search}>
          <input
            type="search"
            className="w-1vw"
            name=""
            id=""
            placeholder="Search your Food"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-red-200">
        <div className="container mx-auto ">
          {categoryData != [] ? (
            categoryData.map((data) => {
              return (
                <>
                  <div className="text-lg">
                    <div key={data._id} className="font-bold text-2xl pt-3 mb-5 text-center">
                      {data.categoryName}
                    </div>
                    <hr></hr>
                    <div className="grid grid-cols-3 gap-5 mt-7">
                      {FoodData != [] ? (
                        FoodData.filter(
                          (item) =>
                            item.category === data.categoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        ).map((filteritem) => {
                          return (
                            <Card key={filteritem._id} Food={filteritem}></Card>
                          );
                        })
                      ) : (
                        <div>
                          <p>no</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div>
              <p>no</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
