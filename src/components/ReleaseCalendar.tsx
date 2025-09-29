interface ReleaseCalendarItem {
  title: string;
  date: string;
}

interface ReleaseCalendarProps {
  items?: ReleaseCalendarItem[];
}

export function ReleaseCalendar({ items }: ReleaseCalendarProps) {
  const data =
    items ??
    Array.from({ length: 4 }, (_, index) => ({
      title: `Estreno pendiente ${index + 1}`,
      date: "Fecha por confirmar",
    }));

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.title}
          className="flex items-center justify-between rounded-2xl border border-glass-cinema-outline bg-glass-cinema-surface px-5 py-4 text-sm text-glass-cinema-text"
        >
          <span>{item.title}</span>
          <span className="text-glass-cinema-text-muted">{item.date}</span>
        </div>
      ))}
    </div>
  );
}
