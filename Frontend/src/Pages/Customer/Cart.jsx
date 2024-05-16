import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
function Cart() {
  let email = localStorage.getItem("email");
  const [cart, setcart] = useState([]);
  // if (!cart && cart.length == 0) {
  //   return (
  //     <div className="flex flex-col items-center justify-center">
  //       <h1 className="text-3xl mt-20 p-10 font-bold">Cart is empty!</h1>
  //     </div>
  //   );
  // }
  const handledelete = (index) => {
    const newcart = [...cart];
    newcart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newcart));
    setcart(newcart);
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      // settoken(localStorage.getItem("authtoken"));
      setcart(cart);
    }
  }, []);
  const totalprice = cart.reduce((total, food) => total + food.Price, 0);

  const handlecheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/Order/checkout",
        {
          orderData: cart,
          email: email,
          orderDate: new Date().toDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = response.data;
      if (res.success) {
        localStorage.removeItem("cart");
        setcart([]);
      }
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mt-20 p-10 font-bold">Cart is empty!</h1>
        </div>
      ) : (
        <>
          <table className="rounded-2xl table-auto h-full w-4/6 mt-10 mb-32 border-separate border-spacing-2 bg-neutral-700 border text-white border-slate-500">
            <thead>
              <tr>
                <th className="border text-2xl border-slate-600">ID</th>
                <th className="border text-2xl border-slate-600">Name</th>
                <th className="border text-2xl border-slate-600">Quantity</th>
                <th className="border text-2xl border-slate-600">Price</th>
                <th className="border text-2xl border-slate-600">
                  Total Price
                </th>
                <th className="border text-2xl border-slate-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((val, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-slate-700">{index + 1}</td>
                  <td className="border border-slate-700">
                    {val.name.toUpperCase()}
                  </td>
                  <td className="border border-slate-700">{val.qty}</td>
                  <td className="border border-slate-700">
                    {val.Price / val.qty}
                  </td>
                  <td className="border border-slate-700">{val.Price}</td>
                  <td className="border border-slate-700">
                    <MdDelete onClick={() => handledelete(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 className="text-lg">Total: {totalprice}</h1>
          <button
            href="#"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlecheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
