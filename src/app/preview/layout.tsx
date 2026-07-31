import { Suspense } from "react";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface p-8">
          <div className="mx-auto max-w-3xl h-64 rounded-xl bg-surface-container animate-pulse" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
