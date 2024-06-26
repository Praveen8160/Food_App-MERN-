import React, { useContext, useEffect, useState } from "react";
import { cartcount } from "../Context/CartProvider";
function Card(props) {
  const { count, setcount } = useContext(cartcount);
  const [value, setvalue] = useState([]);
  const [qty, setqty] = useState(1);
  const handlecart = async () => {
    let food = [];
    for (const item of value) {
      if (item.id === props.Food._id) {
        food = item;
        break;
      }
    }
    if (food.length == 0) {
      console.log("insert");
      const newvalues = {
        id: props.Food._id,
        name: props.Food.name,
        Price: props.Food.price * qty,
        qty,
        Seller: props.Food.seller,
      };
      setvalue([...value, newvalues]);
      localStorage.setItem("cart", JSON.stringify([...value, newvalues]));
      setcount(count + 1);
    } else {
      console.log("update");
      const newcart = value.map((val) => {
        if (val.id === food.id) {
          return {
            ...val,
            qty: parseInt(val.qty) + parseInt(qty),
            Price: val.Price + props.Food.price * qty,
          };
        } else {
          return { ...val };
        }
      });
      setvalue(newcart);
      localStorage.setItem("cart", JSON.stringify(newcart));
    }
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && cart.length > 0) {
      setvalue(cart);
    }
  }, []);

  return (
    <div className="max-w-sm rounded-t-full overflow-hidden bg-red-300 shadow-2xl shadow-red-400 mb-28">
      <img
        className="w-full"
        src={props.Food.Image}
        alt={props.Food.Image}
        style={{ height: "280px", objectFit: "cover" }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{props.Food.name}</div>
        <p className="text-gray-700 text-base">{props.Food.description}</p>
      </div>
      <div className="px-6 py-4">
        <select
          className="w-full bg-blue-100 h-7 mb-3 rounded border-none"
          onChange={(e) => setqty(e.target.value)}
        >
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>
        <h1 className="mb-3">{props.Food.price * qty}</h1>
        {/* <select className="m-2 w-16 rounded">
          <option value="half">Half</option>
          <option value="Full">Full</option>
        </select> */}
        <button
          href="#"
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={handlecart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
