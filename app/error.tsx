"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[48px] text-ink uppercase font-black mb-4">
          System Error
        </h1>
        <p className="font-mono text-[11px] text-muted uppercase tracking-widest mb-8">
          {error.digest ?? "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="group relative border border-border bg-bg px-8 py-3 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-ink hover:text-bg"
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-ink" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-ink" />
          Retry
        </button>
      </div>
    </div>
  );
}
