import type { MetadataRoute } from "next";

import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [routes.cart, routes.search, "/api/", "/dev/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
