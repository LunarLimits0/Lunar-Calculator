"use client";

import { useState } from "react";
import CalculatorPage from "../components/CalculatorPage";

type Shape = "square" | "rectangle" | "circle" | "cube" | "cuboid";
type Dimension = "side" | "length" | "width" | "height" | "radius";

const inputClassName =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20";
const labelClassName = "block text-sm font-medium text-slate-300";

const dimensions: Record<Shape, Dimension[]> = {
  square: ["side"],
  rectangle: ["length", "width"],
  circle: ["radius"],
  cube: ["side"],
  cuboid: ["length", "width", "height"],
};

const dimensionLabels: Record<Dimension, string> = {
  side: "Side",
  length: "Length",
  width: "Width",
  height: "Height",
  radius: "Radius",
};

export default function ShapesCalculatorPage() {
  const [shape, setShape] = useState<Shape>("square");
  const [values, setValues] = useState<Record<Dimension, string>>({
    side: "",
    length: "",
    width: "",
    height: "",
    radius: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    const requiredDimensions = dimensions[shape];
    const entered = requiredDimensions.map((dimension) => Number(values[dimension]));

    if (
      requiredDimensions.some((dimension) => {
        const rawValue = values[dimension];
        const value = Number(rawValue);
        return !rawValue.trim() || !Number.isFinite(value) || value < 0;
      })
    ) {
      setResult(null);
      setError("Enter a valid, non-negative value for each dimension.");
      return;
    }

    let measurements: [string, number, string, number];
    if (shape === "square") {
      const [side] = entered;
      measurements = ["Area", side * side, "Perimeter", 4 * side];
    } else if (shape === "rectangle") {
      const [length, width] = entered;
      measurements = [
        "Area",
        length * width,
        "Perimeter",
        2 * (length + width),
      ];
    } else if (shape === "circle") {
      const [radius] = entered;
      measurements = [
        "Area",
        Math.PI * radius * radius,
        "Circumference",
        2 * Math.PI * radius,
      ];
    } else if (shape === "cube") {
      const [side] = entered;
      measurements = ["Volume", side ** 3, "Surface area", 6 * side * side];
    } else {
      const [length, width, height] = entered;
      measurements = [
        "Volume",
        length * width * height,
        "Surface area",
        2 * (length * width + length * height + width * height),
      ];
    }

    if (![measurements[1], measurements[3]].every(Number.isFinite)) {
      setResult(null);
      setError("The dimensions are too large to calculate safely.");
      return;
    }

    setError(null);
    setResult(
      `${measurements[0]}: ${measurements[1]}  ·  ${measurements[2]}: ${measurements[3]}`,
    );
  }

  return (
    <CalculatorPage
      title="Shapes Calculator"
      description="Calculate measurements for common two- and three-dimensional shapes."
    >
      <div className="space-y-5">
        <label className={labelClassName}>
          Shape
          <select
            value={shape}
            onChange={(event) => setShape(event.target.value as Shape)}
            className={inputClassName}
          >
            <option value="square">Square</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="cube">Cube</option>
            <option value="cuboid">Cuboid</option>
          </select>
        </label>
        {dimensions[shape].map((dimension) => (
          <label key={dimension} className={labelClassName}>
            {dimensionLabels[dimension]}
            <input
              type="number"
              step="any"
              min="0"
              value={values[dimension]}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [dimension]: event.target.value,
                }))
              }
              placeholder={`Enter ${dimensionLabels[dimension].toLowerCase()}`}
              className={inputClassName}
            />
          </label>
        ))}
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
            {result}
          </p>
        )}
      </div>
    </CalculatorPage>
  );
}
