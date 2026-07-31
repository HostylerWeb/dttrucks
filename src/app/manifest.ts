import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DT Trucks — Authorised Isuzu Dealer",
    short_name: "DT Trucks",
    description:
      "Authorised Isuzu dealer in Barking, Essex. Truck sales, service, parts and fleet support across London and the South East.",
    start_url: "/",
    display: "standalone",
    background_color: "#191c1d",
    theme_color: "#c8102e",
    lang: "en-GB",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
