import "dotenv/config";
import { content_status } from "../src/generated/prisma/client";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";
import { BLOG_POSTS } from "./seed-data/blog-posts";
import { seedTruckModels, homepageVideos } from "./seed-data/trucks";
import { legalPages } from "./seed-data/legal";
import { homePageSections, aboutPageSections } from "./seed-data/home-sections";
import type { SeedPageSection } from "./seed-data/home-sections";
import { originalPageSeo } from "../src/content/original-seo";

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@dttrucks.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "changeme";
  const adminName = process.env.SEED_ADMIN_NAME ?? "Admin User";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.users.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password_hash: passwordHash,
      name: adminName,
      role: "admin",
    },
  });

  const settings: Record<string, string> = {
    company_name: "DT Trucks Limited",
    company_phone: "020 8595 4400",
    company_email: "enquiries@dttrucks.com",
    company_address:
      "Castle Works, 721 Ripple Road, Barking, Essex IG11 0SN",
    sales_phone: "07450 444 888",
    sales_email: "George.Smith@dttrucks.com",
    sales_contact_name: "George Smith",
    opening_hours: JSON.stringify({
      monday: { open: "07:00", close: "17:00" },
      tuesday: { open: "07:00", close: "17:00" },
      wednesday: { open: "07:00", close: "17:00" },
      thursday: { open: "07:00", close: "17:00" },
      friday: { open: "07:00", close: "17:00" },
      saturday: { open: "07:00", close: "12:00" },
      sunday: { closed: true },
    }),
    social_facebook: "https://www.facebook.com/dttrucksuk",
    social_linkedin: "https://www.linkedin.com/company/dt-trucks-ltd/",
    social_instagram: "https://www.instagram.com/dttrucksltd/",
    what3words: "TONIC.SMALL.AGES",
    google_maps_embed_url: "",
    ebay_store_url: "https://www.ebay.co.uk/usr/dt-trucks-isuzu",
    ebay_seller_username: "dt-trucks-isuzu",
    internal_portal_url: "https://dttvho.softr.app",
    live_chat_enabled: "false",
    company_registration: "9501804",
    default_meta_title: originalPageSeo.home.title,
    default_meta_description: originalPageSeo.home.description,
    live_chat_id: "",
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.site_settings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  const pages = [
    {
      slug: "home",
      title: "Home",
      subtitle: "Authorised Isuzu Dealer — London & Essex",
      content:
        "<p>Homepage content is managed via page sections. Use the sections editor below for hero, services, videos, and CTAs.</p>",
      meta_title: originalPageSeo.home.title,
      meta_description: originalPageSeo.home.description,
    },
    {
      slug: "about",
      title: "About Us",
      subtitle: "Get to know us!",
      content: "",
      meta_title: originalPageSeo.about.title,
      meta_description: originalPageSeo.about.description,
    },
    {
      slug: "service",
      title: "Service & Parts",
      subtitle: "One-stop repair shop at Castle Works, Barking",
      content:
        "<p>DT Trucks is THE ONE-STOP REPAIR SHOP — workshop servicing, tachograph calibrations, specialist repairs and genuine Isuzu parts with a 96% first-time pick rate. Ten service bays, IRTEC-accredited technicians and fleet support across London and Essex.</p>",
      meta_title: originalPageSeo.service.title,
      meta_description: originalPageSeo.service.description,
    },
    {
      slug: "sales",
      title: "Isuzu Truck Sales",
      subtitle: "The Best Trucks At Unbeatable Prices",
      content:
        "<p>Explore our wide selection of trucks available for purchase. Whether you know exactly what you need or require some assistance in finding the perfect truck, I’m here to help. Feel free to contact me — call my mobile number below, fill in the contact form with your truck requirements, or send me an email. I am always ready to assist.</p><p>With over 30 years of experience in the commercial vehicle industry, I specialise in Isuzu truck sales, covering London, Essex, and Hertfordshire. I support transport managers, fleet managers, and business owners in choosing the right truck for their needs.</p><p>Get in touch today to learn more about how I can assist with your truck needs.</p>",
      meta_title: originalPageSeo.sales.title,
      meta_description: originalPageSeo.sales.description,
    },
    {
      slug: "specialist-applications",
      title: "Specialist Applications",
      subtitle: "Specialised maintenance and repair for Isuzu Trucks and niche equipment",
      content:
        "<p>Specialist Services and Nationwide Excellence – DT Trucks Limited. Specialised maintenance and repair for Isuzu Trucks, aviation ground equipment, plant equipment, and UXO survey and disposal equipment across the UK.</p>",
      meta_title: originalPageSeo["specialist-applications"].title,
      meta_description: originalPageSeo["specialist-applications"].description,
    },
    ...legalPages,
  ];

  for (const page of pages) {
    await prisma.pages.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        subtitle: "subtitle" in page ? page.subtitle ?? null : null,
        content: page.content,
        meta_title: page.meta_title ?? null,
        meta_description: "meta_description" in page ? page.meta_description ?? null : null,
        status: content_status.published,
        published_at: new Date(),
      },
      create: {
        slug: page.slug,
        title: page.title,
        subtitle: "subtitle" in page ? page.subtitle ?? null : null,
        content: page.content,
        meta_title: page.meta_title ?? null,
        meta_description: "meta_description" in page ? page.meta_description ?? null : null,
        status: content_status.published,
        published_at: new Date(),
      },
    });
  }

  async function seedPageSections(slug: string, sections: SeedPageSection[]) {
    const page = await prisma.pages.findUnique({ where: { slug } });
    if (!page) return;
    await prisma.page_sections.deleteMany({ where: { page_id: page.id } });
    for (const section of sections) {
      await prisma.page_sections.create({
        data: {
          page_id: page.id,
          section_type: section.section_type,
          title: section.title ?? null,
          content: section.content,
          sort_order: section.sort_order,
          is_visible: true,
        },
      });
    }
  }

  await seedPageSections("home", homePageSections);
  await seedPageSections("about", aboutPageSections);

  const categories = [
    {
      slug: "3-5t-gvw",
      name: "3.5 tonnes GVW",
      description:
        "The 3.5t Grafter is a light truck that’s more than capable of handling a busy workload — named Best Builders’ Truck seven years in a row by Trade Van Driver. Two models: 1.9L 123PS Grafter Green (N35.125) and 3.0L 150PS Grafter Blue (N35.150). Single or twin rear wheels, 3.5-tonne towing, and short Driveaway lead times.",
      image_url: "/media/sales/3.5-tonnes-GVW.jpg",
      sort_order: 1,
    },
    {
      slug: "5-5-6-5t-gvw",
      name: "5.5 / 6.5 tonnes GVW",
      description:
        "More payload with the compact cab and body design of the Grafter range. Popular with arborists, breweries and local authorities. N55.150 (narrow cab option) and N65.150 (manual or Easyshift).",
      image_url: "/media/sales/5.5-6.5-tonnes-GVW.jpg",
      sort_order: 2,
    },
    {
      slug: "7-5t-gvw",
      name: "7.5 tonnes GVW",
      description:
        "Market leaders in key sectors including recovery. Outstanding payload and reliability for distribution, local delivery and plant hire. N75.150 (3.0L urban) and N75.190 Forward (5.2L, day/crew cab, manual and Easyshift).",
      image_url: "/media/sales/7.5-tonnes-GVW.jpg",
      sort_order: 3,
    },
    {
      slug: "11-13-5t-gvw",
      name: "11 & 13.5 tonnes GVW",
      description:
        "‘Big truck’ performance with a ‘small truck’ footprint. F110.210 for tipper and beavertail with compact cab; F135.240 with Easyshift for scaffolders and box/curtainside — the ideal step up from N-Series.",
      image_url: "/media/sales/11-13.5-tonnes-GVW.jpg",
      sort_order: 4,
    },
    {
      slug: "driveaway",
      name: "Isuzu Driveaway Trucks",
      description:
        "Ready-to-work tipper, dropside, utilitruck, box and curtainsider models available with short lead times from Barking.",
      image_url: "/media/sales/Isuzu-3.5-Tonne-Tipper.jpg",
      sort_order: 5,
    },
  ];

  for (const category of categories) {
    await prisma.truck_categories.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  await seedTruckModels(content_status.published);

  const team = [
    {
      name: "Derek Tansley",
      role: "Managing Director",
      bio:
        "FIMI MIRTE MSOE. Started as a technician's apprentice and built a successful commercial vehicle garage. Oversees business operations.",
      sort_order: 1,
    },
    {
      name: "George Smith",
      role: "Sales Director",
      bio:
        "FIMI. Family car repair business, then Fruit & Veg wholesaler MD at New Covent Garden Market. Sales & general management.",
      sort_order: 2,
    },
    {
      name: "John Skinner",
      role: "General Manager / Service Manager",
      bio:
        "Apprentice at 17, Master Technician, recently General Manager at DT Trucks.",
      sort_order: 3,
    },
    {
      name: "Ian Scrogie",
      role: "Accounts Manager",
      bio: "MAAT. With the company since 2013, 20+ years experience. All financial responsibility.",
      sort_order: 4,
    },
    {
      name: "Kimberley Perkins",
      role: "Admin Manager",
      bio:
        "With DT Trucks since 2013. Administration, invoicing, warranty, office oversight and customer care.",
      sort_order: 5,
    },
  ];

  await prisma.team_members.deleteMany();
  for (const member of team) {
    await prisma.team_members.create({ data: member });
  }

  const newsCategory = await prisma.blog_categories.upsert({
    where: { slug: "commercial-vehicle-news" },
    update: { name: "Commercial Vehicle News" },
    create: { slug: "commercial-vehicle-news", name: "Commercial Vehicle News" },
  });

  const uncategorized = await prisma.blog_categories.upsert({
    where: { slug: "uncategorized" },
    update: { name: "Uncategorized" },
    create: { slug: "uncategorized", name: "Uncategorized" },
  });

  const blogCategories = {
    "commercial-vehicle-news": newsCategory.id,
    uncategorized: uncategorized.id,
  };

  for (const post of BLOG_POSTS) {
    const categoryId =
      blogCategories[post.category_slug as keyof typeof blogCategories];
    await prisma.blog_posts.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        category_id: categoryId,
        status: content_status.published,
        published_at: new Date(post.published_at),
        meta_title: post.meta_title,
        meta_description: post.meta_description,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        category_id: categoryId,
        status: content_status.published,
        published_at: new Date(post.published_at),
        meta_title: post.meta_title,
        meta_description: post.meta_description,
      },
    });
  }

  await prisma.job_listings.upsert({
    where: { slug: "workshop-technician" },
    update: {},
    create: {
      slug: "workshop-technician",
      title: "Workshop Technician",
      description:
        "<p>We're looking for an experienced HGV/LGV workshop technician to join our IRTEC-accredited team at Castle Works, Barking.</p><p>You'll work on Isuzu trucks and a wide range of commercial vehicles, using the latest diagnostic equipment in our 10-bay workshop.</p>",
      requirements:
        "IRTEC or equivalent commercial vehicle qualification\nExperience with HGV/LGV servicing and repairs\nAbility to work independently and as part of a team\nValid UK driving licence",
      location: "Barking, Essex",
      employment_type: "full_time",
      status: content_status.published,
      published_at: new Date(),
    },
  });

  await prisma.videos.deleteMany({ where: { page_slug: null } });
  for (const video of homepageVideos) {
    await prisma.videos.create({
      data: {
        title: video.title,
        youtube_id: video.youtube_id,
        page_slug: null,
        sort_order: video.sort_order,
        is_visible: true,
      },
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
