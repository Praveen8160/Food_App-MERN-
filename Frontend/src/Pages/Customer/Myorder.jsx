import React, { useEffect, useState } from "react";
import axios from "axios";
function Myorder() {
  const [order, setorder] = useState([]);
  const getAllOrder = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/Order/myorder",
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = res.data;
      if (response.success == true) {
        setorder(response.order.reverse());
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getAllOrder();
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen bg-red-200">
      {order == 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mt-20 p-10 font-bold">Order your Food</h1>
        </div>
      ) : (
        order.reverse().map((allorder) =>
          allorder.map((item) => {
            if (item.orderDate) {
              return (
                <div className="mt-10 text-center">
                  <h1 className="text-4xl font-bold">{item.orderDate}</h1>
                  <hr />
                </div>
              );
            } else {
              return (
                <table className="rounded-2xl table-auto p-5 mt-5 border-separate border-spacing-2 bg-red-300 border text-white border-slate-500 ">
                  <thead>
                    <tr>
                      <th className="border text-2xl rounded-md p-2 border-slate-600">
                        Name
                      </th>
                      <th className="border text-2xl rounded-md p-2 border-slate-600">
                        Quantity
                      </th>
                      <th className="border text-2xl rounded-md p-2 border-slate-600">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="border rounded-md p-2 border-slate-700">{item.name}</td>
                      <td className="border rounded-md p-2 border-slate-700">{item.qty}</td>
                      <td className="border rounded-md p-2 border-slate-700">{item.Price}</td>
                    </tr>
                  </tbody>
                </table>
              );
            }
          })
        )
      )}
    </div>
  );
}

export default Myorder;
