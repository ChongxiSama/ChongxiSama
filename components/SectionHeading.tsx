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
    <h2 id={id} className="flex items-baseline gap-2">
      <span className="font-mono text-[10px] tabular-nums text-muted">{index}</span>
      <span className="deco text-[9px] text-muted">{`// ${title}`}</span>
    </h2>
  );
}
