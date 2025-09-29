interface StudioChipProps {
  name: string;
}

export function StudioChip({ name }: StudioChipProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-glass-cinema-outline bg-glass-cinema-surface px-4 py-2 text-sm text-glass-cinema-text">
      <span className="h-2.5 w-2.5 rounded-full bg-glass-cinema-primary" />
      {name}
    </span>
  );
}
