import type { MetadataRoute } from "next";
import { pageSeo } from "@/content/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agentix",
    short_name: "Agentix",
    description: pageSeo.home.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1B1D21",
    theme_color: "#1B1D21",
    icons: [
      { src: "/agentix-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/agentix-icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/agentix-icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
