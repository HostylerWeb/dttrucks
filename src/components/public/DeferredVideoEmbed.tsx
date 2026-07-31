"use client";

import dynamic from "next/dynamic";

const VideoEmbed = dynamic(
  () => import("@/components/public/VideoEmbed").then((mod) => mod.VideoEmbed),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video w-full rounded-xl bg-surface-container-low animate-pulse" aria-hidden />
    ),
  }
);

export function DeferredVideoEmbed({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  return <VideoEmbed youtubeId={youtubeId} title={title} />;
}
