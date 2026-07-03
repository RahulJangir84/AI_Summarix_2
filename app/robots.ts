import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = "https://waltnimbus.online";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/summaries",
        "/upload",
        "/quiz",
        "/api/",
        "/sign-in",
        "/sign-up",
      ],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
