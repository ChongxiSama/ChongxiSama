export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-on-shell/70 border-t-transparent" />
        <span className="deco text-[9px] text-on-shell/60">Loading...</span>
      </div>
    </div>
  );
}
