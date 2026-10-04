"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  buildMailtoHref,
  buildTelHref,
  buildWhatsAppHref,
} from "@/lib/contact/external-links";
import { SALES_EMAIL_SUBJECT, SALES_OUTREACH_MESSAGE } from "@/lib/contact/sales-contact";
type QuickContactWidgetProps = {
  phone: string;
  email: string;
  whatsAppPhone: string;
  whatsAppMessage?: string;
};

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12 5.7 16.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
    </svg>
  );
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 60 60" aria-hidden>
      <path d="M30 1.5c-16.542 0-30 12.112-30 27 0 5.204 1.646 10.245 4.768 14.604-.591 6.537-2.175 11.39-4.475 13.689-.304.304-.38.769-.188 1.153.17.343.52.554.895.554.046 0 .092-.003.139-.01.405-.057 9.813-1.411 16.618-5.339C21.621 54.71 25.737 55.5 30 55.5c16.542 0 30-12.112 30-27s-13.458-27-30-27zm-14 31c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm14 0c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm14 0c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
    </svg>
  );
}

export function QuickContactWidget({
  phone,
  email,
  whatsAppPhone,
  whatsAppMessage = SALES_OUTREACH_MESSAGE,
}: QuickContactWidgetProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        close();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const items = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: buildWhatsAppHref(whatsAppPhone, whatsAppMessage),
      external: true,
      className: "bg-[#25D366] text-white hover:bg-[#1da851]",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      arc: "translate(-4px, -4.75rem)",
    },
    {
      id: "email",
      label: "Email",
      href: buildMailtoHref(email, {
        subject: SALES_EMAIL_SUBJECT,
        body: SALES_OUTREACH_MESSAGE,
      }),
      external: false,
      className: "bg-white text-primary-container border border-outline-variant hover:bg-surface-container",
      icon: <IconMail className="h-5 w-5" />,
      arc: "translate(-3.25rem, -3.25rem)",
    },
    {
      id: "phone",
      label: "Call",
      href: buildTelHref(phone),
      external: false,
      className: "bg-primary-container text-white hover:bg-primary",
      icon: <IconPhone className="h-5 w-5" />,
      arc: "translate(-4.75rem, -4px)",
    },
  ] as const;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-6 right-4 sm:right-6 z-50 h-36 w-36 pb-[env(safe-area-inset-bottom)] pointer-events-none"
      aria-live="polite"
    >
      <div
        id={menuId}
        role="menu"
        aria-hidden={!open}
        className="absolute bottom-0 right-0 h-14 w-14"
      >
        {items.map((item, index) => (
          <a
            key={item.id}
            role="menuitem"
            href={item.href}
            tabIndex={open ? 0 : -1}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
              "pointer-events-auto absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full shadow-industrial transition-[transform,opacity] duration-300 ease-out",
              item.className,
              !open && "pointer-events-none"
            )}
            style={{
              transform: open ? item.arc : "translate(0, 0) scale(0.5)",
              opacity: open ? 1 : 0,
              zIndex: open ? 30 + index : 0,
              transitionDelay: open ? `${index * 45}ms` : `${(items.length - 1 - index) * 35}ms`,
            }}
            onClick={() => {
              close();
            }}
          >
            <span className="sr-only">{item.label}</span>
            {item.icon}
          </a>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-label={open ? "Close contact options" : "Contact us — WhatsApp, email or phone"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "pointer-events-auto absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white shadow-industrial transition-transform duration-300 hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container",
          open ? "z-20 scale-105" : "z-10 motion-safe:animate-contact-fab-pulse"
        )}
      >
        {open ? <IconClose className="h-6 w-6" /> : <IconChat className="h-7 w-7" />}
      </button>

      {open && (
        <p
          className="pointer-events-none absolute -top-10 right-0 whitespace-nowrap rounded-full bg-inverse-surface px-3 py-1 text-xs font-semibold text-inverse-on-surface shadow-industrial"
        >
          WhatsApp · Email · Call
        </p>
      )}
    </div>
  );
}
