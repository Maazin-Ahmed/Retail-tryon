import { MetadataRoute } from "next";
import { storeMetadata } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${storeMetadata.domain}`;

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-21",
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
