"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Randomizer() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [items, setItems] = useState("");
  const [res, setRes] = useState("");

  const genNum = () => {
    let a = parseInt(min), b = parseInt(max);
    if (isNaN(a) || isNaN(b)) return setRes("Enter valid limits");
    if (a > b) [a, b] = [b, a];
    setRes(Math.floor(Math.random() * (b - a + 1)) + a);
  };

  const genObj = () => {
    const arr = items.split(" ").filter(i => i);
    if (arr.length === 0) return setRes("Enter items");
    setRes(arr[Math.floor(Math.random() * arr.length)]);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <Link href="/" className="absolute top-6 left-6 px-4 py-2 bg-slate-800 rounded-lg text-sm">← Back</Link>
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Randomizer</h2>
        
        <div className="p-4 border border-slate-800 rounded-lg flex flex-col gap-2">
          <h3 className="font-bold">Random Number</h3>
          <div className="flex gap-2">
            <input type="number" placeholder="Min" onChange={(e)=>setMin(e.target.value)} className="w-1/2 p-2 bg-slate-950 border border-slate-700 rounded" />
            <input type="number" placeholder="Max" onChange={(e)=>setMax(e.target.value)} className="w-1/2 p-2 bg-slate-950 border border-slate-700 rounded" />
          </div>
          <button onClick={genNum} className="p-2 bg-pink-600 rounded font-bold">Gen Number</button>
        </div>

        <div className="p-4 border border-slate-800 rounded-lg flex flex-col gap-2">
          <h3 className="font-bold">Random Object</h3>
          <input type="text" placeholder="Items separated by space" onChange={(e)=>setItems(e.target.value)} className="p-2 bg-slate-950 border border-slate-700 rounded" />
          <button onClick={genObj} className="p-2 bg-pink-600 rounded font-bold">Pick Item</button>
        </div>

        {res !== "" && <div className="p-4 bg-slate-800 text-center font-bold rounded-lg text-pink-400">Result: {res}</div>}
      </div>
    </div>
  );
}