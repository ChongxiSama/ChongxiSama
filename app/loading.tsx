export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-paper/70 border-t-transparent" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-paper/60">
          Loading...
        </span>
      </div>
    </div>
  );
}
