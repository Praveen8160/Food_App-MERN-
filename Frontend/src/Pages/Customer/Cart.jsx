import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { cartcount } from "../../Context/CartProvider";
import { useNavigate } from "react-router";

function Cart() {
  const navigate = useNavigate();
  const { count, setcount } = useContext(cartcount);
  const [cart, setcart] = useState([]);
  const handledelete = (index) => {
    const newcart = [...cart];
    newcart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newcart));
    setcart(newcart);
    setcount(count - 1);
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
      const {
        data: { key },
      } = await axios.get("http://localhost:5000/Order/rozarpatKey");
      const paymentresponse = await axios.post(
        "http://localhost:5000/Order/payment",
        {
          amount: totalprice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = paymentresponse.data;
      console.log("res1", res);
      var options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: res.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Food Delivery",
        description: "Total payment",
        image: "https://example.com/your_logo",
        order_id: res.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:5000/Order/paymentverify",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response) {
          // Product details to be sent along with the verification request
          const productDetails = {
            orderData: cart,
            orderDate: new Date().toDateString(),
          };
          try {
            // Send the response and product details to your backend for verification
            const re = await axios.post(
              "http://localhost:5000/Order/checkout",
              {
                ...response,
                ...productDetails,
              },{ withCredentials: true },
            );
            const respo = re.data;
            if (respo.success) {
              localStorage.removeItem("cart");
              setcart([]);
              setcount(0);
              navigate("/Myorder");
            }
          } catch (error) {
            console.log("error");
            console.log("Payment verification error", error);
          }
        },
      };
      var rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("error", error);
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
