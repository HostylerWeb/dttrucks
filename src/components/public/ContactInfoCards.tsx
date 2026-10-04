"use client";

import { PhoneButton } from "@/components/public/PhoneButton";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { TrackedEmailLink } from "@/components/public/TrackedEmailLink";
import { trackPhoneClick } from "@/lib/analytics/events";

function IconCall({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconLocation({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

export function ContactInfoCards({
  phone,
  salesPhone,
  email,
  address,
  what3words,
}: {
  phone: string;
  salesPhone?: string | null;
  email?: string | null;
  address?: string | null;
  what3words?: string | null;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-3 mb-12">
      <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial">
        <IconCall className="h-8 w-8 text-primary-container" />
        <h3 className="mt-3 font-headline font-semibold">Phone</h3>
        <p className="mt-1 text-xs text-secondary">Office</p>
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          onClick={() => trackPhoneClick("contact_card")}
          className="mt-1 text-sm text-secondary hover:text-primary-container block"
        >
          {phone}
        </a>
        {salesPhone && (
          <>
            <p className="mt-3 text-xs text-secondary">Sales</p>
            <a
              href={`tel:${salesPhone.replace(/\s/g, "")}`}
              onClick={() => trackPhoneClick("contact_sales")}
              className="mt-1 text-sm text-secondary hover:text-primary-container block"
            >
              {salesPhone}
            </a>
          </>
        )}
      </div>
      <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial">
        <IconMail className="h-8 w-8 text-primary-container" />
        <h3 className="mt-3 font-headline font-semibold">Email</h3>
        {email && (
          <TrackedEmailLink
            email={email}
            trackingContext="contact_card"
            className="mt-2 text-sm text-secondary hover:text-primary-container block"
          >
            {email}
          </TrackedEmailLink>
        )}
      </div>
      <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial">
        <IconLocation className="h-8 w-8 text-primary-container" />
        <h3 className="mt-3 font-headline font-semibold">Address</h3>
        {address && <p className="mt-2 text-sm text-secondary">{address}</p>}
        {what3words && (
          <p className="mt-2 text-xs text-secondary">{`///${what3words}`}</p>
        )}
      </div>
    </div>
  );
}

export function ContactActionButtons({
  phone,
  salesPhone,
}: {
  phone: string;
  salesPhone?: string | null;
}) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto">
      <PhoneButton phone={phone} trackingContext="contact_page" />
      {salesPhone && (
        <WhatsAppButton phone={salesPhone} message="Hello DT Trucks, I'd like to enquire..." />
      )}
    </div>
  );
}
