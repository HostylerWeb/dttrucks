# Design direction (George / P700 refresh)

- **Logo:** Unchanged DT Trucks assets in `SiteLogo` — do not swap marks or colours in the logo files.
- **Palette:** Isuzu red stays the accent (`primary` / `primary-container`) for CTAs and highlights. Page backgrounds are **white** and light grey; avoid full-width black bars (footer, heroes, stats bands use light surfaces).
- **Reference:** [Isuzu Truck UK](https://www.isuzutruck.co.uk/) — clean range pages, weight-class tabs, specification sheet hub — adapted for DT copy and Barking/London/Essex positioning.
- **Sales IA:** Separate **11t** and **13.5t** GVW tabs; spec PDFs via `/sales/specification-sheets`; body enquiries via `/sales/body-quote` (no online pricing).
- **Content:** P700 generation messaging cross-links blog + spec hub from home and `/sales`.

When adding new public UI, prefer light sections, red only for primary actions, and existing typography tokens in `globals.css`.
