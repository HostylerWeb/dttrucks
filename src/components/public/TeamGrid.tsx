import Image from "next/image";

export type TeamMember = {
  name: string;
  role: string;
  bio?: string | null;
  photo_url?: string | null;
};

export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <li
          key={member.name}
          className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial text-center"
        >
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-surface-container">
            {member.photo_url ? (
              <Image
                src={member.photo_url}
                alt={member.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-secondary text-sm">
                Photo
              </div>
            )}
          </div>
          <h3 className="mt-4 font-headline font-semibold text-lg">{member.name}</h3>
          <p className="text-sm font-medium text-primary-container">{member.role}</p>
          {member.bio && (
            <p className="mt-3 text-sm text-secondary leading-relaxed">{member.bio}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
