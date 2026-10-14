"use client"; 

import { useState } from 'react';
import Link from 'next/link';

export default function TrigonometryCalculator() {
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState("rad_to_deg");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const val = parseFloat(inputValue);

    if (isNaN(val)) {
      setResult("Please enter a valid number.");
      return;
    }

    let res;
    // Helper to convert degrees to radians for the trig functions
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    switch (operation) {
      case "rad_to_deg": 
        res = val * (180 / Math.PI); 
        break;
      case "deg_to_rad": 
        res = toRadians(val); 
        break;
      case "sin": 
        res = Math.sin(toRadians(val)); 
        break;
      case "cos": 
        res = Math.cos(toRadians(val)); 
        break;
      case "tan": 
        res = Math.tan(toRadians(val)); 
        break;
      case "cot": 
        res = 1 / Math.tan(toRadians(val)); 
        break;
      case "csc": 
        res = 1 / Math.sin(toRadians(val)); 
        break;
      case "sec": 
        res = 1 / Math.cos(toRadians(val)); 
        break;
      default: 
        res = "Invalid Operation";
    }

    // Format to 4 decimal places for cleaner UI if it's a number
    setResult(typeof res === 'number' ? parseFloat(res.toFixed(4)) : res);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-200">
      
      <div className="absolute top-6 left-6">
        <Link href="/">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
             ← Back to Home
          </button>
        </Link>
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Trigonometry</h2>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col text-sm text-slate-400">
            Operation Type
            <select 
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:border-blue-500 focus:outline-none text-white"
            >
              <option value="rad_to_deg">Radians to Degrees</option>
              <option value="deg_to_rad">Degrees to Radians</option>
              <option value="sin">Sine (sin)</option>
              <option value="cos">Cosine (cos)</option>
              <option value="tan">Tangent (tan)</option>
              <option value="cot">Cotangent (cot)</option>
              <option value="csc">Cosecant (csc)</option>
              <option value="sec">Secant (sec)</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-slate-400">
            Input Value (Angle)
            <input 
              type="number" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:border-blue-500 focus:outline-none text-white"
              placeholder="Enter angle or value"
            />
          </label>

          <button 
            onClick={handleCalculate}
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-4 p-4 rounded-lg bg-slate-800 border border-slate-700 text-center">
              <span className="text-sm text-slate-400 block mb-1">Result:</span>
              <span className="text-2xl font-bold text-blue-400">{result}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}