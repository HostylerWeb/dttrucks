"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-controls";
import { HoneypotField } from "@/components/public/HoneypotField";
import { trackJobApplicationSubmitted } from "@/lib/analytics/events";

export function JobApplicationForm({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    formData.set("job_id", jobId);

    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok || result.error) {
        setError(result.error ?? "Could not submit application. Please try again.");
        setPending(false);
        return;
      }

      trackJobApplicationSubmitted(jobTitle);
      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError("Could not submit application. Please try again or email us directly.");
    }

    setPending(false);
  }

  if (success) {
    return (
      <div className="rounded-xl border border-tertiary-container/30 bg-tertiary-container/5 p-6 text-center">
        <span className="material-symbols-outlined text-tertiary-container text-4xl">check_circle</span>
        <h3 className="mt-3 font-headline text-lg font-semibold">Application sent</h3>
        <p className="mt-2 text-sm text-secondary">
          Thank you for applying for {jobTitle}. We&apos;ll review your application and respond if your
          profile matches our needs.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-headline text-xl font-bold">Apply for this role</h2>
      {error && <p className="text-sm text-primary">{error}</p>}
      <HoneypotField />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="job-name">Full name</Label>
          <Input id="job-name" name="name" required minLength={2} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="job-phone">Phone</Label>
          <Input id="job-phone" name="phone" type="tel" required className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="job-email">Email</Label>
        <Input id="job-email" name="email" type="email" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="job-cover">Cover letter</Label>
        <Textarea id="job-cover" name="cover_letter" rows={5} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="job-resume">Resume (PDF or Word, max 5MB)</Label>
        <Input
          id="job-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="mt-1 file:mr-3 file:rounded-md file:border-0 file:bg-surface-container file:px-3 file:py-1.5 file:text-sm file:font-semibold"
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
