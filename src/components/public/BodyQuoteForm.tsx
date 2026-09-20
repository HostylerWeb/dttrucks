"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form-controls";
import { HoneypotField } from "@/components/public/HoneypotField";
import { bodyQuoteOptions, bodyTypes } from "@/content/body-quote-options";
import { trackEnquirySubmitted } from "@/lib/analytics/events";

const STEPS = ["Chassis", "Body type", "Dimensions", "Options", "Contact"] as const;

type Props = {
  chassisModels: { slug: string; name: string; model_code: string | null }[];
  initialModelSlug?: string;
};

export function BodyQuoteForm({ chassisModels, initialModelSlug }: Props) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const [chassisSlug, setChassisSlug] = useState(initialModelSlug ?? "");
  const [bodyType, setBodyType] = useState("");
  const [lengthM, setLengthM] = useState("");
  const [widthM, setWidthM] = useState("");
  const [heightM, setHeightM] = useState("");
  const [payloadNotes, setPayloadNotes] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const chassisLabel = useMemo(() => {
    if (!chassisSlug) return "Not specified";
    return chassisModels.find((m) => m.slug === chassisSlug)?.name ?? chassisSlug;
  }, [chassisModels, chassisSlug]);

  function toggleOption(value: string) {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function canAdvance(): boolean {
    if (step === 1) return bodyType.length > 0;
    if (step === 4) return name.trim().length > 0 && email.trim().length > 0;
    return true;
  }

  async function submit() {
    setError(null);
    setPending(true);

    const optionLabels = bodyQuoteOptions
      .filter((o) => selectedOptions.includes(o.value))
      .map((o) => o.label);

    const bodyTypeLabel = bodyTypes.find((b) => b.value === bodyType)?.label ?? bodyType;

    const metadata = {
      enquiry_kind: "body_quote",
      chassis_slug: chassisSlug || null,
      chassis_model: chassisLabel,
      body_type: bodyTypeLabel,
      dimensions: {
        length_m: lengthM || null,
        width_m: widthM || null,
        height_m: heightM || null,
      },
      payload_notes: payloadNotes || null,
      options: optionLabels,
    };

    const formData = new FormData();
    formData.set("type", "sales");
    formData.set("name", name.trim());
    formData.set("email", email.trim());
    if (phone.trim()) formData.set("phone", phone.trim());
    formData.set("subject", `Body quote: ${bodyTypeLabel}`);
    formData.set(
      "message",
      message.trim() ||
        "Please provide a quote for the body specification detailed in this request."
    );
    formData.set("source_page", "/sales/body-quote");
    formData.set("metadata", JSON.stringify(metadata));

    try {
      const response = await fetch("/api/enquiries", { method: "POST", body: formData });
      const result = (await response.json()) as { error?: string };
      if (!response.ok || result.error) {
        setError(result.error ?? "Could not send request. Please try again.");
        setPending(false);
        return;
      }
      trackEnquirySubmitted("sales");
      setSuccess(true);
    } catch {
      setError("Could not send request. Please call sales directly.");
    }
    setPending(false);
  }

  if (success) {
    return (
      <div className="rounded-xl border border-tertiary-container/30 bg-tertiary-container/5 p-8 text-center">
        <h2 className="font-headline text-xl font-bold">Thank you</h2>
        <p className="mt-3 text-secondary leading-relaxed">
          Your body specification request has been sent to our sales team. We will respond with
          options and lead times — there is no online pricing on this form.
        </p>
        <Link
          href="/sales"
          className="mt-6 inline-block text-sm font-semibold text-primary-container hover:underline"
        >
          Back to truck sales
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-outline-variant bg-white p-5 sm:p-8 shadow-industrial">
      <ol className="flex flex-wrap gap-2 mb-8" aria-label="Progress">
        {STEPS.map((label, index) => (
          <li
            key={label}
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              index === step
                ? "bg-primary-container text-white"
                : index < step
                  ? "bg-surface-container text-on-background"
                  : "bg-surface-container-low text-secondary"
            }`}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      {error && <p className="mb-4 text-sm text-primary">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length - 1) {
            if (canAdvance()) setStep((s) => s + 1);
            return;
          }
          if (canAdvance()) void submit();
        }}
      >
        <HoneypotField />

        {step === 0 && (
          <div className="space-y-4">
            <p className="text-secondary text-sm leading-relaxed">
              Optional: link your request to a chassis model you viewed on our site.
            </p>
            <div>
              <Label htmlFor="chassis">Chassis model</Label>
              <Select
                id="chassis"
                value={chassisSlug}
                onChange={(e) => setChassisSlug(e.target.value)}
              >
                <option value="">Not sure yet / general enquiry</option>
                {chassisModels.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}
                    {m.model_code ? ` (${m.model_code})` : ""}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="body_type">Body type *</Label>
              <Select
                id="body_type"
                required
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <option value="">Select body type</option>
                {bodyTypes.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-secondary">
              Approximate dimensions help us quote the right body — leave blank if unknown.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="length_m">Length (m)</Label>
                <Input
                  id="length_m"
                  inputMode="decimal"
                  value={lengthM}
                  onChange={(e) => setLengthM(e.target.value)}
                  placeholder="e.g. 6.2"
                />
              </div>
              <div>
                <Label htmlFor="width_m">Width (m)</Label>
                <Input
                  id="width_m"
                  inputMode="decimal"
                  value={widthM}
                  onChange={(e) => setWidthM(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height_m">Height (m)</Label>
                <Input
                  id="height_m"
                  inputMode="decimal"
                  value={heightM}
                  onChange={(e) => setHeightM(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="payload">Payload / load notes</Label>
              <Textarea
                id="payload"
                rows={3}
                value={payloadNotes}
                onChange={(e) => setPayloadNotes(e.target.value)}
                placeholder="Typical load, weight, access requirements…"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold mb-2">Optional equipment</legend>
            {bodyQuoteOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(opt.value)}
                  onChange={() => toggleOption(opt.value)}
                  className="rounded border-outline-variant"
                />
                {opt.label}
              </label>
            ))}
          </fieldset>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-surface-container-low p-4 text-sm text-secondary space-y-1">
              <p>
                <strong className="text-on-background">Chassis:</strong> {chassisLabel}
              </p>
              <p>
                <strong className="text-on-background">Body:</strong>{" "}
                {bodyTypes.find((b) => b.value === bodyType)?.label}
              </p>
            </div>
            <div>
              <Label htmlFor="name">Your name *</Label>
              <Input
                id="name"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="message">Additional message</Label>
              <Textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 0 && (
            <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          <Button type="submit" disabled={pending || !canAdvance()}>
            {step === STEPS.length - 1 ? (pending ? "Sending…" : "Submit quote request") : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
