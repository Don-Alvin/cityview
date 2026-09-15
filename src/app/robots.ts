import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { hasPlaceholderContact } from "@/content/contact";

export default function robots(): MetadataRoute.Robots {
  // While the contact details are still placeholders, keep crawlers out
  // entirely. A deployed presentation build carries a fake phone number
  // and invented opening hours in its LocalBusiness markup; those getting
  // indexed for a real business is the one consequence of shipping early
  // that is genuinely hard to undo. Clears itself when contact.ts does.
  if (hasPlaceholderContact) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
