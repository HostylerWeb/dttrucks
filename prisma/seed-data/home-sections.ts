import type { section_type } from "../../src/generated/prisma/client";

const HERO_IMAGE = "/media/home/hero-3-in-range.jpg";

const WORKSHOP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDpl6crF0ocVprgwfuabQSZ8X3U5VuG7q030X15apdJ6ZvgEeIP78AmxZlO8_DTegzX0P9UO8uLzjOH5AQrCY-641lMps6dtExmChv0BxiIzR08TPEUtC73xVC0LmMHKhAvZ4XEYpBX2yFvWDZX-jH7MrMcCDJuTKgBNw7znVl0bHJiuhVxewHEGVpJUYynunJb0cZ2jIBno7T7Z5jaw0NBuTq3fOIVnd_PIAAdfGcWKwBrCAiCwqRvnw";

export type SeedPageSection = {
  section_type: section_type;
  title?: string | null;
  content: string;
  sort_order: number;
};

export const homePageSections: SeedPageSection[] = [
  {
    section_type: "hero",
    sort_order: 0,
    content: JSON.stringify({
      backgroundImage: HERO_IMAGE,
      imageAlt: "Isuzu truck range - DT Trucks dealership",
      badge: "Authorised Isuzu Dealer",
      eyebrow: "The Next Generation Of Trucks!",
      title: "Welcome to DT Trucks",
      subtitle: "Van and Truck Services, Your Trusted Commercial Vehicle Partner",
      tagline: "ISUZU SALES, PARTS & SERVICE DEALER",
      ctas: [
        { label: "Truck Sales", href: "/sales", variant: "primary" },
        { label: "Service & Parts", href: "/service", variant: "secondary" },
        { label: "Contact Us", href: "#contact", variant: "link" },
      ],
    }),
  },
  {
    section_type: "text_block",
    title: "Van and Truck Services, Your Trusted Commercial Vehicle Partner",
    sort_order: 1,
    content: JSON.stringify({
      component: "intro_split",
      body:
        "At DT Trucks, we specialise in van and truck servicing, repairs, and replacements for businesses across the UK. Whether you're managing a single vehicle or an entire fleet, our expert team is here to provide tailored advice and reliable solutions that help keep your operations running smoothly.",
      highlights: [
        {
          icon: "inventory_2",
          title: "96% first-time pick rate on parts",
          description:
            "Fast turnaround and minimal vehicle downtime - we focus on maximising uptime and earning potential.",
        },
        {
          icon: "verified",
          title: "2-year warranty on genuine parts",
          description: "Through the Isuzu Care programme, with competitive pricing on fast-moving stock.",
        },
      ],
      image: WORKSHOP_IMAGE,
      imageAlt: "DT Trucks workshop",
      statBadge: { value: "96%", label: "Parts first-time pick rate" },
    }),
  },
  {
    section_type: "feature_grid",
    sort_order: 2,
    content: JSON.stringify([
      {
        icon: "speed",
        title: "Boost Your Fleet's Efficiency and Uptime",
        description:
          "Your commercial vehicles are vital assets - when they're off the road, your business feels it. That's why we deliver fast, cost-effective servicing to minimise downtime and maximise productivity. From routine maintenance to urgent repairs, we work efficiently to get your van or truck back on the road without delay.",
        href: "/service",
        linkLabel: "Learn more",
      },
      {
        icon: "engineering",
        title: "Expert Support for All Transport Needs",
        description:
          "Need guidance on transport logistics or vehicle performance? Our experienced staff are ready to help. Most queries are resolved on the spot, and if we don't have the answer immediately, we'll find it for you - because your business deserves nothing less.",
        href: "/about",
        linkLabel: "Meet the team",
      },
      {
        icon: "contact_support",
        title: "Get in Touch Today",
        description:
          "For dependable commercial vehicle servicing, contact DT Trucks. We're committed to delivering exceptional service and long-term support for your van and truck fleet. Use our live chat in the bottom right corner for instant assistance or reach out to our team directly.",
        href: "#contact",
        linkLabel: "Contact us",
      },
    ]),
  },
  {
    section_type: "text_block",
    sort_order: 3,
    content: JSON.stringify({ component: "dealer_stats" }),
  },
  {
    section_type: "text_block",
    sort_order: 4,
    content: JSON.stringify({ component: "three_pillars" }),
  },
  {
    section_type: "text_block",
    sort_order: 5,
    content: JSON.stringify({ component: "specialist_services" }),
  },
  {
    section_type: "text_block",
    sort_order: 6,
    content: JSON.stringify({ component: "blog_preview" }),
  },
  {
    section_type: "text_block",
    sort_order: 7,
    content: JSON.stringify({ component: "video_gallery" }),
  },
  {
    section_type: "text_block",
    sort_order: 8,
    content: JSON.stringify({ component: "team_preview" }),
  },
  {
    section_type: "cta_banner",
    title: "Ready to upgrade your fleet?",
    sort_order: 9,
    content: JSON.stringify({
      description:
        "Speak to our sales team about new and used Isuzu trucks, driveaways, and fleet support.",
      button_label: "View truck sales",
      button_href: "/sales",
    }),
  },
  {
    section_type: "text_block",
    sort_order: 10,
    content: JSON.stringify({ component: "contact_cta" }),
  },
];

export const aboutPageSections: SeedPageSection[] = [];
