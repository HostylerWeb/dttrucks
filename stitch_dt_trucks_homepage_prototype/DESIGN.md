---
name: Industrial Precision
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#5c403f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#906f6e'
  outline-variant: '#e5bdbb'
  surface-tint: '#bf0229'
  primary: '#9e001f'
  on-primary: '#ffffff'
  primary-container: '#c8102e'
  on-primary-container: '#ffdad8'
  inverse-primary: '#ffb3b1'
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#00583c'
  on-tertiary: '#ffffff'
  tertiary-container: '#00734f'
  on-tertiary-container: '#85f8c3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 16px
  container-max: 1280px
---

## Brand & Style

The design system is engineered for the commercial vehicle sector, emphasizing reliability, power, and industrial expertise. It targets B2B decision-makers, fleet managers, and logistics operators who require clarity and efficiency. 

The visual style is **Corporate Modern with Industrial influences**. It prioritizes a high-density information display while maintaining a clean, systematic layout. The emotional response is one of institutional trust and mechanical durability. The aesthetic avoids ephemeral trends, opting instead for a structured grid, purposeful whitespace, and a high-contrast palette that mirrors the "work-ready" nature of the vehicles.

## Colors

The palette is anchored by the heritage-driven Isuzu Red, used strategically for primary actions and brand identifiers. 

- **Primary:** Isuzu Red (#C8102E) serves as the catalyst for conversion and the primary focus point.
- **Secondary:** Deep Navy (#111827) provides the grounding force, used for high-level headings and structural bands to convey authority.
- **Surface & Background:** A hierarchy of Whites (#FFFFFF) and Cool Grays (#F9FAFB) creates a layered effect for alternating content sections, ensuring the interface remains breathable despite heavy data loads.
- **Success/Warranty:** Trust Green (#059669) is reserved specifically for badges, guarantees, and availability indicators to signal reliability.

## Typography

This design system utilizes a dual-font approach to balance personality with utility. 

**Plus Jakarta Sans** is used for headings to provide a modern, confident, and slightly technical feel. Its geometric nature scales well for large hero sections and model names. 

**Inter** is the workhorse for all body copy and UI labels. It was chosen for its exceptional legibility in technical specifications and data tables. For B2B applications, generous line height (1.6x) is maintained for body text to reduce eye fatigue during research and comparison.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid Grid**. Content is housed within a 12-column grid with a maximum container width of 1280px to ensure readability on ultra-wide monitors.

- **Desktop (1024px+):** 12 columns, 24px gutters, 64px outside margins.
- **Tablet (768px - 1023px):** 8 columns, 24px gutters, 32px outside margins.
- **Mobile (<767px):** 4 columns, 16px gutters, 16px outside margins.

Spacing follows a strict 8px base unit. Component-level spacing (e.g., inside cards) should prioritize vertical rhythm to separate vehicle specs clearly.

## Elevation & Depth

This design system uses **Tonal Layering** supplemented by **Industrial Shadows**. 

Depth is primarily created through subtle shifts in background color (White to Cool Gray) rather than heavy shadowing. Where elevation is required (such as vehicle selection cards), use a single, sharp, low-blur shadow:
- `Offset: 0px 4px, Blur: 12px, Color: rgba(17, 24, 39, 0.08)`

This creates a "sturdy" feel, as if components are physical panels rather than floating elements. Avoid glows or vibrant blurs. High-level navigation bars should use a 1px bottom border in a light neutral tone instead of a shadow to maintain a crisp, architectural look.

## Shapes

To reflect the structural integrity of commercial vehicles, the design system employs a **Structured Rounding** philosophy. 

Corners are set to an 8px (standard) or 12px (large) radius. This provides a professional, modern touch without appearing overly "soft" or consumer-oriented. 
- Standard components (buttons, inputs): 8px
- Large containers (cards, section modals): 12px
- Technical badges: 4px or square.

Icons must use a consistent 2px stroke weight and squared-off terminals where possible to match the industrial aesthetic.

## Components

### Buttons
- **Primary:** Solid #C8102E background, White text. High-contrast hover state (#9B0D24).
- **Secondary:** Transparent background, #111827 border (2px), #111827 text.
- **Sizing:** Large padding (16px 32px) for high-touch desktop areas.

### Cards (Inventory/Services)
- White background with a 1px border (#E5E7EB). 
- Use the 12px corner radius.
- Images should be top-aligned with no internal padding to the container edge.

### Input Fields
- Use a 1px border (#D1D5DB).
- Labels are strictly "Label-Bold" (14px) and positioned above the field.
- Active state uses an Isuzu Red (#C8102E) 2px border.

### Warranty & Trust Badges
- Use a pill-shape for badges to differentiate them from functional buttons.
- Background: #ECFDF5 (Light Green tint); Text/Border: #059669.

### Technical Data Tables
- Use alternating row stripes (Zebra striping) with #F9FAFB.
- Header row must be Secondary Navy (#111827) with White text for maximum authority and visual break.