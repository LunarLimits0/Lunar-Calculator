"use client";

import { useState } from "react";
import CalculatorPage from "../components/CalculatorPage";

type Operation = "add" | "subtract" | "multiply" | "divide";

const inputClassName =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20";
const labelClassName = "block text-sm font-medium text-slate-300";

export default function ArithmeticCalculatorPage() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operation, setOperation] = useState<Operation>("add");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    const first = Number(number1);
    const second = Number(number2);

    if (!number1.trim() || !number2.trim() || !Number.isFinite(first) || !Number.isFinite(second)) {
      setResult(null);
      setError("Enter a valid number in both fields.");
      return;
    }

    if (operation === "divide" && second === 0) {
      setResult(null);
      setError("Division by zero is undefined. Enter a non-zero second number.");
      return;
    }

    const value =
      operation === "add"
        ? first + second
        : operation === "subtract"
          ? first - second
          : operation === "multiply"
            ? first * second
            : first / second;

    setError(null);
    setResult(Number.isFinite(value) ? String(value) : "The result is outside the supported range.");
  }

  return (
    <CalculatorPage
      title="Arithmetic Calculator"
      description="Perform the four basic operations on two numbers."
    >
      <div className="space-y-5">
        <label className={labelClassName}>
          Number 1
          <input
            type="number"
            step="any"
            value={number1}
            onChange={(event) => setNumber1(event.target.value)}
            placeholder="Enter the first number"
            className={inputClassName}
          />
        </label>
        <label className={labelClassName}>
          Number 2
          <input
            type="number"
            step="any"
            value={number2}
            onChange={(event) => setNumber2(event.target.value)}
            placeholder="Enter the second number"
            className={inputClassName}
          />
        </label>
        <label className={labelClassName}>
          Operation
          <select
            value={operation}
            onChange={(event) => setOperation(event.target.value as Operation)}
            className={inputClassName}
          >
            <option value="add">Addition</option>
            <option value="subtract">Subtraction</option>
            <option value="multiply">Multiplication</option>
            <option value="divide">Division</option>
          </select>
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
