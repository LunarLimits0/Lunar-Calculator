"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Roots() {
  const [num, setNum] = useState("");
  const [op, setOp] = useState("sqrt");
  const [res, setRes] = useState("");

  const calc = () => {
    const val = parseFloat(num);
    if (isNaN(val)) return setRes("Enter a number");
    if (op === "sqrt") setRes(val < 0 ? "No negative roots" : Math.sqrt(val));
    else setRes(Math.pow(val, 2));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <Link href="/" className="absolute top-6 left-6 px-4 py-2 bg-slate-800 rounded-lg text-sm">← Back</Link>
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Roots & Powers</h2>
        <select value={op} onChange={(e) => setOp(e.target.value)} className="p-3 bg-slate-950 border border-slate-700 rounded-lg">
          <option value="sqrt">Square Root</option><option value="sq">Square</option>
        </select>
        <input type="number" placeholder="Enter Number" onChange={(e) => setNum(e.target.value)} className="p-3 bg-slate-950 border border-slate-700 rounded-lg" />
        <button onClick={calc} className="p-3 bg-orange-600 rounded-lg font-bold">Calculate</button>
        {res !== "" && <div className="p-4 bg-slate-800 text-center font-bold rounded-lg text-orange-400">{res}</div>}
      </div>
    </div>
  );
}