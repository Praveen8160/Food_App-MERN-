import React from "react";

function Card(props) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-28">
      <img className="w-full" src={props.Food.Image} alt={props.Food.Image} style={{height:"280px",objectFit:"cover"}} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{props.Food.name}</div>
        <p className="text-gray-700 text-base">
         {props.Food.description}
        </p>
      </div>
      <div className="px-6 py-4">
        <select className="w-full bg-blue-100 h-7 mb-3 rounded border-none">
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>
        <h1 className="mb-3">Total Price:3838</h1>
        {/* <select className="m-2 w-16 rounded">
          <option value="half">Half</option>
          <option value="Full">Full</option>
        </select> */}
        <button
          href="#"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go somewhere
        </button>
      </div>
    </div>
  );
}

export default Card;
