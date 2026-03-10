import type { MetadataRoute } from "next";

const demos = [
  "appshell",
  "dashboard",
  "iclosed",
  "messaging",
  "nameia",
  "skool",
  "typeform",
  "payments",
  "onboarding",
  "appel",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://briques-showcase.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...demos.map((demo) => ({
      url: `${baseUrl}/demo/${demo}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
