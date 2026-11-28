import { prisma } from '@/lib/prisma'
import { content_status } from '../../src/generated/prisma/client'

type TruckModelSeed = {
  slug: string
  name: string
  model_code?: string
  description: string
  category_slug: string
  sort_order: number
  image_url?: string
  specifications?: Record<string, string>
  spec_sheet_url?: string
  spec_sheet_label?: string
}

const IMG = {
  gvw35: '/media/sales/p700/grafter.webp',
  gvw55: '/media/sales/p700/n55.webp',
  gvw75: '/media/sales/p700/n75.webp',
  gvw11: '/media/sales/p700/f110.webp',
  gvw135: '/media/sales/p700/f135.webp',
}

function specSheet(slug: string, label: string) {
  return {
    spec_sheet_url: `/media/specs/${slug}.pdf`,
    spec_sheet_label: label,
  }
}

function n35Specs({
  rearWheels,
  transmission,
  automatic,
  payload,
}: {
  rearWheels: 'Single' | 'Twin'
  transmission: string
  automatic?: boolean
  payload: string
}): Record<string, string> {
  return {
    generation: 'P700',
    gvw: '3,500kg',
    chassis: '4×2 rigid chassis cab',
    cab: 'Day cab',
    rear_wheels: rearWheels,
    engine: '1.9L (1898cc) turbo intercooled DOHC diesel',
    power: '120PS / 88kW at 3,200rpm',
    transmission,
    gtw: automatic ? '6,000kg' : '7,000kg',
    body_payload_allowance: payload,
    wheelbases: '2500mm / 3360mm',
  }
}

function nSeries150Specs({
  gvw,
  gtw,
  transmission,
  payload,
  wheelbases,
}: {
  gvw: string
  gtw: string
  transmission: string
  payload: string
  wheelbases: string
}): Record<string, string> {
  return {
    generation: 'P700',
    gvw,
    chassis: '4×2 rigid chassis cab',
    cab: 'Day cab',
    rear_wheels: 'Twin',
    engine: '3.0L (2999cc) turbo intercooled OHC diesel',
    power: '150PS / 110kW at 2,450rpm',
    transmission,
    gtw,
    body_payload_allowance: payload,
    wheelbases,
  }
}

function n75Specs({
  engine,
  power,
  transmission,
  payload,
}: {
  engine: string
  power: string
  transmission: string
  payload: string
}): Record<string, string> {
  return {
    generation: 'P700',
    gvw: '7,500kg',
    chassis: '4×2 rigid chassis cab',
    cab: 'Day cab',
    rear_wheels: 'Twin',
    engine,
    power,
    transmission,
    gtw: '11,000kg',
    body_payload_allowance: payload,
    wheelbases: '2765mm / 3365mm / 3815mm / 4475mm',
  }
}

function fSeriesSpecs({
  gvw,
  gtw,
  transmission,
  payload,
  wheelbases,
}: {
  gvw: string
  gtw: string
  transmission: string
  payload: string
  wheelbases: string
}): Record<string, string> {
  return {
    generation: 'P700',
    gvw,
    chassis: '4×2 rigid chassis cab',
    cab: 'Day cab',
    rear_wheels: 'Twin',
    engine: '5.2L (5193cc) two-stage turbo intercooled OHC diesel',
    power: '240PS / 177kW at 2,400rpm',
    transmission,
    gtw,
    body_payload_allowance: payload,
    wheelbases,
  }
}

