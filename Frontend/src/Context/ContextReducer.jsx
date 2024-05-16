import React, { createContext, useReducer } from "react";

export const CartstateContext = createContext();
export const cartDispatchContext = createContext();
// {
//   cart: [],
//   add: () => {},
//   delete: () => {},
//   update: () => {},
// }

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      //   console.log(action.payload);
      const newcart = [...state, action.payload];
      console.log(newcart);
      return newcart;
  }
};
export const ContextReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <CartstateContext.Provider value={state}>
        {children}
      </CartstateContext.Provider>
    </cartDispatchContext.Provider>
  );
};
