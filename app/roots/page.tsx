"use client";

import { useState } from "react";
import CalculatorPage from "../components/CalculatorPage";

type Operation = "square-root" | "square";

const inputClassName =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20";
const labelClassName = "block text-sm font-medium text-slate-300";

export default function RootsCalculatorPage() {
  const [value, setValue] = useState("");
  const [operation, setOperation] = useState<Operation>("square-root");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    const input = Number(value);

    if (!value.trim() || !Number.isFinite(input)) {
      setResult(null);
      setError("Enter a valid number.");
      return;
    }
    if (operation === "square-root" && input < 0) {
      setResult(null);
      setError("A real square root cannot be calculated for a negative number.");
      return;
    }

    const answer = operation === "square-root" ? Math.sqrt(input) : input ** 2;
    setError(null);
    setResult(
      Number.isFinite(answer)
        ? String(answer)
        : "The result is outside the supported range.",
    );
  }

  return (
    <CalculatorPage
      title="Roots & Powers"
      description="Find the square root or square of a number."
    >
      <div className="space-y-5">
        <label className={labelClassName}>
          Operation
          <select
            value={operation}
            onChange={(event) => setOperation(event.target.value as Operation)}
            className={inputClassName}
          >
            <option value="square-root">Square Root</option>
            <option value="square">Square</option>
          </select>
        </label>
        <label className={labelClassName}>
          Number
          <input
            type="number"
            step="any"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter a number"
            className={inputClassName}
          />
        </label>
        <button
          type="button"
          onClick={calculate}
          className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
        >
          Calculate
        </button>
        {error && (
          <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            {error}
          </p>
        )}
        {result !== null && (
          <p aria-live="polite" className="rounded-lg border border-slate-700 bg-slate-950 p-4 text-slate-200">
            <span className="font-medium text-slate-400">Result: </span>
            {result}
          </p>
        )}
      </div>
    </CalculatorPage>
  );
}
