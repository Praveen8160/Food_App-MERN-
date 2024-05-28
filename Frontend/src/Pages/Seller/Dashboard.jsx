import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-center flex-row items-center gap-48 mt-10">
        <div className="h-60 rounded-3xl bg-zinc-600 w-80">
          <h1 className="text-2xl font-bold text-center mt-10">Total Order</h1>
          <h1 className="text-6xl font-bold text-center mt-10">30</h1>
        </div>
        <div className="h-60 rounded-3xl bg-zinc-600 w-80">
          <h1 className="text-2xl font-bold text-center mt-10">Total Payment</h1>
          <h1 className="text-6xl font-bold text-center mt-10">3000</h1>
        </div>
        <div className="h-60 rounded-3xl bg-zinc-600 w-80">
          <h1 className="text-2xl font-bold text-center mt-10">Panding Order</h1>
          <h1 className="text-6xl font-bold text-center mt-10">30</h1>
        </div>
      </div>
    </>
  );
}
