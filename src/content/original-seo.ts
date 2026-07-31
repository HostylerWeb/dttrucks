/**
 * Meta titles and descriptions from the original dttrucks.com site.
 * Use absolute titles in metadata so the root layout template is not applied.
 */
export const originalPageSeo = {
  home: {
    title: "DT Trucks - Isuzu Sales, Parts and Servicing - Official Isuzu Dealer",
    description:
      "Looking for reliable van and truck servicing, repairs, or replacement vehicles? DT Trucks Limited offers professional commercial vehicle solutions for fleets ranging from 3.5 tonne to 44 tonne and beyond! Trust our experienced team to keep your vehicles roadworthy and efficient.",
  },
  about: {
    title: "About Us - DT Trucks - Get to know your Isuzu Dealership",
    description:
      "Welcome to DT Trucks about us page, here you will find some information about DT Trucks including how we were founded, who runs the company.",
  },
  contact: {
    title: "Contact - DT Trucks - Isuzu Dealership",
    description:
      "Welcome to our contact page, on this page you will find the necessary contact details to get in touch with DT Trucks, you can also submit an email.",
  },
  sales: {
    title: "DT Trucks Barking - Isuzu Sales, Service and repairs!",
    description:
      "DT Trucks Barking offer Sales, Repairs and servicing, we take care of our customers and make customer satisfaction our number one priority.",
  },
  service: {
    title: "DT Trucks Barking - Isuzu Sales, Service and repairs!",
    description:
      "DT Trucks Barking offer Sales, Repairs and servicing, we take care of our customers and make customer satisfaction our number one priority.",
  },
  "specialist-applications": {
    title: "Specialist Applications - DT Trucks - Isuzu Dealership",
    description:
      "DT Trucks Limited provides specialist maintenance for Isuzu Trucks, aviation ground equipment, UXO survey equipment, plant equipment, etc!",
  },
  ebay: {
    title: "eBay Listings - DT Trucks - Isuzu Dealership",
    description:
      "Check out some of our listings we have on ebay, you can purchase trucks directly from ebay. We also sell truck parts for your Isuzu truck.",
  },
  blog: {
    title: "Latest News & Updates - DT Trucks - Isuzu Dealership",
    description:
      "Welcome to our blog, here you will find the latest information regarding Isuzu trucks and parts. We like to update our blog regularly so be sure to return.",
  },
  careers: {
    title: "Careers - DT Trucks - Isuzu Dealership",
    description:
      "Join DT Trucks in Barking, Essex. View current job openings in workshop, sales and fleet support.",
  },
  "terms-conditions": {
    title: "Terms & Conditions - DT Trucks Ltd",
    description:
      "Terms and conditions for DT Trucks Limited, authorised Isuzu dealer in Barking, Essex.",
  },
  "conditions-of-sale": {
    title: "Conditions of Sale - DT Trucks - Isuzu Dealership",
    description:
      "Please read our Conditions of sale before purchasing from us, this will outline the service you will recieve during the purchase.",
  },
  gdpr: {
    title: "General Data Protection Regulation (GDPR) - DT Trucks - Isuzu Dealership",
    description:
      "DT Trucks privacy and GDPR information for customers and website visitors.",
  },
} as const;

export type OriginalPageSlug = keyof typeof originalPageSeo;
