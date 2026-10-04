import { PhoneButton } from "@/components/public/PhoneButton";

export function SalesContactCard({
  name,
  phone,
  email,
  photoUrl,
}: {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  photoUrl?: string | null;
}) {
  if (!name && !phone && !email) return null;

  return (
    <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial flex flex-col sm:flex-row gap-6 items-start">
      <div className="h-24 w-24 shrink-0 rounded-xl bg-surface-container overflow-hidden">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={name ?? "Sales contact"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-secondary text-xs text-center p-2">
            Sales
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="font-headline text-xl font-bold">{name ?? "Sales team"}</p>
        <p className="mt-1 text-sm text-secondary">Isuzu truck sales - new, used and driveaway</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {phone && <PhoneButton phone={phone} />}
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2.5 text-sm font-semibold hover:bg-surface-container"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Email
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
