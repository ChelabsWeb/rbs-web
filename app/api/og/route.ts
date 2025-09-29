import { createElement } from "react";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") ?? "RBS Distribuidora";

  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0b0d10 0%, #111726 70%, #17233b 100%)",
          color: "#e6e8ea",
          padding: "80px",
          fontSize: 56,
          gap: 24,
        },
      },
      createElement(
        "span",
        {
          style: {
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#4db6ff",
          },
        },
        "RBS Distribuidora",
      ),
      createElement("strong", { style: { textAlign: "center", fontSize: 72 } }, title),
      createElement("span", { style: { fontSize: 24, color: "#aab1b7" } }, "rbs.com.uy"),
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