const truckModels: TruckModelSeed[] = [
  {
    category_slug: '3-5t-gvw',
    slug: 'n35-120-s',
    name: 'N35.120(S) Grafter Chassis Cab',
    model_code: 'N35.120(S)',
    description:
      '3.5t P700 Grafter chassis cab with single rear wheels, a 1.9L 120PS engine and a six-speed manual gearbox. A compact chassis base for tipper, dropside, box and specialist bodywork.',
    sort_order: 1,
    image_url: IMG.gvw35,
    specifications: n35Specs({
      rearWheels: 'Single',
      transmission: '6-speed manual',
      payload: '~1,513kg - 1,594kg',
    }),
    ...specSheet('n35-120-s', 'N35.120 single manual specification sheet'),
  },
  {
    category_slug: '3-5t-gvw',
    slug: 'n35-120-t',
    name: 'N35.120(T) Grafter Chassis Cab',
    model_code: 'N35.120(T)',
    description:
      '3.5t P700 Grafter chassis cab with twin rear wheels, a 1.9L 120PS engine and a six-speed manual gearbox. Twin rear wheels give additional stability for heavier body and payload requirements.',
    sort_order: 2,
    image_url: IMG.gvw35,
    specifications: n35Specs({
      rearWheels: 'Twin',
      transmission: '6-speed manual',
      payload: '~1,473kg - 1,558kg',
    }),
    ...specSheet('n35-120-t', 'N35.120 twin manual specification sheet'),
  },
  {
    category_slug: '3-5t-gvw',
    slug: 'n35-120-sa',
    name: 'N35.120(SA) Grafter Chassis Cab',
    model_code: 'N35.120(SA)',
    description:
      '3.5t P700 Grafter chassis cab with single rear wheels and a six-speed fully automatic gearbox. Well suited to stop-start urban work where ease of driving matters.',
    sort_order: 3,
    image_url: IMG.gvw35,
    specifications: n35Specs({
      rearWheels: 'Single',
      transmission: '6-speed fully automatic',
      automatic: true,
      payload: '~1,478kg - 1,559kg',
    }),
    ...specSheet('n35-120-sa', 'N35.120 single automatic specification sheet'),
  },
  {
    category_slug: '3-5t-gvw',
    slug: 'n35-120-ta',
    name: 'N35.120(TA) Grafter Chassis Cab',
    model_code: 'N35.120(TA)',
    description:
      '3.5t P700 Grafter chassis cab with twin rear wheels and a six-speed fully automatic gearbox, combining easy driving with a more stable twin-wheel chassis.',
    sort_order: 4,
    image_url: IMG.gvw35,
    specifications: n35Specs({
      rearWheels: 'Twin',
      transmission: '6-speed fully automatic',
      automatic: true,
      payload: '~1,438kg - 1,523kg',
    }),
    ...specSheet('n35-120-ta', 'N35.120 twin automatic specification sheet'),
  },
  {
    category_slug: '5-5t-gvw',
    slug: 'n55-150',
    name: 'N55.150 Chassis Cab',
    model_code: 'N55.150',
    description:
      '5.5t P700 chassis cab with twin rear wheels, a 3.0L 150PS engine and a six-speed manual gearbox. A compact higher-payload chassis for delivery, arboriculture, municipal and specialist bodywork.',
    sort_order: 1,
    image_url: IMG.gvw55,
    specifications: nSeries150Specs({
      gvw: '5,500kg',
      gtw: '9,000kg',
      transmission: '6-speed manual',
      payload: '~3,120kg - 3,170kg',
      wheelbases: '2750mm / 3345mm',
    }),
    ...specSheet('n55-150', 'N55.150 manual specification sheet'),
  },
  {
    category_slug: '5-5t-gvw',
    slug: 'n55-150-amt',
    name: 'N55.150 Chassis Cab - AMT',
    model_code: 'N55.150 AMT',
    description:
      '5.5t P700 chassis cab with twin rear wheels, a 3.0L 150PS engine and the nine-speed ISIM automated dual-clutch transmission for easier urban and multi-drop driving.',
    sort_order: 2,
    image_url: IMG.gvw55,
    specifications: nSeries150Specs({
      gvw: '5,500kg',
      gtw: '9,000kg',
      transmission: '9-speed ISIM automated dual clutch',
      payload: '~3,075kg - 3,125kg',
      wheelbases: '2750mm / 3345mm',
    }),
    ...specSheet('n55-150-amt', 'N55.150 ISIM AMT specification sheet'),
  },
  {
    category_slug: '7-5t-gvw',
    slug: 'n75-150',
    name: 'N75.150 Chassis Cab',
    model_code: 'N75.150',
    description:
      '7.5t P700 chassis cab with a 3.0L 150PS engine and six-speed manual gearbox. A versatile chassis for urban distribution, recovery, plant and bodybuilder applications.',
    sort_order: 1,
    image_url: IMG.gvw75,
    specifications: n75Specs({
      engine: '3.0L (2999cc) turbo intercooled OHC diesel',
      power: '150PS / 110kW at 2,450rpm',
      transmission: '6-speed manual',
      payload: '~4,707kg - 4,817kg',
    }),
    ...specSheet('n75-150', 'N75.150 manual specification sheet'),
  },
  {
    category_slug: '7-5t-gvw',
    slug: 'n75-150-amt',
    name: 'N75.150 Chassis Cab - AMT',
    model_code: 'N75.150 AMT',
    description:
      '7.5t P700 chassis cab with a 3.0L 150PS engine and the nine-speed ISIM automated dual-clutch transmission, suited to multi-drop and stop-start operation.',
    sort_order: 2,
    image_url: IMG.gvw75,
    specifications: n75Specs({
      engine: '3.0L (2999cc) turbo intercooled OHC diesel',
      power: '150PS / 110kW at 2,450rpm',
      transmission: '9-speed ISIM automated dual clutch',
      payload: '~4,672kg - 4,782kg',
    }),
    ...specSheet('n75-150-amt', 'N75.150 ISIM AMT specification sheet'),
  },
  {
    category_slug: '7-5t-gvw',
    slug: 'n75-175-amt',
    name: 'N75.175 Chassis Cab - AMT',
    model_code: 'N75.175 AMT',
    description:
      '7.5t P700 chassis cab with the higher-output 3.0L 175PS engine and nine-speed ISIM automated dual-clutch transmission. Isuzu UK currently lists this variant exclusively with the automated gearbox.',
    sort_order: 3,
    image_url: IMG.gvw75,
    specifications: n75Specs({
      engine: '3.0L (2999cc) turbo intercooled OHC diesel',
      power: '175PS / 129kW at 2,680rpm',
      transmission: '9-speed ISIM automated dual clutch',
      payload: '~4,672kg - 4,782kg',
    }),
    ...specSheet('n75-175-amt', 'N75.175 ISIM AMT specification sheet'),
  },
  {
    category_slug: '7-5t-gvw',
    slug: 'n75-190',
    name: 'N75.190 Chassis Cab',
    model_code: 'N75.190',
    description:
      '7.5t P700 chassis cab with a 5.2L 190PS engine and six-speed manual gearbox, giving additional power for longer-distance, recovery and demanding body applications.',
    sort_order: 4,
    image_url: IMG.gvw75,
    specifications: n75Specs({
      engine: '5.2L (5193cc) turbo intercooled OHC diesel',
      power: '190PS / 140kW at 2,600rpm',
      transmission: '6-speed manual',
      payload: '~4,446kg - 4,521kg',
    }),
    ...specSheet('n75-190', 'N75.190 manual specification sheet'),
  },
  {
    category_slug: '7-5t-gvw',
    slug: 'n75-190-amt',
    name: 'N75.190 Chassis Cab - AMT',
    model_code: 'N75.190 AMT',
    description:
      '7.5t P700 chassis cab with a 5.2L 190PS engine and Easy Shift automated transmission, combining higher power with easier operation in traffic and urban delivery work.',
    sort_order: 5,
    image_url: IMG.gvw75,
    specifications: n75Specs({
      engine: '5.2L (5193cc) turbo intercooled OHC diesel',
      power: '190PS / 140kW at 2,600rpm',
      transmission: '6-speed Easy Shift fully automated',
      payload: '~4,411kg - 4,486kg',
    }),
    ...specSheet('n75-190-amt', 'N75.190 Easy Shift AMT specification sheet'),
  },
  {
    category_slug: '11t-gvw',
    slug: 'f110-240',
    name: 'F110.240 Chassis Cab',
    model_code: 'F110.240',
    description:
      '11t P700 F-Series chassis cab with a 5.2L 240PS engine and six-speed manual gearbox. A compact heavy chassis for tipper, beavertail, box and specialist bodywork.',
    sort_order: 1,
    image_url: IMG.gvw11,
    specifications: fSeriesSpecs({
      gvw: '11,000kg',
      gtw: '14,500kg',
      transmission: '6-speed manual',
      payload: '~7,371kg',
      wheelbases: '3410mm',
    }),
    ...specSheet('f110-240', 'F110.240 manual specification sheet'),
  },
  {
    category_slug: '11t-gvw',
    slug: 'f110-240-amt',
    name: 'F110.240 Chassis Cab - AMT',
    model_code: 'F110.240 AMT',
    description:
      '11t P700 F-Series chassis cab with a 5.2L 240PS engine and Easy Shift fully automated transmission, with multiple wheelbase options for demanding bodybuilder layouts.',
    sort_order: 2,
    image_url: IMG.gvw11,
    specifications: fSeriesSpecs({
      gvw: '11,000kg',
      gtw: '14,500kg',
      transmission: '6-speed Easy Shift fully automated',
      payload: '~7,186kg - 7,346kg',
      wheelbases: '3410mm / 4060mm / 4660mm / 4990mm',
    }),
    ...specSheet('f110-240-amt', 'F110.240 Easy Shift AMT specification sheet'),
  },
  {
    category_slug: '13-5t-gvw',
    slug: 'f135-240-amt',
    name: 'F135.240 Chassis Cab - AMT',
    model_code: 'F135.240 AMT',
    description:
      '13.5t P700 F-Series chassis cab with a 5.2L 240PS engine and Easy Shift fully automated transmission. A high-payload chassis for box, curtainside, scaffolding and specialist applications.',
    sort_order: 1,
    image_url: IMG.gvw135,
    specifications: fSeriesSpecs({
      gvw: '13,500kg',
      gtw: '17,000kg',
      transmission: '6-speed Easy Shift fully automated',
      payload: '~9,258kg - 9,413kg',
      wheelbases: '3790mm / 4360mm / 4990mm',
    }),
    ...specSheet('f135-240-amt', 'F135.240 Easy Shift AMT specification sheet'),
  },
]

