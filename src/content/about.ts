export const ABOUT_HIGHLIGHTS = [
  {
    icon: "verified",
    title: "Authorised Isuzu Main Dealer",
    description: "Genuine parts, factory-trained technicians, and dealer-backed warranties in Barking, Essex.",
  },
  {
    icon: "handshake",
    title: "Transparency & trust",
    description: "Whether you run one van or a 150-truck fleet, you deal directly with people who know your business.",
  },
  {
    icon: "build",
    title: "After-sales that lasts",
    description: "Workshop, parts, roadside and sales under one roof - support that continues long after you drive away.",
  },
];

export const ABOUT_TIMELINE = [
  {
    year: "1995",
    title: "Eastley Commercials",
    description:
      "Derek Tansley and George Smith launch Eastley Commercials and take on the Isuzu Truck (UK) brand with 3.5t and 6.2t chassis.",
  },
  {
    year: "2000s",
    title: "National sales leadership",
    description:
      "The range grows to 7.5t, twin rear wheel 3.5t, 5.5t, 6.5t, 11t and 13.5t - consistently top three nationally for Isuzu sales.",
  },
  {
    year: "2004",
    title: "Separate paths",
    description:
      "Partners pursue separate ventures - Derek with Isuzu Service & Parts, George with further Isuzu involvement.",
  },
  {
    year: "2015",
    title: "Reunited in Barking",
    description:
      "Derek and George reunite to establish the new Isuzu dealership in North London - sales, service and parts in Barking.",
  },
  {
    year: "Today",
    title: "Innovation & sustainability",
    description:
      "Launch of the Isuzu N35.125 Green - Euro 6 1.9-litre engine, upgraded suspension and 6-speed gearbox.",
  },
];

export const ABOUT_STATS = [
  { value: "1995", label: "Dealership roots" },
  { value: "Top 3", label: "National Isuzu sales" },
  { value: "30+", label: "Years in commercial vehicles" },
  { value: "2015", label: "Reunited in Barking" },
];

export const ABOUT_INTRO = [
  "DT Trucks is proud to be a leading supplier of quality commercial vehicles, specialising in new and used trucks, HGVs, and fleet solutions across the UK. Founded with a commitment to reliability and customer care, our dealership is run by a passionate team dedicated to helping businesses find the right vehicle for their needs. On this page, you'll learn about our journey, the people behind the brand, and a few facts that make us stand out.",
  "Whether you're investing in a single truck or managing a full fleet, knowing who you're buying from matters. We prioritise transparency, expert guidance, and after-sales support to ensure every customer feels confident and cared for. If you ever need assistance, our team is just a message away - and for instant help, you can use our live chat feature in the bottom right corner of the page.",
];

export const ABOUT_FOUNDED_PARAGRAPHS = [
  "The roots of our Isuzu dealership date back to 1995, when Derek Tansley and George Smith launched Eastley Commercials and proudly took on the Isuzu Truck (UK) brand. At the time, Isuzu had just entered the UK market, offering a modest range that included a 3.5-tonne single rear wheel chassis and a 6.2-tonne chassis. Thanks to their dedication and exceptional customer care, Derek and George quickly built a strong reputation - consistently ranking in the top three for national sales.",
  "As Isuzu Truck expanded its UK lineup, new models were introduced: a 7.5-tonne chassis, a twin rear wheel 3.5-tonne option, and later a 5.5-tonne variant. The original 6.2-tonne evolved into a 6.5-tonne, and the range now includes 11-tonne and 13.5-tonne chassis options, along with various pre-bodied configurations to meet diverse commercial needs.",
  "In 2004, the partners pursued separate paths - Derek continued with an Isuzu Service & Parts dealership, while George remained active in other ventures, including further involvement with Isuzu. In 2015, they reunited to establish a new Isuzu dealership in North London, now proudly offering Isuzu truck sales, servicing, and genuine parts in Barking.",
  "Today, our business continues to grow, embracing innovation and sustainability. We recently launched the Isuzu N35.125 Green model, featuring a Euro 6-compliant 1.9-litre engine, upgraded front suspension, and a 6-speed gearbox. With more models in development, we remain committed to delivering reliable, fuel-efficient trucks backed by expert support and customer-first service.",
];

export const ABOUT_IMAGES = {
  logo: {
    src: "/media/about/dt-trucks-logo.png",
    alt: "DT Trucks - Isuzu Dealership",
    width: 433,
    height: 91,
  },
  eastley: {
    src: "/media/about/eastley-commercials.jpg",
    alt: "DT Trucks beginning - Eastley Commercials",
    width: 730,
    height: 430,
  },
  team: {
    src: "/media/about/dt-trucks-new.jpg",
    alt: "DT Trucks new team",
    width: 725,
    height: 430,
  },
};

export type AboutTeamMember = {
  name: string;
  qualifications?: string;
  role: string;
  bio: string;
};

export const ABOUT_TEAM: AboutTeamMember[] = [
  {
    name: "Derek Tansley",
    qualifications: "FIMI MIRTE MSOE",
    role: "Managing Director",
    bio:
      "Started as a technician's apprentice and soon advanced to fully skilled then realised that the best way to further his career was to start his own commercial vehicle garage. For many years he built the business into a successful enterprise. Responsible for overseeing the business especially the operations.",
  },
  {
    name: "George Smith",
    qualifications: "FIMI",
    role: "Sales Director",
    bio:
      "Began working in the family car repair business, then into the Fruit & Veg sector as Managing Director of a Wholesaler in New Covent Garden Market. Responsible for sales & general management.",
  },
  {
    name: "John Skinner",
    role: "General Manager / Service Manager",
    bio:
      "John started as an apprentice at 17 years of age and has since worked his way up to Master Technician and recently secured the General Manager's role at DT Trucks.",
  },
  {
    name: "Ian Scrogie",
    qualifications: "MAAT",
    role: "Accounts Manager",
    bio:
      "Ian has been with the company since 2013. Ian holds over 20 years of experience in this sector. He oversees all financial responsibility within the company.",
  },
  {
    name: "Kimberley Perkins",
    role: "Admin Manager",
    bio:
      "Kimberley has been with DT Trucks since 2013 and has previous experience in commercial vehicle administration. Responsible for all Administration, Invoicing, warranty etc. and overseeing the office. Proactively assists in the growth of the company and customer care.",
  },
];
