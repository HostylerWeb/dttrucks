type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

function sendEvent(eventName: string, params?: Record<string, unknown>) {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  if (analyticsWindow.gtag) {
    analyticsWindow.gtag("event", eventName, params);
    return;
  }

  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.dataLayer.push({ event: eventName, ...params });
}

export function trackEnquirySubmitted(type: string) {
  sendEvent("enquiry_submitted", { enquiry_type: type });
}

export function trackJobApplicationSubmitted(jobTitle: string) {
  sendEvent("job_application_submitted", { job_title: jobTitle });
}

export function trackPhoneClick(context?: string) {
  sendEvent("phone_click", { context: context ?? "general" });
}

export function trackEmailClick(context?: string) {
  sendEvent("email_click", { context: context ?? "general" });
}
