import { salesWhyChoose } from "@/content/sales";
import { FeatureIcon } from "@/components/public/FeatureIcon";

export function SalesWhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-surface-container-low border-y border-outline-variant">
      <div className="relative page-container page-section lg:!py-20">
        <div className="max-w-2xl mb-8 sm:mb-10 lg:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-container mb-2 sm:mb-3">
            {salesWhyChoose.eyebrow}
          </p>
          <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug text-on-background">
            {salesWhyChoose.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-secondary leading-relaxed">
            {salesWhyChoose.description}
          </p>
        </div>

        <ul className="grid gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
          {salesWhyChoose.items.map((item, index) => (
            <li
              key={item.title}
              className="rounded-xl border border-outline-variant bg-white p-5 sm:p-6 lg:p-7 shadow-industrial hover:border-primary-container/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-container text-white shadow-industrial">
                  <FeatureIcon name={item.icon} className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-headline text-lg font-bold leading-snug text-on-background">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-secondary leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
