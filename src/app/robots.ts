import { MetadataRoute } from "next";
import { storeMetadata } from "@/data/products";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${storeMetadata.domain}/sitemap.xml`,
  };
}
