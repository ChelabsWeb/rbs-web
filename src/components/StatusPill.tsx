interface StatusPillProps {
  status: "estreno" | "catalogo" | "archivo";
}

const colors = {
  estreno: "bg-emerald-500/20 text-emerald-300",
  catalogo: "bg-sky-500/20 text-sky-300",
  archivo: "bg-zinc-500/20 text-zinc-200",
} as const;

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-wide ${colors[status]}`}
    >
      {status}
    </span>
  );
}
