"use client";

import { useState } from "react";
import CalculatorPage from "../components/CalculatorPage";

type Operation =
  | "radians-to-degrees"
  | "degrees-to-radians"
  | "sine"
  | "cosine"
  | "tangent"
  | "cotangent"
  | "cosecant"
  | "secant";

const inputClassName =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20";
const labelClassName = "block text-sm font-medium text-slate-300";

function formatResult(value: number) {
  return String(Number(value.toPrecision(12)));
}

export default function TrigonometryPage() {
  const [value, setValue] = useState("");
  const [operation, setOperation] = useState<Operation>("sine");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function showResult(answer: number) {
    if (!Number.isFinite(answer)) {
      setResult(null);
      setError("The result is outside the supported range.");
      return;
    }

    setError(null);
    setResult(formatResult(answer));
  }

  function calculate() {
    const input = Number(value);

    if (!value.trim() || !Number.isFinite(input)) {
      setResult(null);
      setError("Enter a valid angle or value.");
      return;
    }

    if (operation === "radians-to-degrees") {
      showResult((input * 180) / Math.PI);
      return;
    }
    if (operation === "degrees-to-radians") {
      showResult((input * Math.PI) / 180);
      return;
    }

    const radians = (input * Math.PI) / 180;
    const sine = Math.sin(radians);
    const cosine = Math.cos(radians);

    if (
      (operation === "tangent" || operation === "secant") &&
      Math.abs(cosine) < 1e-12
    ) {
      setResult(null);
      setError("This function is undefined for the entered angle.");
      return;
    }
    if (
      (operation === "cotangent" || operation === "cosecant") &&
      Math.abs(sine) < 1e-12
    ) {
      setResult(null);
      setError("This function is undefined for the entered angle.");
      return;
    }

    const answer =
      operation === "sine"
        ? sine
        : operation === "cosine"
          ? cosine
          : operation === "tangent"
            ? sine / cosine
            : operation === "cotangent"
              ? cosine / sine
              : operation === "cosecant"
                ? 1 / sine
                : 1 / cosine;

    showResult(answer);
  }

  const conversionInput =
    operation === "radians-to-degrees"
      ? "Angle in radians"
      : operation === "degrees-to-radians"
        ? "Angle in degrees"
        : "Angle in degrees";

  return (
    <CalculatorPage
      title="Trigonometry Calculator"
      description="Convert between radians and degrees, or evaluate a trigonometric function using degrees."
    >
      <div className="space-y-5">
        <label className={labelClassName}>
          Operation
          <select
            value={operation}
            onChange={(event) => setOperation(event.target.value as Operation)}
            className={inputClassName}
          >
            <option value="radians-to-degrees">Radians to Degrees</option>
            <option value="degrees-to-radians">Degrees to Radians</option>
            <option value="sine">Sine (sin)</option>
            <option value="cosine">Cosine (cos)</option>
            <option value="tangent">Tangent (tan)</option>
            <option value="cotangent">Cotangent (cot)</option>
            <option value="cosecant">Cosecant (csc)</option>
            <option value="secant">Secant (sec)</option>
          </select>
        </label>
        <label className={labelClassName}>
          {conversionInput}
          <input
            type="number"
            step="any"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter a value"
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
