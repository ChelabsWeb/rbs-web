"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type MouseEvent } from "react";

import type { Movie, MovieStatus } from "@/data/types";

const STATUS_OPTIONS: Array<{ value: MovieStatus; label: string }> = [
  { value: "in_theaters", label: "En cartelera" },
  { value: "upcoming", label: "Proximamente" },
  { value: "catalog", label: "Catalogo" },
];

function formatDateForInput(value?: string): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

interface MovieEditCardProps {
  movie: Movie;
}

export function MovieEditCard({ movie }: MovieEditCardProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (!formData.has("videosSubmission")) {
      formData.set("videosSubmission", "true");
    }

    try {
      const response = await fetch(`/api/movies/${movie.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const message = typeof payload.error === "string" ? payload.error : "Error al actualizar";
        throw new Error(message);
      }

      setSuccess("Cambios guardados");
      router.refresh();
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Error al actualizar la pelicula";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!window.confirm(`Eliminar "${movie.title}"? Esta accion es permanente.`)) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/movies/${movie.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const message = typeof payload.error === "string" ? payload.error : "No se pudo eliminar";
        throw new Error(message);
      }

      router.refresh();
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "No se pudo eliminar la pelicula";
      setError(message);
      setIsDeleting(false);
    }
  };

  const statusLabel = STATUS_OPTIONS.find((option) => option.value === movie.status)?.label ?? "Sin estado";

  return (
    <details className="overflow-hidden rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface shadow-glass">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.2em] text-glass-cinema-text-muted">{statusLabel}</p>
          <h3 className="font-display text-xl text-glass-cinema-text">{movie.title}</h3>
          <p className="text-xs text-glass-cinema-text-muted">Slug: {movie.slug}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-red-500 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
          <span className="text-sm text-glass-cinema-text-muted">Abrir para editar</span>
        </div>
      </summary>
      <form className="space-y-6 border-t border-glass-cinema-outline/60 px-6 py-6" onSubmit={handleUpdate} encType="multipart/form-data">
        <input type="hidden" name="videosSubmission" value="true" />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Titulo</span>
            <input
              name="title"
              defaultValue={movie.title}
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Slug</span>
            <input
              name="slug"
              defaultValue={movie.slug}
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Estudio</span>
            <input
              name="studio"
              defaultValue={movie.studio ?? ""}
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Genero</span>
            <input
              name="genre"
              defaultValue={movie.genre ?? ""}
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Fecha de estreno</span>
            <input
              type="date"
              name="releaseDate"
              defaultValue={formatDateForInput(movie.releaseDate)}
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Estado</span>
            <select
              name="status"
              defaultValue={movie.status ?? ""}
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            >
              <option value="">Sin definir</option>
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Duracion (minutos)</span>
            <input
              type="number"
              min="0"
              name="runtimeMinutes"
              defaultValue={movie.runtimeMinutes ?? ""}
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
          <span className="font-semibold">Sinopsis</span>
          <textarea
            name="synopsis"
            rows={4}
            defaultValue={movie.synopsis ?? ""}
            className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
          />
        </label>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
              <span className="font-semibold">Poster</span>
              {movie.posterUrl && (
                <a href={movie.posterUrl} target="_blank" rel="noreferrer" className="text-xs text-glass-cinema-primary underline">
                  Ver archivo actual
                </a>
              )}
              <input
                type="file"
                name="poster"
                accept="image/*"
                className="rounded-xl border border-dashed border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              />
              {movie.posterUrl && (
                <label className="flex items-center gap-2 text-xs text-glass-cinema-text-muted">
                  <input type="checkbox" name="removePoster" value="true" />
                  Eliminar poster existente
                </label>
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
              <span className="font-semibold">Banner</span>
              {movie.bannerUrl && (
                <a href={movie.bannerUrl} target="_blank" rel="noreferrer" className="text-xs text-glass-cinema-primary underline">
                  Ver archivo actual
                </a>
              )}
              <input
                type="file"
                name="banner"
                accept="image/*"
                className="rounded-xl border border-dashed border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              />
              {movie.bannerUrl && (
                <label className="flex items-center gap-2 text-xs text-glass-cinema-text-muted">
                  <input type="checkbox" name="removeBanner" value="true" />
                  Eliminar banner existente
                </label>
              )}
            </label>
          </div>
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
              <span className="font-semibold">Trailer (archivo)</span>
              {movie.trailerUrl && movie.trailerUrl.startsWith("/uploads/") && (
                <a href={movie.trailerUrl} target="_blank" rel="noreferrer" className="text-xs text-glass-cinema-primary underline">
                  Ver trailer actual
                </a>
              )}
              {!movie.trailerUrl && (
                <span className="text-xs text-glass-cinema-text-muted">Sin trailer cargado</span>
              )}
              <input
                type="file"
                name="trailerFile"
                accept="video/*"
                className="rounded-xl border border-dashed border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              />
              {movie.trailerUrl && (
                <label className="flex items-center gap-2 text-xs text-glass-cinema-text-muted">
                  <input type="checkbox" name="removeTrailer" value="true" />
                  Eliminar trailer actual
                </label>
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
              <span className="font-semibold">Trailer externo</span>
              <input
                type="url"
                name="trailerUrl"
                defaultValue={movie.trailerUrl && !movie.trailerUrl.startsWith("/uploads/") ? movie.trailerUrl : ""}
                className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
                placeholder="https://youtube.com/..."
              />
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-glass-cinema-text">Videos adicionales</p>
          <div className="space-y-2">
            {(movie.videoUrls ?? []).length > 0 ? (
              movie.videoUrls?.map((url) => (
                <label key={url} className="flex items-center gap-2 text-xs text-glass-cinema-text-muted">
                  <input type="checkbox" name="existingVideoUrls" value={url} defaultChecked />
                  <span className="truncate">{url}</span>
                </label>
              ))
            ) : (
              <p className="text-xs text-glass-cinema-text-muted">Sin videos cargados.</p>
            )}
          </div>
          <input
            type="file"
            name="extraVideos"
            multiple
            accept="video/*"
            className="rounded-xl border border-dashed border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-emerald-400">{success}</p>}

        <button
          type="submit"
          className="rounded-full bg-glass-cinema-primary px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-glass-cinema-secondary disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </details>
  );
}
