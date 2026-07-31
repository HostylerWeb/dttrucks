import { prisma } from "@/lib/prisma";
import type { content_status } from "../../src/generated/prisma/client";

type TruckModelSeed = {
  slug: string;
  name: string;
  model_code?: string;
  description: string;
  category_slug: string;
  sort_order: number;
  is_driveaway?: boolean;
  driveaway_type?: string;
  image_url?: string;
  specifications?: Record<string, string>;
};

const IMG = {
  gvw35: "/media/sales/3.5-tonnes-GVW.jpg",
  gvw55: "/media/sales/5.5-6.5-tonnes-GVW.jpg",
  gvw75: "/media/sales/7.5-tonnes-GVW.jpg",
  gvw11: "/media/sales/11-13.5-tonnes-GVW.jpg",
  tipper35: "/media/sales/Isuzu-3.5-Tonne-Tipper.jpg",
  tipper75: "/media/sales/Isuzu-7.5-Tonne-Tipper.jpg",
  dropside35: "/media/sales/Isuzu-3.5-Tonne-Dropside.jpg",
  utilitruck: "/media/sales/Isuzu-3.5-Tonne-Utilitruck.jpg",
  dropside75: "/media/sales/Isuzu-7.5-Tonne-Dropside.jpg",
  box75: "/media/sales/Isuzu-7.5-Tonne-Box.jpg",
  curtainsider: "/media/sales/Isuzu-7.5-Tonne-Curtainsider.jpg",
};

