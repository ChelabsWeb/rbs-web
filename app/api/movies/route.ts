import { NextResponse } from "next/server";
import { getFileField, getFileList, getNumberField, getStringField, parseStatus } from "./helpers";
import { createMovie, getMovies } from "@/server/movies";
import { deleteUploadedFile, saveUploadedFile } from "@/server/storage/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const movies = await getMovies();
    return NextResponse.json({ data: movies });
  } catch (error) {
    console.error("Failed to load movies", error);
    return NextResponse.json({ error: "No se pudieron cargar las peliculas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const storedPaths: string[] = [];

  try {
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

    if (!title) {
      return NextResponse.json(
        { error: "El titulo de la pelicula es obligatorio" },
        { status: 400 },
      );
    }

    const posterFile = getFileField(formData, "poster");
    const bannerFile = getFileField(formData, "banner");
    const trailerFile = getFileField(formData, "trailerFile");
    const extraVideos = getFileList(formData, "extraVideos");

    let posterUrl: string | undefined;
    let bannerUrl: string | undefined;
    let trailerUrl: string | undefined = trailerExternalUrl;

    if (posterFile) {
      posterUrl = await saveUploadedFile(posterFile, "posters");
      storedPaths.push(posterUrl);
    }

    if (bannerFile) {
      bannerUrl = await saveUploadedFile(bannerFile, "banners");
      storedPaths.push(bannerUrl);
    }

    if (trailerFile) {
      trailerUrl = await saveUploadedFile(trailerFile, "trailers");
      storedPaths.push(trailerUrl);
    }

    const videoUrls: string[] = [];
    for (const video of extraVideos) {
      const url = await saveUploadedFile(video, "videos");
      videoUrls.push(url);
      storedPaths.push(url);
    }

    const movie = await createMovie({
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

    return NextResponse.json({ data: movie }, { status: 201 });
  } catch (error) {
    console.error("Failed to create movie", error);
    await Promise.all(storedPaths.map((path) => deleteUploadedFile(path)));
    const message = error instanceof Error ? error.message : "No se pudo crear la pelicula";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
