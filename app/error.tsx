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
        <h1 className="text-[48px] font-bold uppercase leading-none text-on-shell">
          System Error
        </h1>
        <p className="deco mb-8 mt-4 text-[9px] text-on-shell/60">
          {error.digest ?? "An unexpected error occurred"}
        </p>
        <button
          type="button"
          onClick={reset}
          className="deco border border-on-shell px-8 py-3 text-[10px] font-bold text-on-shell transition-colors hover:bg-on-shell hover:text-shell"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