const truckModels: TruckModelSeed[] = [
  {
    category_slug: "3-5t-gvw",
    slug: "n35-125-grafter",
    name: "N35.125 Grafter Green",
    model_code: "N35.125",
    description:
      "The 3.5t Grafter is a light truck that’s more than capable of handling a busy workload. Named Best Builders’ Truck seven years in a row by Trade Van Driver. The 1.9 litre, 123PS Grafter Green (N35.125) comes with single or twin rear wheels, can tow 3.5 tonnes, and is available with short lead times as part of our Driveaway range.",
    sort_order: 1,
    image_url: IMG.gvw35,
    specifications: { engine: "1.9L 123PS", gvw: "3.5t" },
  },
  {
    category_slug: "3-5t-gvw",
    slug: "n35-150-grafter",
    name: "N35.150 Grafter Blue",
    model_code: "N35.150",
    description:
      "The 3.0 litre, 150PS Grafter Blue (N35.150) sits alongside the Grafter Green in the award-winning 3.5t range. Single or twin rear wheels, 3.5-tonne towing capability, and short lead times via our Driveaway programme.",
    sort_order: 2,
    image_url: IMG.gvw35,
    specifications: { engine: "3.0L 150PS", gvw: "3.5t" },
  },
  {
    category_slug: "5-5-6-5t-gvw",
    slug: "n55-150",
    name: "N55.150",
    model_code: "N55.150",
    description:
      "For customers who need more payload but still want the compact cab and body design of our award-winning Grafter range, a 5.5t truck could be the answer. Popular with arborists, breweries and local authorities. The N55 even has a narrow cab option.",
    sort_order: 1,
    image_url: IMG.gvw55,
    specifications: { gvw: "5.5t" },
  },
  {
    category_slug: "5-5-6-5t-gvw",
    slug: "n65-150",
    name: "N65.150",
    model_code: "N65.150",
    description:
      "The N65 offers a step up in payload without the extra size and weight normally associated with larger trucks. Available with a standard manual gearbox or our popular Easyshift automated transmission.",
    sort_order: 2,
    image_url: IMG.gvw55,
    specifications: { gvw: "6.5t" },
  },
  {
    category_slug: "7-5t-gvw",
    slug: "n75-150",
    name: "N75.150",
    model_code: "N75.150",
    description:
      "For customers who carry out low mileage, urban deliveries, the N75.150 features a more efficient 3.0 litre engine. Part of our market-leading 7.5t range trusted for distribution, local delivery and plant hire.",
    sort_order: 1,
    image_url: IMG.gvw75,
    specifications: { engine: "3.0L", gvw: "7.5t" },
  },
  {
    category_slug: "7-5t-gvw",
    slug: "n75-190-forward",
    name: "N75.190 Forward",
    model_code: "N75.190",
    description:
      "Our N75 Forward range includes standard day cab and crew cab versions of our popular 5.2 litre N75.190 truck, as well as manual and Easyshift options. Outstanding payload and reliability for weight-critical applications including recovery.",
    sort_order: 2,
    image_url: IMG.gvw75,
    specifications: { engine: "5.2L 190PS", gvw: "7.5t" },
  },
  {
    category_slug: "11-13-5t-gvw",
    slug: "f110-210",
    name: "F110.210",
    model_code: "F110.210",
    description:
      "Our F-Series 11t trucks offer ‘big truck’ performance with a ‘small truck’ footprint. Well suited to tipper and beavertail operations, with a compact cab and lower chassis design for driver comfort - the ideal step up from N-Series.",
    sort_order: 1,
    image_url: IMG.gvw11,
    specifications: { gvw: "11t" },
  },
  {
    category_slug: "11-13-5t-gvw",
    slug: "f135-240",
    name: "F135.240",
    model_code: "F135.240",
    description:
      "At 13.5 tonnes we offer an Easyshift vehicle that’s ideal for scaffolders and box or curtainside applications. Lightweight option at the heavier weight ranges, still capable in the most demanding locations.",
    sort_order: 2,
    image_url: IMG.gvw11,
    specifications: { gvw: "13.5t" },
  },
  {
    category_slug: "driveaway",
    slug: "driveaway-3-5t-tipper",
    name: "3.5 Tonne TIPPER",
    description:
      "A reliable tipper can quickly become one of your business’s most valuable assets. Designed to withstand daily life on site, our 3.5T tippers are reliable workmates. Models: N35.125(S), N35.125(T), N35.150(T).",
    is_driveaway: true,
    driveaway_type: "tipper",
    sort_order: 1,
    image_url: IMG.tipper35,
  },
  {
    category_slug: "driveaway",
    slug: "driveaway-7-5t-tipper",
    name: "7.5 Tonne TIPPER",
    description:
      "The bigger brother of our popular 3.5T tipper - an efficient, reliable workhorse with impressive payload. Compact and easier to manoeuvre than many rivals, with Easyshift to minimise driver fatigue. Models: N75.150(E), N75.190(E).",
    is_driveaway: true,
    driveaway_type: "tipper",
    sort_order: 2,
    image_url: IMG.tipper75,
  },
  {
    category_slug: "driveaway",
    slug: "driveaway-3-5t-dropside",
    name: "3.5 Tonne DROPSIDE",
    description:
      "Available in two body lengths, our lightweight driveaway dropsiders are versatile and reliable. Landscape gardeners, scaffolders and plant hire companies already enjoy the benefits. Model: N35.125(T).",
    is_driveaway: true,
    driveaway_type: "dropside",
    sort_order: 3,
    image_url: IMG.dropside35,
  },
  {
    category_slug: "driveaway",
    slug: "driveaway-3-5t-utilitruck",
    name: "3.5 Tonne UTILITRUCK",
    description:
      "The latest vehicle in our Driveaway range - a 3.5t Utilitruck with a lockable toolpod to keep tools and equipment safe. Ideal for companies that need a tipper with added security throughout the working day. Model: N35.125(T).",
    is_driveaway: true,
    driveaway_type: "utilitruck",
    sort_order: 4,
    image_url: IMG.utilitruck,
  },
  {
    category_slug: "driveaway",
    slug: "driveaway-7-5t-dropside",
    name: "7.5 Tonne DROPSIDE",
    description:
      "Double dropside bodies give good flexibility for various transportation requirements, available in both 150 and 190 chassis options. Payload from 4,000kg. Models: N75.150(E), N75.190(E).",
    is_driveaway: true,
    driveaway_type: "dropside",
    sort_order: 5,
    image_url: IMG.dropside75,
  },
  {
    category_slug: "driveaway",
    slug: "driveaway-7-5t-box",
    name: "7.5 Tonne BOX",
    description:
      "7.5t Isuzu boxes form the backbone of many delivery fleets. Available with column or tuckaway tail lift options; both have a 5.2 litre, 190PS engine for mid and longer distance haulage. Models: N75.190(E) BOX COLUMN / BOX TUCKAWAY.",
    is_driveaway: true,
    driveaway_type: "box",
    sort_order: 6,
    image_url: IMG.box75,
  },
  {
    category_slug: "driveaway",
    slug: "driveaway-7-5t-curtainsider",
    name: "7.5 Tonne CURTAINSIDER",
    description:
      "Curtainsiders are so popular for our 7.5t customers that we added them to Driveaway. Combined with low chassis height and Easyshift on the N75.190(E), our 7.5t Curtainsider is an efficient, reliable performer. Model: N75.190(E) CURTAINSIDE TUCKAWAY.",
    is_driveaway: true,
    driveaway_type: "curtainsider",
    sort_order: 7,
    image_url: IMG.curtainsider,
  },
];

export async function seedTruckModels(status: content_status) {
  const categories = await prisma.truck_categories.findMany();
  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  for (const model of truckModels) {
    const category = bySlug[model.category_slug];
    if (!category) continue;

    const data = {
      name: model.name,
      model_code: model.model_code ?? null,
      description: model.description,
      category_id: category.id,
      sort_order: model.sort_order,
      is_driveaway: model.is_driveaway ?? false,
      driveaway_type: model.driveaway_type ?? null,
      image_url: model.image_url ?? null,
      specifications: model.specifications ? JSON.stringify(model.specifications) : null,
      status,
      published_at: new Date(),
    };

    await prisma.truck_models.upsert({
      where: { slug: model.slug },
      update: data,
      create: { ...data, slug: model.slug },
    });
  }
}

export const homepageVideos = [
  { title: "The Isuzu Production Facility", youtube_id: "xvZqHgFz51I", sort_order: 1 },
  { title: "Behind the Scenes at Isuzu Truck", youtube_id: "Wme3J2SYT3s", sort_order: 2 },
  { title: "Isuzu Grafter Green", youtube_id: "Wme3J2SYT3s", sort_order: 3 },
  { title: "Features Video - 7.5t Walk Around", youtube_id: "4x-0AfQZFjE", sort_order: 4 },
];
