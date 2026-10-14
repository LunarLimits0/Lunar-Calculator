import type { ReactNode } from "react";
import Link from "next/link";

type CalculatorPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function CalculatorPage({
  title,
  description,
  children,
}: CalculatorPageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/"
        className="mb-10 w-fit rounded-lg text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
      >
        ← Back to Home
      </Link>
      <section className="my-auto w-full rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-9">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
