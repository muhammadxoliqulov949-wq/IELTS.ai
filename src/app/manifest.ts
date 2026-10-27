import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IELTS.ai — AI IELTS mock tests",
    short_name: "IELTS.ai",
    description: "AI-powered IELTS Writing and Reading mock tests.",
    start_url: "/uz",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
