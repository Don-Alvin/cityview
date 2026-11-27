import type { MetadataRoute } from "next";
import { mainNavigation, siteUrl } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [...mainNavigation.map(({ href }) => href), "/quote"].map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
