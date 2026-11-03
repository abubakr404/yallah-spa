import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "يلا سبا — إهداء الجلسات والباقات",
    short_name: "يلا سبا",
    description:
      "أهدِ من تحب تجربة سبا مميزة: باقات وجلسات، تخصيص البطاقة، واختيار الفرع والموعد.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#faf6f0",
    theme_color: "#4b4d3a",
    lang: "ar",
    dir: "rtl",
    id: getSiteUrl(),
    icons: [
      {
        src: "/assets/images/yallah-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["lifestyle", "shopping"],
  };
}
