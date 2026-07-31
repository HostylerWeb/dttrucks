import { salesWhyChoose } from "@/content/sales";

export function SalesWhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-inverse-surface text-white border-y border-white/10">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative page-container page-section lg:!py-20">
        <div className="max-w-2xl mb-8 sm:mb-10 lg:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-fixed-dim mb-2 sm:mb-3">
            {salesWhyChoose.eyebrow}
          </p>
          <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
            {salesWhyChoose.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-inverse-on-surface/80 leading-relaxed">
            {salesWhyChoose.description}
          </p>
        </div>

        <ul className="grid gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
          {salesWhyChoose.items.map((item, index) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:p-7 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-container text-white shadow-industrial">
                  <span className="material-symbols-outlined text-2xl" aria-hidden>
                    {item.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary-fixed-dim mb-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-headline text-lg font-bold leading-snug">{item.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-inverse-on-surface/75 leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
