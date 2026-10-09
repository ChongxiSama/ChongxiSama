"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-[48px] font-bold uppercase leading-none text-paper">System Error</h1>
        <p className="mb-8 mt-4 font-mono text-[11px] uppercase tracking-widest text-paper/60">
          {error.digest ?? "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="border border-paper px-8 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-paper transition-colors hover:bg-paper hover:text-carbon"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
