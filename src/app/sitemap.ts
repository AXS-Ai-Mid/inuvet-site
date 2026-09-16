import { MetadataRoute } from "next";
import { SERVICES_LIST } from "@/lib/clinic-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inuvet.com.br";
  const now = new Date();

  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agendar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/emergencia`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculadora-vacinas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/geo-ai-info`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_LIST.map((srv) => ({
    url: `${baseUrl}/servicos/${srv.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...mainRoutes, ...serviceRoutes];
}
