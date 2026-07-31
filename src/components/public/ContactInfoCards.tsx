"use client";

import { PhoneButton } from "@/components/public/PhoneButton";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { TrackedEmailLink } from "@/components/public/TrackedEmailLink";
import { trackPhoneClick } from "@/lib/analytics/events";

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
        <span className="material-symbols-outlined text-primary-container text-3xl">call</span>
        <h3 className="mt-3 font-headline font-semibold">Phone</h3>
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          onClick={() => trackPhoneClick("contact_card")}
          className="mt-2 text-sm text-secondary hover:text-primary-container block"
        >
          {phone}
        </a>
        {salesPhone && (
          <p className="mt-2 text-sm text-secondary">
            Sales:{" "}
            <a
              href={`tel:${salesPhone.replace(/\s/g, "")}`}
              onClick={() => trackPhoneClick("contact_sales")}
              className="hover:text-primary-container"
            >
              {salesPhone}
            </a>
          </p>
        )}
      </div>
      <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial">
        <span className="material-symbols-outlined text-primary-container text-3xl">mail</span>
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
        <span className="material-symbols-outlined text-primary-container text-3xl">location_on</span>
        <h3 className="mt-3 font-headline font-semibold">Address</h3>
        {address && <p className="mt-2 text-sm text-secondary">{address}</p>}
        {what3words && (
          <p className="mt-2 text-xs text-secondary">///{what3words}</p>
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
