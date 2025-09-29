interface CreditsListProps {
  credits?: Array<{ role: string; name: string }>;
}

export function CreditsList({ credits }: CreditsListProps) {
  const data = credits ?? [
    { role: "Direccion", name: "Por confirmar" },
    { role: "Guion", name: "Por confirmar" },
    { role: "Elenco", name: "Pendiente" },
  ];

  return (
    <dl className="grid gap-4 text-sm">
      {data.map((item) => (
        <div
          key={`${item.role}-${item.name}`}
          className="rounded-2xl border border-glass-cinema-outline bg-glass-cinema-surface px-5 py-4"
        >
          <dt className="text-glass-cinema-text-muted">{item.role}</dt>
          <dd className="text-glass-cinema-text">{item.name}</dd>
        </div>
      ))}
    </dl>
  );
}
