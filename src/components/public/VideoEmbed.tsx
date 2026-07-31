"use client";

import { useState } from "react";

export function VideoEmbed({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  const [active, setActive] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  if (!active) {
    return (
      <button
        type="button"
        className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-industrial"
        onClick={() => setActive(true)}
        aria-label={`Play video: ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <span
          className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/45"
          aria-hidden
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white shadow-lg">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-industrial">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
