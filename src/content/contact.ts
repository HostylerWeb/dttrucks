export const CONTACT_INTRO = [
  "Welcome to our contact page - here you'll find phone numbers, email and our Barking workshop address. Use the form for sales enquiries, service bookings or general questions.",
  "Your feedback matters. Without your feedback, positive or negative, we wouldn't be where we are today - please share your experience with us.",
];

export const CONTACT_RESPONSE_NOTE =
  "We operate five business days a week and aim to respond within 24 hours. During busy periods please allow up to 48 hours before following up.";

export const CONTACT_DEPARTMENTS = [
  {
    id: "sales",
    label: "Sales",
    icon: "local_shipping",
    description: "New and used Isuzu trucks, driveaways and fleet enquiries.",
    href: "/sales",
  },
  {
    id: "parts",
    label: "Parts",
    icon: "inventory_2",
    description: "Genuine Isuzu parts and accessories - 96% first-time pick rate.",
    href: "/service",
  },
  {
    id: "service",
    label: "Service",
    icon: "build",
    description: "Workshop servicing, tachographs, roadside and fleet support.",
    href: "/service",
  },
] as const;
