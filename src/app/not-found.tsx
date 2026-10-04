import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col min-h-[60vh]">
      <section className="page-section page-container flex flex-1 flex-col items-center justify-center text-center max-w-lg mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-container mb-3">
          404
        </p>
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-background">
          Page not found
        </h1>
        <p className="mt-4 text-secondary leading-relaxed">
          The page you are looking for may have moved or no longer exists. Try one of these
          instead:
        </p>
        <ul className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center w-full">
          <li>
            <Link href="/sales" className={buttonClassName("primary")}>
              Truck sales
            </Link>
          </li>
          <li>
            <Link href="/service" className={buttonClassName("secondary")}>
              Service &amp; parts
            </Link>
          </li>
          <li>
            <Link href="/contact" className={buttonClassName("secondary")}>
              Contact us
            </Link>
          </li>
        </ul>
        <Link href="/" className="mt-8 text-sm font-semibold text-primary-container hover:underline">
          Back to home
        </Link>
      </section>
    </div>
  );
}
