import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/internal/", "/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "Amazonbot",
          "CCBot",
          "cohere-ai",
          "Bytespider",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/api/ai-context", "/faq", "/servicos"],
      },
    ],
    sitemap: "https://inuvet.com.br/sitemap.xml",
  };
}
