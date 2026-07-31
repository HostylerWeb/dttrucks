export const DEALER_HEADING =
  "DT Trucks – Your Number One Isuzu Dealer in London & Essex";

export const DEALER_STATS = [
  { value: "96%", label: "Parts first-time pick" },
  { value: "131", label: "Years combined experience" },
  { value: "150+", label: "Fleet vehicles maintained" },
  { value: "2 Year", label: "Parts warranty" },
];

export const DEALER_INSIGHTS = [
  {
    icon: "verified",
    title: "Authorised Isuzu expertise",
    summary:
      "Expert servicing, genuine parts, and complete transport solutions with decades of experience and state-of-the-art diagnostic equipment.",
    points: ["London & Essex dealership", "Vehicles always in the safest hands"],
  },
  {
    icon: "local_shipping",
    title: "Every fleet size",
    summary:
      "From single operators to fleets of over 150 trucks  -  bulb replacements to full engine rebuilds, handled with precision.",
    points: ["No job too big or small", "High-volume fleet maintenance"],
  },
  {
    icon: "inventory_2",
    title: "Total parts solution",
    summary:
      "Genuine Isuzu parts and accessories  -  from everyday items to air conditioning kits and rear axle suspension conversions.",
    points: ["Authorised main dealer", "Complete transport solution"],
  },
  {
    icon: "speed",
    title: "Uptime & Isuzu Care",
    summary:
      "96% first-time pick rate on parts for fast turnaround. Isuzu Care programme: 2-year warranty on genuine parts.",
    points: ["Maximise earning potential", "Competitive fast-moving stock"],
  },
];

export type HomePillar = {
  id: string;
  icon: string;
  badge?: string;
  title: string;
  lead: string;
  bullets: string[];
  cta: { label: string; href: string };
  darkCta?: boolean;
};

export const HOME_PILLARS: HomePillar[] = [
  {
    id: "parts",
    icon: "inventory_2",
    badge: "2 Year Warranty on all Parts",
    title: "Parts",
    lead: "Comprehensive genuine Isuzu parts with industry-leading availability across London and Essex.",
    bullets: [
      "Typically over 95% first-time pick availability",
      "Order before 6:00pm  -  on premises by 12pm next day (99% guarantee)",
      "Service items for NKR, NPR, NQR, Grafter and Forward range",
      "Wide range of genuine accessories and conversion parts",
    ],
    cta: { label: "Enquire about Parts", href: "/contact" },
  },
  {
    id: "sales",
    icon: "storefront",
    title: "Sales",
    lead: "3.5 to 13.5 tonnes GVW  -  trucks that drivers enjoy and companies rely on every day.",
    bullets: [
      "Class-leading body and payload allowance",
      "Excellent fuel economy and 3-year unlimited mileage warranty",
      "Manoeuvrable and easy to drive",
      "Tested in extreme climates  -  strong, safe, comfortable cabs",
    ],
    cta: { label: "View Truck Range", href: "/sales" },
  },
  {
    id: "workshop",
    icon: "build_circle",
    title: "Fully Equipped Workshop",
    lead: "High-technology workshop with IRTEC-accredited Master technicians and tachograph calibration.",
    bullets: [
      "6 service bays and 21 employees",
      "4 Master techs, IRTEC accredited",
      "5 tachograph-trained technicians with stock heads and sender units",
      "Technicians aged 19–62  -  131 years combined experience",
      "Any make: car-derived vans up to 18m 44-tonne",
    ],
    cta: { label: "Book Service", href: "/service" },
    darkCta: true,
  },
];

export const SPECIALIST_SERVICES = [
  {
    icon: "emergency",
    title: "A&E, PTS & Specialist Fleets",
    summary:
      "Unmatched expertise for emergency and patient transport  -  fast, reliable maintenance across East and North London.",
    href: "/specialist-applications",
    featured: true,
  },
  {
    icon: "assignment_turned_in",
    title: "VOSA “O” Licence Inspections",
    summary:
      "IRTEC-approved planned maintenance with rolling road brake tester, emissions and headlight calibration.",
    href: "/service/roller-brake-testing",
    featured: true,
  },
  {
    icon: "ac_unit",
    title: "Air Conditioning",
    summary: "Top-of-the-range equipment for vans, trucks, refrigerated and specialist units.",
    href: "/service",
    featured: false,
  },
  {
    icon: "support_agent",
    title: "24/7 Roadside Breakdown",
    summary: "Under 90 minutes response, 365 days a year.",
    href: "/service/roadside-breakdown",
    featured: false,
  },
  {
    icon: "shutter_speed",
    title: "Tachograph Calibration",
    summary: "DVSA-approved smart Gen1/Gen2, digital and analogue.",
    href: "/service/tachograph-calibrations",
    featured: false,
  },
  {
    icon: "tire_repair",
    title: "Roller Brake Testing",
    summary: "HGV trucks and trailers  -  Operator Licensing compliance.",
    href: "/service/roller-brake-testing",
    featured: false,
  },
];
