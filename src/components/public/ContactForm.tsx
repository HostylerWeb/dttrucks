"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form-controls";
import { HoneypotField } from "@/components/public/HoneypotField";
import { trackEnquirySubmitted } from "@/lib/analytics/events";

type EnquiryType =
  | "general"
  | "sales"
  | "service"
  | "parts"
  | "tachograph"
  | "specialist"
  | "careers";

export function ContactForm({
  sourcePage,
  defaultType = "general",
  defaultSubject,
  metadata,
  title = "Send us a message",
  showTypeSelect = true,
}: {
  sourcePage?: string;
  defaultType?: EnquiryType;
  defaultSubject?: string;
  metadata?: Record<string, unknown>;
  title?: string;
  showTypeSelect?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    if (sourcePage) formData.set("source_page", sourcePage);
    if (metadata) formData.set("metadata", JSON.stringify(metadata));

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok || result.error) {
        setError(result.error ?? "Could not send message. Please try again.");
        setPending(false);
        return;
      }

      const enquiryType = (formData.get("type") as string) || defaultType;
      trackEnquirySubmitted(enquiryType);
      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError("Could not send message. Please try again or call us directly.");
    }

    setPending(false);
  }

  if (success) {
    return (
      <div className="rounded-xl border border-tertiary-container/30 bg-tertiary-container/5 p-6 text-center">
        <span className="material-symbols-outlined text-tertiary-container text-4xl">check_circle</span>
        <h3 className="mt-3 font-headline text-lg font-semibold">Thank you</h3>
        <p className="mt-2 text-sm text-secondary">
          Your message has been sent. We&apos;ll respond within one business day.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-primary-container hover:underline"
          onClick={() => setSuccess(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
      <h2 className="font-headline text-xl font-bold">{title}</h2>
      {error && <p className="text-sm text-primary">{error}</p>}
      <HoneypotField />
      {!showTypeSelect && (
        <input type="hidden" name="type" value={defaultType} />
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" required minLength={2} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" name="email" type="email" required className="mt-1" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-phone">Phone</Label>
          <Input id="contact-phone" name="phone" type="tel" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="contact-subject">Subject</Label>
          <Input
            id="contact-subject"
            name="subject"
            defaultValue={defaultSubject ?? ""}
            className="mt-1"
          />
        </div>
      </div>
      {showTypeSelect && (
        <div>
          <Label htmlFor="contact-type">Enquiry type</Label>
          <Select id="contact-type" name="type" defaultValue={defaultType} className="mt-1">
            <option value="general">General enquiry</option>
            <option value="sales">Sales</option>
            <option value="service">Service</option>
            <option value="parts">Parts</option>
            <option value="tachograph">Tachograph</option>
            <option value="specialist">Specialist</option>
            <option value="careers">Careers</option>
          </Select>
        </div>
      )}
      <div>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-1"
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