const legacyModelSlugs = [
  'n35-125-grafter',
  'n35-150-grafter',
  'n65-150',
  'n75-190-forward',
  'f135-240',
  'f110-210',
  'driveaway-3-5t-tipper',
  'driveaway-7-5t-tipper',
  'driveaway-3-5t-dropside',
  'driveaway-3-5t-utilitruck',
  'driveaway-7-5t-dropside',
  'driveaway-7-5t-box',
  'driveaway-7-5t-curtainsider',
]

async function mergeLegacyCategory(legacySlug: string, targetSlug: string) {
  const legacy = await prisma.truck_categories.findUnique({
    where: { slug: legacySlug },
  })
  const target = await prisma.truck_categories.findUnique({
    where: { slug: targetSlug },
  })
  if (!legacy || !target) return

  await prisma.truck_models.updateMany({
    where: { category_id: legacy.id },
    data: { category_id: target.id },
  })

  const remaining = await prisma.truck_models.count({
    where: { category_id: legacy.id },
  })
  if (remaining === 0) {
    await prisma.truck_categories
      .delete({ where: { id: legacy.id } })
      .catch(() => undefined)
  }
}

export async function migrateLegacyTruckCategories() {
  await mergeLegacyCategory('5-5-6-5t-gvw', '5-5t-gvw')

  const legacyCombined = await prisma.truck_categories.findUnique({
    where: { slug: '11-13-5t-gvw' },
  })
  if (legacyCombined) {
    const cat11 = await prisma.truck_categories.findUnique({
      where: { slug: '11t-gvw' },
    })
    const cat135 = await prisma.truck_categories.findUnique({
      where: { slug: '13-5t-gvw' },
    })
    if (cat11 && cat135) {
      await prisma.truck_models.updateMany({
        where: {
          category_id: legacyCombined.id,
          slug: { in: ['f110-210', 'f110-240'] },
        },
        data: { category_id: cat11.id },
      })
      await prisma.truck_models.updateMany({
        where: {
          category_id: legacyCombined.id,
          slug: { in: ['f135-240', 'f135-240-amt'] },
        },
        data: { category_id: cat135.id },
      })
      const remaining = await prisma.truck_models.count({
        where: { category_id: legacyCombined.id },
      })
      if (remaining === 0) {
        await prisma.truck_categories
          .delete({ where: { id: legacyCombined.id } })
          .catch(() => undefined)
      }
    }
  }
}

