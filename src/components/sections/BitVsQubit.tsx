// The idea behind the name in two cards: a bit is one value, a qubit holds both.
export function BitVsQubit({
  bit,
  qubit,
}: {
  bit: { label: string; value: string };
  qubit: { label: string; value: string };
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[bit, qubit].map((card, i) => (
        <div
          key={card.label}
          className="flex flex-col gap-10 rounded-3xl border border-line bg-surface/70 p-6"
        >
          <span className="text-sm text-muted">{card.label}</span>
          <span
            className={
              'text-4xl font-medium tracking-tight ' + (i === 1 ? 'text-gradient' : 'text-fg')
            }
          >
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
}
