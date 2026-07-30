export default function Loading() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-[11px] text-muted uppercase tracking-widest">
          Loading...
        </span>
      </div>
    </div>
  );
}