async function archiveLegacyTruckModels() {
  await prisma.truck_models.updateMany({
    where: { slug: { in: legacyModelSlugs } },
    data: {
      status: content_status.archived,
      deleted_at: new Date(),
    },
  })
}

export async function seedTruckModels(status: content_status) {
  await migrateLegacyTruckCategories()
  await archiveLegacyTruckModels()

  const categories = await prisma.truck_categories.findMany()
  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

  for (const model of truckModels) {
    const category = bySlug[model.category_slug]
    if (!category) continue

    const data = {
      name: model.name,
      model_code: model.model_code ?? null,
      description: model.description,
      category_id: category.id,
      sort_order: model.sort_order,
      is_driveaway: false,
      driveaway_type: null,
      image_url: model.image_url ?? null,
      specifications: model.specifications
        ? JSON.stringify(model.specifications)
        : null,
      spec_sheet_url: model.spec_sheet_url ?? null,
      spec_sheet_label: model.spec_sheet_label ?? null,
      status,
      published_at: new Date(),
      deleted_at: null,
    }

    await prisma.truck_models.upsert({
      where: { slug: model.slug },
      update: data,
      create: { ...data, slug: model.slug },
    })
  }
}

export const homepageVideos = [
  {
    title: 'The Isuzu Production Facility',
    youtube_id: 'xvZqHgFz51I',
    sort_order: 1,
  },
  {
    title: 'Behind the Scenes at Isuzu Truck',
    youtube_id: 'Wme3J2SYT3s',
    sort_order: 2,
  },
  { title: 'Isuzu Grafter Green', youtube_id: 'Wme3J2SYT3s', sort_order: 3 },
  {
    title: 'Features Video - 7.5t Walk Around',
    youtube_id: '4x-0AfQZFjE',
    sort_order: 4,
  },
]
