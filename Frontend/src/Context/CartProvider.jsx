import React, { createContext, useReducer, useState } from "react";

export const cartcount = createContext();
export const CartProvider = ({ children }) => {
  const cartval = JSON.parse(localStorage.getItem("cart"))?.length || 0;
  const [count, setcount] = useState(cartval);
  return (
    <cartcount.Provider value={{ count, setcount }}>
      {children}
    </cartcount.Provider>
  );
};
