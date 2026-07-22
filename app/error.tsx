"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#D6D0C2] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[48px] text-lt-ink uppercase font-black mb-4">
          System Error
        </h1>
        <p className="font-mono text-[11px] text-lt-muted uppercase tracking-widest mb-8">
          {error.digest ?? "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="group relative border border-lt-border bg-lt-bg px-8 py-3 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg"
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink" />
          Retry
        </button>
      </div>
    </div>
  );
}
