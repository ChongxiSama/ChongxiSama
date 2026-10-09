export default function SectionHeading({
  id,
  index,
  title,
  meta,
}: {
  id?: string;
  index: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-carbon pb-2 mb-4">
      <h2 id={id} className="text-xs font-bold uppercase tracking-wider">
        {index} / {title}
      </h2>
      {meta && <span className="text-[10px] uppercase tracking-wider text-muted">{meta}</span>}
    </div>
  );
}
