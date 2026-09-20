export const defaultHomeHero = {
  backgroundImage: "/media/home/hero-3-in-range.webp",
  backgroundImageMobile: "/media/home/hero-3-in-range-640.webp",
  imageAlt: "Isuzu truck range - DT Trucks dealership",
  badge: "Authorised Isuzu Dealer",
  eyebrow: "The Next Generation Of Trucks!",
  title: "Welcome to DT Trucks",
  subtitle: "Van and Truck Services, Your Trusted Commercial Vehicle Partner",
  tagline: "ISUZU SALES, PARTS & SERVICE DEALER",
  ctas: [
    { label: "Isuzu truck sales", href: "/sales", variant: "primary" as const },
    { label: "Specification sheets", href: "/sales/specification-sheets", variant: "secondary" as const },
    { label: "Body quote request", href: "/sales/body-quote", variant: "link" as const },
    { label: "Service & parts", href: "/service", variant: "link" as const },
  ],
};
