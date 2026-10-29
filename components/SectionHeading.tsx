export default function SectionHeading({
  id,
  index,
  title,
}: {
  id?: string;
  index: string;
  title: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <span aria-hidden="true" className="flex shrink-0 items-baseline gap-2">
        <span className="font-mono text-[10px] tabular-nums text-muted">{index}</span>
        <span className="deco text-[9px] text-muted">{"//"}</span>
      </span>
      <h2 id={id} className="deco shrink-0 text-[9px] text-muted">
        {title}
      </h2>
      <span className="h-px flex-1 bg-carbon/15" aria-hidden="true" />
    </div>
  );
}
