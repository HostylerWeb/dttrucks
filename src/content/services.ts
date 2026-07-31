export type ServiceEnquiryType = "service" | "tachograph" | "specialist";

export type ServiceSection = {
  title: string;
  intro?: string;
  items: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceHighlight = {
  label: string;
  value: string;
};

export type ServiceDefinition = {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  featured: boolean;
  sortOrder: number;
  metaTitle: string;
  metaDescription: string;
  enquiryType: ServiceEnquiryType;
  badge?: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
  /** Opening paragraphs  -  primary page copy from the live site */
  paragraphs: string[];
  bullets?: string[];
  sections?: ServiceSection[];
  faqs?: ServiceFaq[];
  highlights?: ServiceHighlight[];
};

const HERO_TRUCK = "/media/home/hero-3-in-range.jpg";
const HERO_WORKSHOP = "/media/about/eastley-commercials.jpg";
const HERO_TEAM = "/media/about/dt-trucks-new.jpg";

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "workshop",
    title: "Test Centre & Workshop",
    shortDescription:
      "Fully equipped workshop with IRTEC-accredited Master technicians  -  vans to 44-tonne.",
    icon: "build",
    featured: true,
    sortOrder: 1,
    metaTitle: "Test Centre & Workshop | DT Trucks Barking",
    metaDescription:
      "High technology workshop at Castle Works, Barking. IRTEC-accredited technicians servicing Isuzu and any commercial vehicle from vans to 18m 44-tonne.",
    enquiryType: "service",
    badge: "IRTEC Accredited",
    heroImage: HERO_WORKSHOP,
    heroImageAlt: "DT Trucks workshop at Castle Works, Barking",
    highlights: [
      { label: "Service bays", value: "10" },
      { label: "Employees", value: "30" },
      { label: "Master technicians", value: "4" },
      { label: "Tachograph technicians", value: "5" },
    ],
    paragraphs: [
      "Our fully equipped, high technology workshop facility has 10 service bays and 30 employees, 4 of which are Master techs and IRTEC accredited. There are 5 tachograph-trained technicians. Our technicians are between 19 and 62 years of age  -  a combined experience of 131 years. This enables us to cover all your servicing and general maintenance needs.",
      "We can service and repair your Isuzu truck (or any other make of vehicle) from car-derived vans up to 18m 44-tonne. Whether you run a single van or a large LGV fleet, we tailor packages to keep your vehicles roadworthy with minimal downtime.",
    ],
    bullets: [
      "10 service bays and 30 employees",
      "4 Master technicians, IRTEC accredited",
      "5 tachograph-trained technicians",
      "Technicians aged 19–62  -  131 years combined experience",
      "Any make: car-derived vans up to 18m 44-tonne",
      "Fully committed to the Isuzu Care programme",
    ],
  },
  {
    slug: "isuzu-trained-technicians",
    title: "Isuzu Trained Technicians",
    shortDescription:
      "Factory-trained technicians with Isuzu’s latest diagnostic equipment.",
    icon: "engineering",
    featured: true,
    sortOrder: 2,
    metaTitle: "Isuzu Trained Technicians | DT Trucks",
    metaDescription:
      "Isuzu trained technicians with the latest computer diagnostic equipment for engines, transmissions, steering, braking, suspension and electrics.",
    enquiryType: "service",
    heroImage: HERO_WORKSHOP,
    heroImageAlt: "Isuzu trained technicians at DT Trucks",
    paragraphs: [
      "Our team of professional technicians are trained to the highest standards demanded by Isuzu Truck, assuring you of an efficient and high quality service every time.",
      "With Isuzu’s latest computer diagnostic equipment we can fully interrogate the vehicle and provide specialist expertise on engines, transmissions, steering, braking systems, suspension and electrics.",
    ],
    bullets: [
      "Highest standards demanded by Isuzu Truck",
      "Latest computer diagnostic equipment",
      "Engines, transmissions, steering and braking systems",
      "Suspension and electrics diagnostics",
      "Genuine parts and manufacturer-approved procedures",
    ],
  },
  {
    slug: "tachograph-calibrations",
    title: "Tachograph Centre",
    shortDescription: "DVSA-approved smart, digital and analogue calibration.",
    icon: "speed",
    featured: true,
    sortOrder: 3,
    metaTitle: "Tachograph Calibrations Barking - DT Trucks - Isuzu Dealership",
    metaDescription:
      "Tachograph Calibration in Essex | DVSA-Approved Smart & Digital Testing – DT Trucks",
    enquiryType: "tachograph",
    heroSubtitle: "Smart · Digital · Analogue · DVSA-Approved",
    badge: "DVSA Approved",
    heroImage: HERO_WORKSHOP,
    heroImageAlt: "Tachograph calibration centre at DT Trucks Barking",
    highlights: [
      { label: "Approval", value: "DVSA" },
      { label: "Systems", value: "Gen1 & Gen2" },
      { label: "Compliance", value: "O-Licence" },
      { label: "Coverage", value: "South East" },
    ],
    paragraphs: [
      "At DT Trucks, we deliver DVSA-approved tachograph calibration for smart, digital and analogue systems, ensuring full compliance for HGVs, trailers and fleet vehicles. Our specialist technicians provide fast, accurate testing using industry-leading equipment, supporting operators across Barking, Essex and the wider South East.",
      "Whether you manage a single vehicle or a full fleet, we help you stay compliant with O-Licence inspection requirements, DVSA standards and EU tachograph regulations.",
      "We have a fully equipped tachograph calibration centre and stock a wide selection of tachograph heads and sender units, along with Gen 2 Smart Tachograph equipment and consumables to keep you on the road.",
    ],
    sections: [
      {
        title: "Smart Tachograph Calibration (Gen1 & Gen2)",
        intro:
          "Smart tachographs are now standard across modern HGVs, and our workshop is fully equipped to calibrate, test and verify both Gen1 and Gen2 systems.",
        items: [
          "Full calibration and accuracy checks",
          "Sensor and motion data verification",
          "Fault diagnosis and repairs",
          "Replacement smart tachograph units",
          "Compliance checks for O-Licence inspections",
        ],
      },
      {
        title: "Digital Tachograph Calibration",
        intro:
          "Complete digital tachograph calibration for all major manufacturers  -  from routine checks to full system replacements. Ideal for operators running mixed-age fleets across the South East.",
        items: [
          "Digital head calibration",
          "Printer testing and verification",
          "Data accuracy checks",
          "Fault finding and repairs",
          "DVSA-approved compliance testing",
        ],
      },
      {
        title: "Units, consumables & accessories in stock",
        intro:
          "DT Trucks carries a full range of tachograph equipment, ready for immediate installation or collection.",
        items: [
          "Smart tachograph units (Gen1 & Gen2)",
          "Digital tachograph heads",
          "Printer rolls",
          "Sensors and sender units",
          "Seals, cables and installation components",
        ],
      },
    ],
    faqs: [
      {
        question: "How often does my tachograph need calibrating?",
        answer:
          "Every 2 years, or sooner after repairs affecting the system, tyre size changes, or tachograph faults.",
      },
      {
        question: "Do smart tachographs need different calibration?",
        answer:
          "Yes. Smart tachographs (Gen1 & Gen2) require specialist equipment. DT Trucks is fully equipped to calibrate and test both generations.",
      },
      {
        question: "Can you replace faulty tachograph units?",
        answer:
          "Yes. We stock smart, digital and analogue tachograph heads, along with required accessories and consumables.",
      },
      {
        question: "Is calibration required for O-Licence compliance?",
        answer:
          "Yes. Regular tachograph calibration is mandatory under DVSA and Operator Licence inspection rules.",
      },
      {
        question: "Do you offer fleet support?",
        answer:
          "Yes  -  we support fleets of all sizes across Essex and the South East with scheduled tachograph testing and compliance management.",
      },
    ],
  },
  {
    slug: "roadside-breakdown",
    title: "24/7 Roadside Breakdown Assistance",
    shortDescription: "Phone call to kerbside in under 90 minutes, 365 days a year.",
    icon: "local_shipping",
    featured: true,
    sortOrder: 4,
    metaTitle: "24/7 Roadside Breakdown | DT Trucks",
    metaDescription:
      "24/7/365 roadside breakdown assistance with multiple fully equipped service vehicles. Phone call to kerbside in under 90 minutes.",
    enquiryType: "service",
    heroImage: HERO_TRUCK,
    heroImageAlt: "Isuzu commercial truck  -  DT Trucks roadside assistance",
    highlights: [
      { label: "Coverage", value: "24/7/365" },
      { label: "Response", value: "< 90 min" },
      { label: "Service vehicles", value: "Fully equipped" },
    ],
    paragraphs: [
      "24 hours a day, 7 days a week, 365 days a year we keep you covered. We have multiple fully equipped and vastly stocked service vehicles to keep you on the road.",
      "From phone call to kerbside in under 90 minutes. We understand the importance of your valuable asset  -  and the cost of every minute off the road.",
    ],
    bullets: [
      "24/7/365 coverage across London and Essex",
      "Multiple fully equipped service vehicles",
      "Phone call to kerbside in under 90 minutes",
      "Experienced commercial vehicle technicians",
    ],
  },
  {
    slug: "on-site-maintenance",
    title: "On-Site Maintenance",
    shortDescription: "Safety inspections, servicing and repairs at your premises.",
    icon: "home_repair_service",
    featured: true,
    sortOrder: 5,
    metaTitle: "On-Site Fleet Maintenance | DT Trucks",
    metaDescription:
      "On-premises maintenance for large fleets including safety inspections, servicing and repairs. Barking is Service HQ.",
    enquiryType: "service",
    heroImage: HERO_TRUCK,
    heroImageAlt: "Fleet maintenance  -  DT Trucks",
    paragraphs: [
      "Barking is our Service HQ. However, should you have maintenance that is more suited to be carried out on your premises, we can arrange this  -  from safety inspections to servicing or even repairs.",
      "This service is desirable to customers who run a large fleet of vehicles where yard resources are stretched. We bring workshop capability to you so your fleet stays productive.",
    ],
    bullets: [
      "Barking remains Service HQ",
      "On-premises maintenance for large fleets",
      "Safety inspections, servicing and repairs",
      "Tailored packages from one vehicle to hundreds of LGVs",
    ],
  },
  {
    slug: "specialist-vehicles",
    title: "Specialist Vehicles & Plant",
    shortDescription: "UXO, PTS, Blue Light, aviation ground equipment and plant.",
    icon: "precision_manufacturing",
    featured: true,
    sortOrder: 6,
    metaTitle: "Specialist Vehicles & Plant | DT Trucks",
    metaDescription:
      "Maintenance for UXO survey and disposal vehicles, PTS & Blue Light adaptations, aviation ground equipment and specialist plant.",
    enquiryType: "specialist",
    heroImage: HERO_TEAM,
    heroImageAlt: "DT Trucks specialist vehicle team",
    paragraphs: [
      "You thought Isuzu was all we know? Wrong. DT Trucks are extremely knowledgeable on Isuzu and also specialist equipment  -  from UXO survey and disposal vehicles, to specialist adaptations for PTS and Blue Light vehicles.",
      "DT Trucks maintain a vast array of specialist vehicles including aviation ground equipment. Get in contact with us with a challenge  -  we enhance reliability and longevity for niche fleets across the UK.",
    ],
    sections: [
      {
        title: "Equipment we maintain",
        items: [
          "UXO survey and disposal vehicles",
          "PTS and Blue Light vehicle adaptations",
          "Aviation ground equipment",
          "Plant equipment",
          "Other specialist commercial applications",
        ],
      },
      {
        title: "Coverage",
        items: [
          "Outstanding service across the UK",
          "International support in exceptional cases",
          "Preferred partner for specialised maintenance and repair",
        ],
      },
    ],
  },
  {
    slug: "air-conditioning",
    title: "Air Conditioning Recharge",
    shortDescription: "Passenger cars to 44-tonne HGV tractor units and refrigerated systems.",
    icon: "ac_unit",
    featured: false,
    sortOrder: 7,
    metaTitle: "Air Conditioning Recharge | DT Trucks",
    metaDescription:
      "Air conditioning recharge for all vehicle types including refrigerated systems. Certified technicians, fleet-ready.",
    enquiryType: "service",
    heroImage: HERO_WORKSHOP,
    heroImageAlt: "Air conditioning service at DT Trucks workshop",
    paragraphs: [
      "As a trusted Isuzu dealership, we specialise in professional air conditioning recharge services for all vehicle types  -  from passenger cars to 44-tonne HGV tractor units, and even select refrigerated systems.",
      "Our certified technicians ensure optimal cooling performance and system efficiency, helping fleets stay road-ready and compliant. Whether you’re servicing a single vehicle or managing a commercial fleet, our air-con solutions are fast, reliable, and tailored to your needs.",
    ],
    bullets: [
      "All vehicle types: passenger cars to 44-tonne HGV tractor units",
      "Select refrigerated systems",
      "Certified technicians, fleet-ready",
      "Fast turnaround for commercial operators",
    ],
  },
  {
    slug: "roller-brake-testing",
    title: "Roller Brake Testing",
    shortDescription: "HGV truck and trailer testing for Operator Licensing and DVSA compliance.",
    icon: "tire_repair",
    featured: false,
    sortOrder: 8,
    metaTitle: "Roller Brake Testing | DT Trucks",
    metaDescription:
      "HGV truck and trailer roller brake testing for Operator Licensing inspection standards and DVSA safety compliance.",
    enquiryType: "service",
    heroImage: HERO_WORKSHOP,
    heroImageAlt: "Roller brake testing at DT Trucks",
    paragraphs: [
      "We offer professional roller brake testing for HGV trucks and trailers, providing accurate and reliable results to keep your vehicles compliant and road-safe.",
      "Roller brake testing is now a required part of inspection standards for Operator Licensing, ensuring your fleet meets DVSA safety expectations. Book alongside workshop servicing at our Barking facility.",
    ],
    bullets: [
      "HGV trucks and trailers",
      "Required for Operator Licensing inspection standards",
      "DVSA safety compliance",
      "Available with workshop servicing at Barking",
    ],
  },
];

export const SERVICE_INDEX_INTRO =
  "DT Trucks is THE ONE-STOP REPAIR SHOP. Although we specialise in ISUZU Trucks we can maintain ANY vehicle. We always listen to you, the customer and realise that a fleet can mean one car derived van, or anything up to many hundreds of LGVs  -  therefore everyone needs a package tailor-made for them as individuals. We are fully committed to the ISUZU CARE Programme.";

export const SERVICE_INDEX_PARAGRAPHS = [
  SERVICE_INDEX_INTRO,
  "Our workshop at Castle Works, Barking supports fleets across London and Essex with IRTEC-accredited technicians, a DVSA-approved tachograph centre, 24/7 roadside cover, and genuine Isuzu parts with a strong first-time pick rate.",
];

export function getAllServices() {
  return [...SERVICES].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceSlugs() {
  return SERVICES.map((s) => s.slug);
}

export function getRelatedServices(slug: string, limit = 3) {
  return getAllServices().filter((s) => s.slug !== slug).slice(0, limit);
}
