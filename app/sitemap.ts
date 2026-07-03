import { MetadataRoute } from "next";

export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://waltnimbus.online";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
