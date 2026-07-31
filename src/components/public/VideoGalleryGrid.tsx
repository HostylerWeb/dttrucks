import { VideoEmbed } from "@/components/public/VideoEmbed";

export type VideoItem = {
  id: string;
  title: string;
  youtube_id: string;
};

export function VideoGalleryGrid({ videos }: { videos: VideoItem[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div key={video.id}>
          <VideoEmbed youtubeId={video.youtube_id} title={video.title} />
          <h2 className="mt-3 text-sm font-semibold text-on-surface leading-snug">{video.title}</h2>
        </div>
      ))}
    </div>
  );
}
