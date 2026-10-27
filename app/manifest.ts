import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name,
    description: "Portfolio of Rutvik Umak, Senior Frontend Engineer.",
    start_url: "./",
    scope: "./",
    display: "standalone",
    background_color: "#1f1e1d",
    theme_color: "#1f1e1d",
    icons: [{ src: "icon.png", sizes: "256x256", type: "image/png" }],
  };
}
