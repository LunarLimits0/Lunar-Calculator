"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Shapes() {
  const [shape, setShape] = useState("Square");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [result, setResult] = useState("");

  const calcShape = () => {
    const v1 = parseFloat(val1) || 0;
    const v2 = parseFloat(val2) || 0;
    const v3 = parseFloat(val3) || 0;
    
    if (shape === "Square") setResult(`Area: ${v1*v1} m², Perimeter: ${v1*4} m`);
    else if (shape === "Rectangle") setResult(`Area: ${v1*v2} m², Perimeter: ${2*(v1+v2)} m`);
    else if (shape === "Circle") setResult(`Area: ${(Math.PI*v1*v1).toFixed(2)}, Circumference: ${(2*Math.PI*v1).toFixed(2)}`);
    else if (shape === "Cube") setResult(`Volume: ${Math.pow(v1,3)}, Surface Area: ${6*v1*v1}`);
    else if (shape === "Cuboid") setResult(`Volume: ${v1*v2*v3}, Surface Area: ${2*(v1*v2 + v2*v3 + v3*v1)}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <Link href="/" className="absolute top-6 left-6 px-4 py-2 bg-slate-800 rounded-lg text-sm">← Back</Link>
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Shapes</h2>
        <select value={shape} onChange={(e) => setShape(e.target.value)} className="p-3 bg-slate-950 border border-slate-700 rounded-lg">
          <option>Square</option><option>Rectangle</option><option>Circle</option><option>Cube</option><option>Cuboid</option>
        </select>
        <input type="number" placeholder="Value 1 (Side/Radius/Length)" onChange={(e) => setVal1(e.target.value)} className="p-3 bg-slate-950 border border-slate-700 rounded-lg" />
        {(shape === "Rectangle" || shape === "Cuboid") && <input type="number" placeholder="Value 2 (Width)" onChange={(e) => setVal2(e.target.value)} className="p-3 bg-slate-950 border border-slate-700 rounded-lg" />}
        {shape === "Cuboid" && <input type="number" placeholder="Value 3 (Height)" onChange={(e) => setVal3(e.target.value)} className="p-3 bg-slate-950 border border-slate-700 rounded-lg" />}
        <button onClick={calcShape} className="p-3 bg-purple-600 rounded-lg font-bold">Calculate</button>
        {result && <div className="p-4 bg-slate-800 text-center font-bold rounded-lg text-purple-400">{result}</div>}
      </div>
    </div>
  );
}