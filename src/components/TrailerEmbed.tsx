interface TrailerEmbedProps {
  videoUrl?: string;
}

export function TrailerEmbed({ videoUrl }: TrailerEmbedProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-3xl border border-glass-cinema-outline bg-black/70">
      {videoUrl ? (
        <iframe
          src={videoUrl}
          title="Trailer oficial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-glass-cinema-text-muted">
          Video pendiente de carga
        </div>
      )}
    </div>
  );
}
