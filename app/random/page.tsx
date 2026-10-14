"use client";

import { useState } from "react";
import CalculatorPage from "../components/CalculatorPage";

const inputClassName =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20";
const labelClassName = "block text-sm font-medium text-slate-300";

export default function RandomizerPage() {
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [items, setItems] = useState("");
  const [numberResult, setNumberResult] = useState<number | null>(null);
  const [itemResult, setItemResult] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);
  const [itemError, setItemError] = useState<string | null>(null);

  function generateNumber() {
    const min = Number(minimum);
    const max = Number(maximum);

    if (
      !minimum.trim() ||
      !maximum.trim() ||
      !Number.isFinite(min) ||
      !Number.isFinite(max) ||
      min > max
    ) {
      setNumberResult(null);
      setNumberError("Enter valid minimum and maximum values, with minimum no greater than maximum.");
      return;
    }

    const firstInteger = Math.ceil(min);
    const lastInteger = Math.floor(max);
    if (firstInteger > lastInteger) {
      setNumberResult(null);
      setNumberError("The selected range does not contain any integers.");
      return;
    }

    const rangeSize = lastInteger - firstInteger + 1;
    if (
      !Number.isSafeInteger(firstInteger) ||
      !Number.isSafeInteger(lastInteger) ||
      !Number.isSafeInteger(rangeSize)
    ) {
      setNumberResult(null);
      setNumberError("Use a range that contains safely representable integers.");
      return;
    }

    setNumberError(null);
    setNumberResult(
      Math.floor(Math.random() * rangeSize) + firstInteger,
    );
  }

  function pickItem() {
    const choices = items.trim().split(/\s+/).filter(Boolean);

    if (choices.length === 0) {
      setItemResult(null);
      setItemError("Enter at least one item, separated by spaces.");
      return;
    }

    setItemError(null);
    setItemResult(choices[Math.floor(Math.random() * choices.length)]);
  }

  return (
    <CalculatorPage
      title="Randomizer"
      description="Generate an integer in a range or pick an item from your list."
    >
      <div className="space-y-8">
        <section aria-labelledby="random-number-heading" className="space-y-5">
          <div>
            <h2
              id="random-number-heading"
              className="text-lg font-semibold text-slate-100"
            >
              Random Number
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              The range may include decimal bounds; the result is an integer.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClassName}>
              Minimum
              <input
                type="number"
                step="any"
                value={minimum}
                onChange={(event) => setMinimum(event.target.value)}
                placeholder="Enter minimum"
                className={inputClassName}
              />
            </label>
            <label className={labelClassName}>
              Maximum
              <input
                type="number"
                step="any"
                value={maximum}
                onChange={(event) => setMaximum(event.target.value)}
                placeholder="Enter maximum"
                className={inputClassName}
              />
            </label>
          </div>
          <button
            type="button"
            onClick={generateNumber}
            className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
          >
            Generate Number
          </button>
          {numberError && (
            <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
              {numberError}
            </p>
          )}
          {numberResult !== null && (
            <p aria-live="polite" className="rounded-lg border border-slate-700 bg-slate-950 p-4 text-slate-200">
              <span className="font-medium text-slate-400">Random number: </span>
              {numberResult}
            </p>
          )}
        </section>

        <section
          aria-labelledby="random-item-heading"
          className="space-y-5 border-t border-slate-800 pt-7"
        >
          <div>
            <h2
              id="random-item-heading"
              className="text-lg font-semibold text-slate-100"
            >
              Random Object
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Separate each item with a space.
            </p>
          </div>
          <label className={labelClassName}>
            Items
            <input
              type="text"
              value={items}
              onChange={(event) => setItems(event.target.value)}
              placeholder="e.g. apple banana orange"
              className={inputClassName}
            />
          </label>
          <button
            type="button"
            onClick={pickItem}
            className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
          >
            Pick a Random Item
          </button>
          {itemError && (
            <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
              {itemError}
            </p>
          )}
          {itemResult !== null && (
            <p aria-live="polite" className="rounded-lg border border-slate-700 bg-slate-950 p-4 text-slate-200">
              <span className="font-medium text-slate-400">Selected item: </span>
              {itemResult}
            </p>
          )}
        </section>
      </div>
    </CalculatorPage>
  );
}
