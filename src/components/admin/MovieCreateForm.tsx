"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import type { MovieStatus } from "@/data/types";

const STATUS_OPTIONS: Array<{ value: MovieStatus; label: string }> = [
  { value: "in_theaters", label: "En cartelera" },
  { value: "upcoming", label: "Proximamente" },
  { value: "catalog", label: "Catalogo" },
];

export function MovieCreateForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("videosSubmission", "true");

    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const message = typeof payload.error === "string" ? payload.error : "Error al crear la pelicula";
        throw new Error(message);
      }

      form.reset();
      setSuccess("Pelicula creada correctamente");
      router.refresh();
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Error al crear la pelicula";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-8 shadow-glass">
      <h2 className="font-display text-2xl text-glass-cinema-text">Nueva pelicula</h2>
      <p className="mt-2 text-sm text-glass-cinema-text-muted">
        Carga titulo, datos clave y materiales oficiales. Los archivos quedan disponibles al instante en el
        sitio publico.
      </p>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="videosSubmission" value="true" />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Titulo *</span>
            <input
              name="title"
              required
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              placeholder="Nombre comercial"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Slug</span>
            <input
              name="slug"
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              placeholder="generado-automaticamente"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Estudio</span>
            <input
              name="studio"
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              placeholder="Disney, Universal, etc."
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Genero</span>
            <input
              name="genre"
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              placeholder="Animacion, Accion, Documental"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Fecha de estreno</span>
            <input
              type="date"
              name="releaseDate"
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
            <span className="font-semibold">Estado</span>
            <select
              name="status"
              defaultValue="upcoming"
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
              className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              placeholder="120"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
          <span className="font-semibold">Sinopsis</span>
          <textarea
            name="synopsis"
            rows={4}
            className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
            placeholder="Resena breve para cines y prensa"
          />
        </label>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
              <span className="font-semibold">Poster</span>
              <input
                type="file"
                name="poster"
                accept="image/*"
                className="rounded-xl border border-dashed border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
              <span className="font-semibold">Banner</span>
              <input
                type="file"
                name="banner"
                accept="image/*"
                className="rounded-xl border border-dashed border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              />
            </label>
          </div>
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
              <span className="font-semibold">Trailer (archivo)</span>
              <input
                type="file"
                name="trailerFile"
                accept="video/*"
                className="rounded-xl border border-dashed border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
              <span className="font-semibold">Trailer externo</span>
              <input
                type="url"
                name="trailerUrl"
                className="rounded-xl border border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
                placeholder="https://youtube.com/..."
              />
            </label>
          </div>
        </div>

        <label className="flex flex-col gap-2 text-sm text-glass-cinema-text">
          <span className="font-semibold">Videos adicionales</span>
          <input
            type="file"
            name="extraVideos"
            multiple
            accept="video/*"
            className="rounded-xl border border-dashed border-glass-cinema-outline bg-transparent px-4 py-2 text-base"
          />
          <span className="text-xs text-glass-cinema-text-muted">
            Puedes subir featurettes, spots o assets sociales en formato MP4, MOV o WEBM.
          </span>
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-emerald-400">{success}</p>}

        <button
          type="submit"
          className="rounded-full bg-glass-cinema-primary px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-glass-cinema-secondary disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Crear pelicula"}
        </button>
      </form>
    </div>
  );
}
