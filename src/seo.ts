import type { Metadata } from "next";
import { siteConfig } from "./config";

interface SeoOptions {
  title?: string;
  description?: string;
  openGraphImage?: string;
}

export function buildMetadata({ title, description, openGraphImage }: SeoOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageDescription = description ?? siteConfig.description;
  const image = openGraphImage ?? siteConfig.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
  };
}
