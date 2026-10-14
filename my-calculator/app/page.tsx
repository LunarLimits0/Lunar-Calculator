import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans">
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Multi-Functional Calculator
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-md">Select a tool to get started.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
          <Link href="/calculator" className="p-4 bg-slate-900 border border-slate-800 hover:border-blue-500 rounded-xl transition-colors font-bold text-lg">Arithmetic</Link>
          <Link href="/trigonometry" className="p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500 rounded-xl transition-colors font-bold text-lg">Trigonometry</Link>
          <Link href="/shapes" className="p-4 bg-slate-900 border border-slate-800 hover:border-purple-500 rounded-xl transition-colors font-bold text-lg">Shapes</Link>
          <Link href="/roots" className="p-4 bg-slate-900 border border-slate-800 hover:border-orange-500 rounded-xl transition-colors font-bold text-lg">Roots & Powers</Link>
          <Link href="/random" className="p-4 bg-slate-900 border border-slate-800 hover:border-pink-500 rounded-xl transition-colors font-bold text-lg sm:col-span-2">Randomizer</Link>
        </div>
      </main>

      {/* Developer Footer */}
      <footer className="w-full bg-slate-900 border-t border-slate-800 py-6 flex flex-col items-center">
        <p className="text-slate-400 text-sm mb-3">Developed by <span className="text-white font-bold">Himanshu Shekhar / LunarLimits0</span></p>
        <div className="flex gap-6 text-sm">
          <a href="https://discord.gg/kQ7bCDAFQ" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#5865F2]">Discord</a>
          <a href="mailto:himanshu20119567@gmail.com" className="text-slate-400 hover:text-red-400">Email Me</a>
        </div>
      </footer>
    </div>
  );
}