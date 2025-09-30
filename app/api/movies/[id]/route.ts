import { NextResponse } from "next/server";
import { getFileField, getFileList, getNumberField, getStringField, parseStatus } from "../helpers";
import { deleteMovie, getMovieById, updateMovie } from "@/server/movies";
import { deleteUploadedFile, isManagedUpload, saveUploadedFile } from "@/server/storage/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteParams {
  params: { id: string };
}

function notFoundResponse() {
  return NextResponse.json({ error: "Pelicula no encontrada" }, { status: 404 });
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const movie = await getMovieById(params.id);
    if (!movie) {
      return notFoundResponse();
    }

    return NextResponse.json({ data: movie });
  } catch (error) {
    console.error("Failed to load movie", error);
    return NextResponse.json({ error: "No se pudo cargar la pelicula" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const storedPaths: string[] = [];
  const obsoletePaths: string[] = [];

  try {
    const existing = await getMovieById(params.id);
    if (!existing) {
      return notFoundResponse();
    }

    const formData = await request.formData();

    const title = getStringField(formData, "title");
    const slug = getStringField(formData, "slug");
    const synopsis = getStringField(formData, "synopsis");
    const releaseDate = getStringField(formData, "releaseDate");
    const studio = getStringField(formData, "studio");
    const genre = getStringField(formData, "genre");
    const status = parseStatus(getStringField(formData, "status"));
    const runtimeMinutes = getNumberField(formData, "runtimeMinutes");
    const trailerExternalUrl = getStringField(formData, "trailerUrl");

    const posterFile = getFileField(formData, "poster");
    const bannerFile = getFileField(formData, "banner");
    const trailerFile = getFileField(formData, "trailerFile");
    const extraVideos = getFileList(formData, "extraVideos");

    const removePoster = getStringField(formData, "removePoster") === "true";
    const removeBanner = getStringField(formData, "removeBanner") === "true";
    const removeTrailer = getStringField(formData, "removeTrailer") === "true";

    let posterUrl = existing.posterUrl;
    if (removePoster) {
      if (isManagedUpload(existing.posterUrl)) {
        obsoletePaths.push(existing.posterUrl);
      }
      posterUrl = undefined;
    } else if (posterFile) {
      posterUrl = await saveUploadedFile(posterFile, "posters");
      storedPaths.push(posterUrl);
      if (isManagedUpload(existing.posterUrl)) {
        obsoletePaths.push(existing.posterUrl);
      }
    }

    let bannerUrl = existing.bannerUrl;
    if (removeBanner) {
      if (isManagedUpload(existing.bannerUrl)) {
        obsoletePaths.push(existing.bannerUrl);
      }
      bannerUrl = undefined;
    } else if (bannerFile) {
      bannerUrl = await saveUploadedFile(bannerFile, "banners");
      storedPaths.push(bannerUrl);
      if (isManagedUpload(existing.bannerUrl)) {
        obsoletePaths.push(existing.bannerUrl);
      }
    }

    let trailerUrl = existing.trailerUrl;
    if (removeTrailer) {
      if (isManagedUpload(existing.trailerUrl)) {
        obsoletePaths.push(existing.trailerUrl);
      }
      trailerUrl = undefined;
    } else if (trailerFile) {
      trailerUrl = await saveUploadedFile(trailerFile, "trailers");
      storedPaths.push(trailerUrl);
      if (isManagedUpload(existing.trailerUrl)) {
        obsoletePaths.push(existing.trailerUrl);
      }
    } else if (trailerExternalUrl !== undefined) {
      if (isManagedUpload(existing.trailerUrl)) {
        obsoletePaths.push(existing.trailerUrl);
      }
      trailerUrl = trailerExternalUrl;
    }

    const videosSubmission = getStringField(formData, "videosSubmission");
    const manageVideos = videosSubmission === "true" || extraVideos.length > 0;

    let videoUrls: string[] | undefined;
    if (manageVideos) {
      const keepVideoUrls = formData
        .getAll("existingVideoUrls")
        .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
        .map((value) => value.trim());

      const normalizedKeep = Array.from(new Set(keepVideoUrls));
      const removedVideos = (existing.videoUrls ?? []).filter(
        (url) => !normalizedKeep.includes(url),
      );
      for (const removed of removedVideos) {
        if (isManagedUpload(removed)) {
          obsoletePaths.push(removed);
        }
      }

      const newVideoUrls: string[] = [];
      for (const video of extraVideos) {
        const url = await saveUploadedFile(video, "videos");
        newVideoUrls.push(url);
        storedPaths.push(url);
      }

      videoUrls = [...normalizedKeep, ...newVideoUrls];
    }

    const updated = await updateMovie(params.id, {
      title,
      slug,
      synopsis,
      releaseDate,
      studio,
      genre,
      status,
      runtimeMinutes,
      posterUrl,
      bannerUrl,
      trailerUrl,
      videoUrls,
    });

    await Promise.all(obsoletePaths.map((path) => deleteUploadedFile(path)));

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Failed to update movie", error);
    await Promise.all(storedPaths.map((path) => deleteUploadedFile(path)));
    const message = error instanceof Error ? error.message : "No se pudo actualizar la pelicula";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: RouteParams) {
  try {
    const removed = await deleteMovie(params.id);
    if (!removed) {
      return notFoundResponse();
    }

    const assetPaths = [
      removed.posterUrl,
      removed.bannerUrl,
      removed.trailerUrl,
      ...(removed.videoUrls ?? []),
    ];
    await Promise.all(assetPaths.map((path) => deleteUploadedFile(path)));

    return NextResponse.json({ data: { id: removed.id } });
  } catch (error) {
    console.error("Failed to delete movie", error);
    return NextResponse.json({ error: "No se pudo eliminar la pelicula" }, { status: 400 });
  }
}
