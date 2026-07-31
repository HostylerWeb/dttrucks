# DT Trucks Website Structure & Content Audit

**Source:** https://dttrucks.com  
**Audit Date:** July 30, 2026  
**Current Platform:** WordPress (Yoast SEO, W3 Total Cache, RevSlider, EasyJobs plugin)  
**Purpose of this document:** Complete inventory of pages, content, site map, and business purpose for the Next.js + PostgreSQL rebuild.

---

## Table of Contents

1. [Website Purpose & Business Overview](#1-website-purpose--business-overview)
2. [Site Map & Navigation Structure](#2-site-map--navigation-structure)
3. [Global Elements (Header, Footer, Shared UI)](#3-global-elements-header-footer-shared-ui)
4. [Page-by-Page Content](#4-page-by-page-content)
5. [Blog / News Posts](#5-blog--news-posts)
6. [Legal & Policy Pages](#6-legal--policy-pages)
7. [External Integrations & Third-Party Services](#7-external-integrations--third-party-services)
8. [Media & Assets Inventory](#8-media--assets-inventory)
9. [Content Gaps & Notes for Rebuild](#9-content-gaps--notes-for-rebuild)

---

## 1. Website Purpose & Business Overview

### What DT Trucks Does

DT Trucks Limited is an **authorised Isuzu main dealer** based in **Barking, Essex (North London)**. The company provides a full commercial vehicle lifecycle service:

| Service Area | Description |
|---|---|
| **Truck Sales** | New Isuzu trucks from 3.5t to 13.5t GVW, including Driveaway pre-bodied vehicles (tippers, dropsides, box, curtainsiders) |
| **Parts** | Genuine Isuzu parts with 96%+ first-time pick rate, 2-year warranty via Isuzu Care programme |
| **Servicing & Repairs** | Full workshop for Isuzu and non-Isuzu vehicles from car-derived vans up to 18m 44-tonne HGVs |
| **Tachograph Calibration** | DVSA-approved centre for smart (Gen1/Gen2), digital, and analogue tachographs |
| **Specialist Applications** | Maintenance for A&E, PTS, blue-light, UXO survey/disposal, aviation ground equipment, plant equipment |
| **Fleet Support** | On-site maintenance, 24/7 roadside breakdown (under 90 min response), O-Licence inspections, roller brake testing |
| **Air Conditioning** | Recharge services for all vehicle types including refrigerated systems |
| **eBay Sales** | Online parts/truck listings via eBay |

### Target Audience

- Fleet managers and transport managers (London, Essex, Hertfordshire, South East)
- Small business owners needing commercial vehicles
- Operators of specialist/emergency vehicles (A&E, PTS, blue-light)
- Individual truck buyers seeking Isuzu expertise
- Companies requiring tachograph compliance and O-Licence support

### Company History (Summary)

- **1995:** Derek Tansley and George Smith founded Eastley Commercials, became Isuzu Truck (UK) dealers
- **2004:** Partners pursued separate paths
- **2015:** Reunited to establish DT Trucks in North London (Barking)
- **Today:** Growing dealership with focus on innovation (e.g. Isuzu N35.125 Green Euro 6 model)

### Key Team Members

| Name | Role | Notes |
|---|---|---|
| Derek Tansley | Managing Director | FIMI MIRTE MSOE, founded business, oversees operations |
| George Smith | Sales Director | FIMI, 30+ years in commercial vehicles, primary sales contact |
| John Skinner | General Manager / Service Manager | Master Technician, started as apprentice at 17 |
| Ian Scrogie | Accounts Manager | MAAT, joined 2013, 20+ years experience |
| Kimberley Perkins | Admin Manager | Joined 2013, administration, invoicing, warranty, customer care |

### Company Registration

- **Legal Name:** DT Trucks Limited
- **Registered in England No.:** 9501804
- **Registered Office:** 721 Ripple Road, Barking, Essex IG11 0SN
- **What3Words:** ///TONIC.SMALL.AGES

### Contact Information

| Channel | Details |
|---|---|
| **Main Phone** | 020 8595 4400 (Sales, Parts, Service) |
| **Sales Mobile** | 07450 444 888 (George Smith) |
| **Sales Email** | George.Smith@dttrucks.com |
| **General Email** | enquiries@dttrucks.com |
| **Address** | Castle Works, 721 Ripple Road, Barking, Essex IG11 0SN |

### Operating Hours

- **Monday – Friday:** 07:00 – 17:00
- **Saturday:** 07:00 – 12:00
- **Sunday:** Closed

### Social Media

- Facebook: https://www.facebook.com/dttrucksuk
- LinkedIn: https://www.linkedin.com/company/dt-trucks-ltd/
- Instagram: https://www.instagram.com/dttrucksltd/

---

## 2. Site Map & Navigation Structure

### Visual Site Map

```
dttrucks.com
│
├── Home (/)
│
├── About Us (/about-us/)
│
├── Isuzu Truck Sales (/isuzu-truck-sales/)
│   ├── 3.5t GVW – N35.125 Grafter / N35.150 Grafter Blue
│   ├── 5.5/6.5t GVW – N55.150 & N65.150
│   ├── 7.5t GVW – N75.150 & N75.190
│   ├── 11 & 13.5t GVW – F110.210 & F135.240
│   └── Driveaway Range
│       ├── 3.5t Tipper
│       ├── 7.5t Tipper
│       ├── 3.5t Dropside
│       ├── 3.5t Utilitruck (Tipper with Toolpod)
│       ├── 7.5t Dropside
│       ├── 7.5t Box
│       └── 7.5t Curtainsider
│
├── Service & Parts (/barking-trucks-isuzu/)
│   ├── Workshop & Test Centre
│   ├── Isuzu Trained Technicians
│   ├── Tachograph Centre
│   ├── 24/7 Roadside Breakdown
│   ├── On-Site Maintenance
│   ├── Specialist Vehicles & Plant
│   ├── Air Conditioning Recharge
│   └── Roller Brake Testing
│
├── Tachograph Calibrations (/tachograph-calibrations/)
│   ├── Smart Tachograph (Gen1 & Gen2)
│   ├── Digital Tachograph
│   ├── Units & Consumables in Stock
│   └── FAQs
│
├── Specialist Applications (/specialist-applications/)
│
├── eBay Listings (/ebay-listings/)
│
├── Blog (/blog/)
│   ├── /isuzu-for-small-business/
│   └── /exclusive-discount-on-ac-regassing/
│
├── Contact (/contact/)
│
├── Jobs (/jobs/)                    [not in main nav, page exists]
│
├── Terms & Conditions (/terms-conditions-dt-trucks-ltd/)
├── Conditions of Sale (/conditions-of-sale/)
└── GDPR (/gdpr/)                    [not in main nav, page exists]
```

### Primary Navigation (Header)

| Nav Label | URL | Notes |
|---|---|---|
| Home | `/` | Landing page |
| About Us | `/about-us/` | Company history and team |
| Isuzu Truck Sales | `/isuzu-truck-sales/` | Product catalogue and sales contact |
| Service & Parts | `/barking-trucks-isuzu/` | Workshop services (URL uses legacy name) |
| Specialist Applications | `/specialist-applications/` | Niche vehicle maintenance |
| eBay Listings | `/ebay-listings/` | eBay store embed/listings |
| Blog | `/blog/` | News and articles |
| Contact | `/contact/` | Contact form and location |
| Terms & Conditions | `/terms-conditions-dt-trucks-ltd/` | Footer/legal nav |
| Conditions of Sale | `/conditions-of-sale/` | Footer/legal nav |

### Secondary / Utility Links

| Label | URL | Type |
|---|---|---|
| Tachograph Calibrations Barking | `/tachograph-calibrations/` | Appears in secondary nav on some pages |
| Internal Portal | https://dttvho.softr.app | External Softr app (staff portal) |
| Jobs | `/jobs/` | EasyJobs plugin embed |

### URL Mapping for Rebuild (Recommended Clean URLs)

| Current URL | Recommended New URL |
|---|---|
| `/` | `/` |
| `/about-us/` | `/about` |
| `/isuzu-truck-sales/` | `/sales` or `/trucks` |
| `/barking-trucks-isuzu/` | `/service` |
| `/tachograph-calibrations/` | `/service/tachograph-calibrations` |
| `/specialist-applications/` | `/specialist-applications` |
| `/ebay-listings/` | `/ebay` or `/shop` |
| `/blog/` | `/blog` |
| `/contact/` | `/contact` |
| `/jobs/` | `/careers` or `/jobs` |
| `/terms-conditions-dt-trucks-ltd/` | `/legal/terms` |
| `/conditions-of-sale/` | `/legal/conditions-of-sale` |
| `/gdpr/` | `/legal/privacy` |

---

## 3. Global Elements (Header, Footer, Shared UI)

### Header

- **Logo:** DT Trucks – Isuzu Dealership
- **Tagline:** "The Next Generation Of Trucks!"
- **Operating hours bar:** Mon–Fri 07:00–17:00, Sat 07:00–12:00, Sunday Closed (links to contact)
- **Phone CTA:** Contact: 020 8595 4400
- **Social icons:** Facebook, LinkedIn, Instagram (open in new window)
- **Internal Portal link:** https://dttvho.softr.app (staff only)

### Footer

- Recent blog posts sidebar (on blog-related pages)
- Categories: Commercial Vehicle News, Uncategorized
- Archives: September 2025, January 2021
- Cookie consent banner: "We use cookies to ensure that we give you the best experience on our website..."
- "Go to Top" scroll button
- Share on Facebook button (per page)

### Shared Features Across Site

| Feature | Description |
|---|---|
| **Live Chat** | Bottom-right corner widget (mentioned on multiple pages) |
| **Contact Forms** | Name, Email (required), Subject, Message fields |
| **Share Buttons** | Facebook share per page |
| **YouTube Embeds** | Homepage features 5 Isuzu promotional videos |
| **Google Analytics** | UA-126839969-1 |
| **Cookie Consent** | Accept / Privacy policy link |

### Contact Form Fields (Standard)

```
- Your Name (text)
- Your Email (required, email)
- Subject (text)
- Your Message (textarea)
```

Used on: `/contact/` and `/barking-trucks-isuzu/` (Contact Barking section)

---

## 4. Page-by-Page Content

### 4.1 Home (`/`)

**Title:** DT Trucks - Isuzu Sales, Parts and Servicing - Official Isuzu Dealer

**Hero Section:**
- WELCOME TO DT TRUCKS ISUZU SALES, PARTS & SERVICE DEALER
- SALES | SERVICE & PARTS

**Main Heading:** Welcome to DT Trucks

**Intro Paragraph:**
Van and Truck Services – Your Trusted Commercial Vehicle Partner. At DT Trucks, we specialise in van and truck servicing, repairs, and replacements for businesses across the UK. Whether you're managing a single vehicle or an entire fleet, our expert team is here to provide tailored advice and reliable solutions.

**Sections:**

1. **Boost Your Fleet's Efficiency and Uptime**
   - Commercial vehicles are vital assets; fast, cost-effective servicing to minimise downtime
   - Routine maintenance to urgent repairs

2. **Expert Support for All Transport Needs**
   - Experienced staff resolve most queries on the spot

3. **Get in Touch Today**
   - Live chat in bottom right corner
   - Contact team directly

4. **DT Trucks – Your Number One Isuzu Dealer in London & Essex**
   - Leading Isuzu dealership with expert servicing, genuine parts, complete transport solutions
   - Decades of experience, state-of-the-art diagnostic equipment
   - Maintain high volume of commercial vehicles (single operators to fleets of 150+ trucks)
   - Services from bulb replacement to full engine rebuilds
   - Authorised Isuzu main dealer for genuine parts and accessories
   - 96% first-time pick rate on parts
   - Isuzu Care programme: 2-year warranty on genuine parts

5. **Parts** (subsection)
   - Comprehensive range of genuine Isuzu parts
   - 95%+ first-time pick availability
   - Order before 6pm → on premises by 12pm next day (99% guarantee)
   - Service items for NKR, NPR, NQR models and Grafter/Forward range
   - 2 Year Warranty on all Parts

6. **Sales** (subsection)
   - Isuzu truck range: 3.5 to 13.5 tonnes GVW
   - Class-leading body/payload allowance, fuel economy, 3-year unlimited mileage warranty
   - Manoeuvrable, easy-to-drive, tested in extreme climates
   - Stylish cabs designed for safety and comfort

7. **Fully Equipped Workshop** (subsection)
   - 6 service bays, 21 employees (4 Master techs, IRTEC accredited)
   - 5 Tachograph trained technicians
   - Technicians aged 19–62 (131 years combined experience)
   - Service/repair from car-derived vans up to 18m 44-tonne

8. **Specialist Vehicle Support – A&E, PTS, and More**
   - Expertise for emergency and patient transport fleets
   - East and North London operators

9. **Advanced Air Conditioning Services**
   - Top-of-the-range air conditioning equipment
   - Vans, trucks, specialist units, refrigerated vehicles

10. **VOSA "O" Licence Inspections & Compliance**
    - Planned maintenance inspections for O-Licence operators
    - IRTEC-approved examiners
    - DVSA-approved diagnostic tools:
      - Rolling road brake tester
      - Emission testing equipment
      - Headlight aim calibration

11. **Contact Us Today**
    - Service or Parts: 020 8595 4400
    - Truck Sales: George Smith – 07450 444 888 / George.Smith@dttrucks.com
    - Live Chat

12. **Isuzu Videos** (YouTube embeds)
    - The Isuzu Production Facility
    - Behind the Scenes at Isuzu Truck
    - Isuzu Grafter Green
    - Features Video - 7.5t Walk Around
    - (5th video – additional embed)

---

### 4.2 About Us (`/about-us/`)

**Title:** About Us - DT Trucks - Get to know your Isuzu Dealership

**Intro:**
DT Trucks is a leading supplier of quality commercial vehicles, specialising in new and used trucks, HGVs, and fleet solutions across the UK. Passionate team dedicated to helping businesses find the right vehicle. Prioritises transparency, expert guidance, and after-sales support.

**Section: How were we founded?**
- Roots date to 1995: Derek Tansley and George Smith launched Eastley Commercials, took on Isuzu Truck (UK)
- Original range: 3.5t single rear wheel chassis, 6.2t chassis
- Consistently top three for national sales
- Range expanded: 7.5t, twin rear wheel 3.5t, 5.5t, 6.2t→6.5t, 11t and 13.5t chassis
- 2004: Partners pursued separate paths
- 2015: Reunited, established new Isuzu dealership in North London (Barking)
- Recently launched Isuzu N35.125 Green (Euro 6, 1.9-litre engine, upgraded suspension, 6-speed gearbox)

**Section: Get to know our team**

| Person | Role | Bio |
|---|---|---|
| Derek Tansley | Managing Director | FIMI MIRTE MSOE. Started as technician's apprentice, built successful commercial vehicle garage. Oversees operations. |
| George Smith | Sales Director | FIMI. Family car repair business, then Fruit & Veg wholesaler MD at New Covent Garden Market. Sales & general management. |
| John Skinner | General Manager/Service Manager | Apprentice at 17, Master Technician, recently General Manager. |
| Ian Scrogie | Accounts Manager | MAAT. Since 2013, 20+ years experience. All financial responsibility. |
| Kimberley Perkins | Admin Manager | Since 2013. Administration, invoicing, warranty, office oversight, customer care. |

---

### 4.3 Isuzu Truck Sales (`/isuzu-truck-sales/`)

**Title:** DT Trucks Barking - Isuzu Sales, Service and repairs!

**Sales Introduction:**
- Wide selection of trucks for purchase
- Contact: mobile, contact form, or email
- George Smith – over 30 years in commercial vehicles
- Covers London, Essex, Hertfordshire
- Supports transport managers, fleet managers, business owners

**Why Choose:**
- Expert Guidance: right truck and body for load and delivery frequency
- O Licence Assistance
- Flexible Finance: Hire Purchase, Lease Purchase, Operating Lease, Contract Hire

**Contact:** 07450 444 888 | George.Smith@dttrucks.com

#### Isuzu Truck Range

**3.5 tonnes GVW – N35.125 Grafter**
- Light truck for busy workloads
- Best Builders' Truck seven years in a row (Trade Van Driver)
- Two models: 1.9L 123PS Grafter Green (N35.125), 3.0L 150PS Grafter Blue (N35.150)
- Single or twin rear wheels, tow 3.5 tonnes, Driveaway range with short lead times

**5.5/6.5 tonnes GVW – N55.150 & N65.150**
- More payload, compact cab/body design
- Popular with arborists, breweries, local authorities
- N55: narrow cab option; N65: manual or Easyshift automated transmission

**7.5 tonnes GVW – N75.150 & N75.190**
- Market leaders in recovery sector
- Outstanding payload + reliability for distribution, local delivery, plant hire
- N75 Forward: day cab, crew cab, 5.2L N75.190, manual and Easyshift
- N75.150: 3.0L engine for low mileage urban deliveries

**11 & 13.5 tonnes GVW – F110.210 & F135.240**
- "Big truck" performance, "small truck" footprint
- 11t: tipper and beavertail, compact cab, lower chassis
- 13.5t: Easyshift for scaffolders, box/curtainside
- Step up from N-Series, lightweight at heavier weight ranges

#### Isuzu Driveaway Trucks

| Vehicle | Models | Description |
|---|---|---|
| 3.5 Tonne TIPPER | N35.125(S), N35.125(T), N35.150(T) | Reliable on-site workmates |
| 7.5 Tonne TIPPER | N75.150(E), N75.190(E) | Efficient workhorse, Easyshift gearbox |
| 3.5 Tonne DROPSIDE | N35.125(T) | Two body lengths, landscape gardeners, scaffolders, plant hire |
| 3.5 Tonne UTILITRUCK | N35.125(T) | Tipper with lockable toolpod |
| 7.5 Tonne DROPSIDE | N75.150(E), N75.190(E) | Payload from 4,000kg |
| 7.5 Tonne BOX | N75.190(E) BOX COLUMN, N75.190(E) BOX TUCKAWAY | 5.2L 190PS, column or tuckaway tail lift |
| 7.5 Tonne CURTAINSIDER | N75.190(E) CURTAINSIDE TUCKAWAY | Low chassis, Easyshift automated gearbox |

**Images on page:** George-Isuzu.jpg, GVW category images, all Driveaway vehicle photos

---

### 4.4 Service & Parts (`/barking-trucks-isuzu/`)

**Title:** DT Trucks Barking - Isuzu Sales, Service and repairs!

**Location:** Castle Works, 721 Ripple Rd, Barking IG11 0SN

**Intro:**
THE ONE-STOP REPAIR SHOP. Specialise in ISUZU but maintain ANY vehicle. Tailor-made packages for individuals from one car-derived van to hundreds of LGVs. Fully committed to ISUZU CARE Programme.

#### Services

**Test Centre / Workshop**
- 10 service bays, 30 employees
- 4 Master techs, IRTEC accredited
- 5 Tacho trained technicians
- Technicians 19–62 years (131 years combined experience)
- Service/repair: car-derived vans up to 18m 44-tonne

**Isuzu Trained Technicians**
- Highest standards demanded by Isuzu Truck
- Latest computer diagnostic equipment
- Engines, transmissions, steering, braking, suspension, electrics

**Tachograph Centre**
- Fully equipped calibration centre
- Wide selection of tachograph heads and sender units
- Gen 2 Smart Tachograph equipment
- All consumables stocked

**24/7 Roadside Breakdown Assistance**
- 24/7/365 coverage
- Multiple fully equipped service vehicles
- Phone call to kerbside in under 90 minutes

**On-Site Maintenance**
- Barking is Service HQ
- On-premises maintenance for large fleets
- Safety inspections, servicing, repairs

**Specialist Vehicles & Plant**
- UXO Survey and disposal vehicles
- PTS & Blue Light vehicle adaptations
- Aviation ground equipment
- Specialist vehicle maintenance

**Air Conditioning Recharge**
- All vehicle types: passenger cars to 44-tonne HGV tractor units
- Refrigerated systems
- Certified technicians, fleet-ready

**Roller Brake Testing**
- HGV trucks and trailers
- Required for Operator Licensing inspection standards
- DVSA safety compliance

**Contact Barking Form:** Name, Email (required), Subject, Message

---

### 4.5 Tachograph Calibrations (`/tachograph-calibrations/`)

**Title:** Tachograph Calibrations Barking - DT Trucks - Isuzu Dealership

**Heading:** Tachograph Calibration Services in Essex & the South East

**Subheading:** Smart • Digital • Analogue • DVSA‑Approved

DVSA-approved tachograph calibration for smart, digital and analogue systems. HGVs, trailers, fleet vehicles. Barking, Essex, South East.

#### Smart Tachograph Calibration (Gen1 & Gen2)
- Full calibration and accuracy checks
- Sensor and motion data verification
- Fault diagnosis and repairs
- Replacement smart tachograph units
- Compliance checks for O-Licence inspections

#### Digital Tachograph Calibration
- Digital head calibration
- Printer testing and verification
- Data accuracy checks
- Fault finding and repairs
- DVSA-approved compliance testing

#### Tachograph Units, Consumables & Accessories in Stock
- Smart tachograph units (Gen1 & Gen2)
- Digital tachograph heads
- Printer rolls
- Sensors & sender units
- Seals, cables, installation components

#### Why Choose DT Trucks
- DVSA-approved tachograph centre
- Fast turnaround times
- Experienced, qualified technicians
- Full O-Licence compliance
- Smart, digital, analogue supported
- Stock of all major units and consumables
- Barking, Essex location
- Trusted across South East

#### FAQs

| Question | Answer |
|---|---|
| How often does my tachograph need calibrating? | Every 2 years, or sooner after repairs, tyre size changes, or faults |
| Do smart tachographs need different calibration? | Yes, Gen1 & Gen2 require specialist equipment |
| Can you replace faulty tachograph units? | Yes, stock smart, digital, analogue heads and accessories |
| Is calibration required for O-Licence compliance? | Yes, mandatory under DVSA and Operator Licence rules |
| Do you offer fleet support? | Yes, fleets of all sizes across Essex and South East |

---

### 4.6 Specialist Applications (`/specialist-applications/`)

**Title:** Specialist Applications - DT Trucks - Isuzu Dealership

**Content:**
Specialised maintenance and repair for Isuzu Trucks and diverse other equipment. Enhancing reliability and longevity.

**Comprehensive Equipment Maintenance:**
- Aviation ground equipment
- Plant equipment
- UXO (Unexploded Ordnance) survey and disposal equipment
- Precision and reliability focus

**Nationwide and International Reach:**
- Outstanding service across UK
- International services in exceptional cases

**Why Choose DT Trucks Limited:**
- Extensive experience and expertise
- Comprehensive services, nationwide reach
- Preferred choice for specialised maintenance and repair

---

### 4.7 eBay Listings (`/ebay-listings/`)

**Title:** eBay Listings - DT Trucks - Isuzu Dealership

**Heading:** Isuzu Trucks & Parts for sale!

**Content:** Minimal on-page text. Page title indicates eBay integration for selling Isuzu trucks and parts online. Likely embeds eBay store widget (content loaded dynamically).

---

### 4.8 Contact (`/contact/`)

**Title:** Contact - DT Trucks - Isuzu Dealership

**Heading:** Your issue is ours!

**Intro:**
Contact information, contact form for sales/issue queries without personal email. Feedback matters. Operate five business days, respond within 24 hours (allow up to 48 hours before resubmitting).

**Contact Information:**
- **Address:** Castle Works, 721 Ripple Road, Barking, Essex IG11 0SN
- **What3Words:** ///TONIC.SMALL.AGES
- **Sales:** 020 8595 4400
- **Parts:** 020 8595 4400
- **Service:** 020 8595 4400
- **Email:** enquiries@dttrucks.com

**Contact Form:** Name, Email (required), Subject, Message

**DT Trucks Location:** Map embed (likely Google Maps)

---

### 4.9 Jobs (`/jobs/`)

**Title:** Jobs - DT Trucks - Isuzu Dealership

**Content:** Uses WordPress EasyJobs plugin embed `[easyjobs]`. Job listings loaded dynamically from EasyJobs service. Page exists but not in primary navigation.

---

## 5. Blog / News Posts

**Blog Index:** `/blog/` — "Latest News & Updates"

| Post | URL | Date (Archive) | Category | Summary |
|---|---|---|---|---|
| Exclusive Discount on AC Regassing! | `/exclusive-discount-on-ac-regassing/` | Sep 2025 | Commercial Vehicle News | End-of-summer discount on AC regassing for fleet customers. Mobile service for large fleets. Contact Info@dttrucks.com |
| Why Isuzu Trucks are Great for Small Businesses | `/isuzu-for-small-business/` | Jan 2021 | Uncategorized | Long-form article on Isuzu benefits for small businesses: reliability, affordability, payload capacity, compact footprint for urban delivery |

### Post Detail: Why Isuzu Trucks are Great for Small Businesses

**Sections:**
1. **They're reliable** – Robust construction, DT Trucks service support, hard-wearing for towns/cities
2. **Affordable Trucks** – Competitive pricing, low maintenance costs, good fuel economy
3. **Payload capacity** – Engineered for maximum payload
4. **The Truck's Footprint** – Compact cab, 90° door opening, urban delivery friendly, small roads/country lanes

### Post Detail: Exclusive Discount on AC Regassing!

- End-of-summer fleet discount on AC regassing
- Mobile service for large fleets ("we can come to you")
- Contact: Info@dttrucks.com

---

## 6. Legal & Policy Pages

### 6.1 Terms & Conditions (`/terms-conditions-dt-trucks-ltd/`)

**Applies to:** Workshop/service work on vehicles

**Key Points (15 clauses):**
1. "The Customer" and "The Vehicle" definitions
2. Liability limited to agreed work performance
3. Contracts valid only in writing on DT Trucks Workshop Instructions Form
4. Authorised to use vehicle on highway for agreed work
5. Payment due when work completed and vehicle ready; payment before release unless agreed
6. 5% interest over Barclays base rate on overdue amounts
7. Legal lien on vehicles; title passes only on full payment
8. Vehicles left at risk of customer; no liability for loss/damage/delay
9. Limited warranties; will correct faults from DT Trucks default/negligence
10. Agreements personal to customer, non-assignable
11. Washing/cleaning costs chargeable if required for operations
12. Termination rights on bankruptcy/insolvency
13. Storage charges after 7 days if vehicle not collected
14. 10% handling fee on correctly supplied returned goods
15. Daily storage charges after 28 days on premises

Contact: enquiries@dttrucks.com

### 6.2 Conditions of Sale (`/conditions-of-sale/`)

**Applies to:** Vehicle/truck sales

**Key Points (13 clauses + Data Protection):**
1. Additional Benefits – manufacturer warranty passed to purchaser (new/used)
2. Seller contracts as principal, not agent
3. Specification changes/discontinuance – seller may deliver updated spec or cancel
4. Payment – ruling price at order, full payment before delivery; price increase cancellation rights
5. Delivery – seller premises unless agreed; risk passes on delivery; property passes on payment
6. Deposit – forfeited on cancellation (except specified cases)
7. Negligence and consequential loss – limited liability, consumer rights preserved
8. Variation only in writing
9. Notice requirements
10. Finance agreement provisions (Consumer Credit Act 1974)
11. Contract effective when signed by both parties
12. Third parties (Contracts Rights of Third Parties Act 1999)
13. English Law governs

**Data Protection:** Customer data retained for credit/commercial decisions and product marketing (opt-out available)

**Company:** DT Trucks Limited, Reg. 9501804, 721 Ripple Road, Barking, Essex IG11 0SN

### 6.3 GDPR (`/gdpr/`)

**Title:** General Data Protection Regulation (GDPR)

Full privacy and personal data protection policy covering:
- Data about employees, customers, website users, subscribers, stakeholders
- GDPR principles: lawfulness, purpose limitation, data minimisation, accuracy, storage limitation, integrity
- Data subject rights and timescales (Table of 8 rights)
- Lawful bases: consent, contract, legal obligation, vital interests, public interest, legitimate interests
- Privacy by design, DPIAs
- International transfers, DPO assessment (not required), breach notification (72 hours)
- Accountability documentation requirements

Related policies referenced: DPIA Process, Personal Data Mapping, Legitimate Interest Assessment, Incident Response, GDPR Roles, Records Retention

---

## 7. External Integrations & Third-Party Services

| Service | Purpose | Rebuild Consideration |
|---|---|---|
| **WordPress** | Current CMS | Replace with Next.js + custom admin |
| **Yoast SEO** | SEO/sitemaps | next-seo or built-in metadata API |
| **W3 Total Cache** | Performance caching | Next.js ISR/SSR, CDN |
| **RevSlider** | Homepage slider | Custom React carousel or Framer Motion |
| **EasyJobs** | Job listings | Custom careers module or integrate API |
| **eBay** | Parts/truck sales listings | eBay API embed or manual listing management |
| **Google Analytics** | UA-126839969-1 | GA4 via next/script or @next/third-parties |
| **Live Chat** | Customer support widget | Intercom, Crisp, Tawk.to, or custom |
| **Softr** | Internal staff portal (dttvho.softr.app) | Separate system; link only or rebuild |
| **YouTube** | Embedded promotional videos | YouTube embed component |
| **Google Maps** | Contact page location | Google Maps embed or Mapbox |
| **Facebook Share** | Social sharing | Open Graph meta + share buttons |
| **Font Awesome / RevSlider fonts** | Icons | Lucide React or Heroicons |
| **Google Fonts (Roboto)** | Typography | next/font |

---

## 8. Media & Assets Inventory

### Logo & Branding
- DT Trucks Logo: `/wp-content/uploads/2016/12/DT-Trucks-Logo.png`
- Tagline: "The Next Generation Of Trucks!"
- Brand: DT Trucks – Isuzu Dealership

### Truck Sales Images
- George-Isuzu.jpg (sales contact photo)
- 3.5-tonnes-GVW.jpg, 5.5-6.5-tonnes-GVW.jpg, 7.5-tonnes-GVW.jpg, 11-13.5-tonnes-GVW.jpg
- Driveaway images: 3.5t Tipper, 7.5t Tipper, 3.5t Dropside, 3.5t Utilitruck, 7.5t Dropside, 7.5t Box, 7.5t Curtainsider

### Specialist Applications Images (2025)
- IMG_8766-scaled.jpeg, IMG_8766-2-scaled.jpeg, IMG_8770-scaled.jpeg
- IMG_9690-scaled.jpeg, IMG_7965-scaled.jpeg, IMG_3326-scaled.jpeg
- Photoroom_028_20240408_145320.jpeg

### YouTube Videos (Homepage)
1. The Isuzu Production Facility
2. Behind the Scenes at Isuzu Truck
3. Isuzu Grafter Green
4. Features Video - 7.5t Walk Around
5. (Additional embed – 5th video)

---

## 9. Content Gaps & Notes for Rebuild

### Items to Clarify with Client

1. **eBay Listings** – Confirm eBay store URL and whether to embed API listings or manage manually in admin
2. **Jobs/Careers** – EasyJobs plugin in use; decide: custom careers CMS or third-party (e.g. Workable, Greenhouse)
3. **Internal Portal** – Softr app (dttvho.softr.app) is separate; keep external link or rebuild?
4. **Live Chat** – Identify current provider and migrate or replace
5. **Contact Form Submissions** – Current destination (email only? CRM?)
6. **Parts Ordering** – No online parts ordering currently; consider for rebuild?
7. **Service Booking** – No online booking currently; high-value feature to add
8. **Fleet Customer Portal** – Login area for fleet managers?
9. **Tachograph page** – Not in main nav but substantial content; promote in nav?
10. **GDPR page** – Exists but not in nav; link from footer privacy/cookie banner

### Recommended New Features (Not on Current Site)

- Online service booking / appointment scheduling
- Parts enquiry form with vehicle model selection
- Fleet customer login portal
- Truck configurator or enquiry per model
- WhatsApp click-to-chat
- Google Reviews integration
- Case studies / customer testimonials section
- Mobile-first responsive redesign (verify current mobile UX)
- Structured data (LocalBusiness, AutoRepair, Product schema)
- Multi-language (if needed for international clients mentioned on specialist page)

### SEO Keywords (Observed)

- Isuzu dealer London, Isuzu dealer Essex, Isuzu Barking
- Isuzu truck sales, Isuzu parts, Isuzu servicing
- Tachograph calibration Essex, DVSA tachograph Barking
- Commercial vehicle servicing London
- HGV workshop Barking, fleet maintenance Essex
- Isuzu Grafter, Isuzu Forward, Driveaway trucks

---

*End of structure.md*
