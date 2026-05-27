# Nice Healthcare — Clinician Dispatch

A React + TypeScript tool that finds the optimal clinician for a patient visit, ranked by total drive distance.

## Features

- Enter any patient address and instantly see all clinicians ranked by total trip miles
- Toggle **Lab drop-off** to route `Home → Patient → Nearest Lab → Home` instead of the standard round-trip
- Haversine (great-circle) distance calculation using pre-geocoded clinician and lab coordinates
- Best-match hero card with full route breakdown

## Project Structure

```
nh-web-code-challenge-raji-darba
│
├── src
│   ├── components
│   │   └── ClinicianDispatch.tsx   # UI — form, best-match card, ranked list
│   │
│   ├── data
│   │   └── locations.ts            # Static clinician & lab coordinates
│   │
│   ├── types
│   │   └── index.ts                # Shared TypeScript interfaces
│   │
│   ├── utils
│   │   └── dispatch.ts             # Haversine, geocoding stub, dispatch algorithm
│   │
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Vite entry point
│   └── index.css                   # Global styles & CSS design tokens
│
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Production Build

```bash
npm run build   # type-checks + bundles to dist/
npm run preview # preview the production build locally
```

## Implementation Notes

| Concern | Current (demo) | Production recommendation |
|---|---|---|
| **Patient geocoding** | Deterministic hash → fake MN-area lat/lng | Call a geocoding API (Google Geocoding, Nominatim) |
| **Distance calculation** | Haversine crow-flies miles | Call a routing API (Google Maps, Mapbox, OSRM) for road distance/time |
| **Clinician availability** | All clinicians always available | Filter by shift schedule / real-time availability |
| **Lab selection** | Nearest lab to patient (crow-flies) | Factor in lab hours, specimen handling requirements |
