import React, { createContext, useReducer, useState } from "react";

export const cartcount = createContext();
// export const cartDispatchContext = createContext();
// {
//   cart: [],
//   add: () => {},
//   delete: () => {},
//   update: () => {},
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "add":
//       //   console.log(action.payload);
//       const newcart = [...state, action.payload];
//       console.log(newcart);
//       return newcart;
//   }
// };
export const CartProvider = ({ children }) => {
  if (JSON.parse(localStorage.getItem("cart"))) {
    var cartval = JSON.parse(localStorage.getItem("cart")).length;
  } else {
    var cartval = 0;
  }
  const [count, setcount] = useState(cartval);
  return (
    <cartcount.Provider value={{ count, setcount }}>
      {children}
    </cartcount.Provider>
  );
};
