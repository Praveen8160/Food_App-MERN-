import React from "react";

function Card() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-28">
      <img
        className="w-full"
        src="https://via.placeholder.com/300"
        alt="Placeholder"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Card title</div>
        <p className="text-gray-700 text-base">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <div className="px-6 py-4">
        <select className="m-2 w-16 rounded border-none">
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>
        <select className="m-2 w-16 rounded">
          <option value="half">Half</option>
          <option value="Full">Full</option>
        </select>
        <a
          href="#"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default Card;
