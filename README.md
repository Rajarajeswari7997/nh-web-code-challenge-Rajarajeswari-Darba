
# Nice Healthcare — Clinician Dispatch Dashboard

A production-style React + TypeScript application that determines the optimal clinician assignment for a patient visit based on estimated total travel distance.

Built as part of the Nice Healthcare Frontend Engineering Take-Home Assessment.

---

>>>>>>> cc0b91c (Improve README and project documentation)
## Tech Stack

- React 18
- TypeScript 5
- Vite 5
- CSS Modules
<<<<<<< HEAD

## Features

- Clinician ranking
- Haversine distance calculation
- Lab routing support
- Accessibility improvements
- Immutable architecture
=======
- Functional React Hooks

---

## Features

- Enter a patient address and rank clinicians by estimated total trip distance
- Toggle **Lab Drop-off Required** routing
- Haversine (great-circle) distance calculations using manually geocoded coordinates
- Best-match summary card
- Ranked clinician results list
- Accessible form interactions and semantic UI structure
- Immutable readonly datasets
- Modular business logic with reusable hooks/utilities

---

## Dispatch Flow

### Standard Visit

Clinician Home → Patient Home → Clinician Home

### Lab Visit

Clinician Home → Patient Home → Nearest Lab → Clinician Home

---
>>>>>>> cc0b91c (Improve README and project documentation)

## Setup

<<<<<<< HEAD
=======
```txt
src/
├── components
│   ├── ClinicianDispatch.tsx
│   └── ClinicianDispatch.module.css
│
├── hooks
│   └── useClinicianDispatch.ts
│
├── data
│   └── locations.ts
│
├── types
│   └── index.ts
│
├── utils
│   └── dispatch.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Getting Started

### Install dependencies

```bash
>>>>>>> cc0b91c (Improve README and project documentation)
npm install
```

### Start development server

```bash
npm run dev

<<<<<<< HEAD
## Build
=======
Open:

```txt
http://localhost:5173
```

---
>>>>>>> cc0b91c (Improve README and project documentation)

npm run build

<<<<<<< HEAD
## Architecture Decisions

## Assumptions

## Production Improvements
=======
```bash
npm run build
npm run preview
```

---

## Architecture Decisions

### Why CSS Modules?

CSS Modules provide:
- locally scoped styles
- maintainable styling architecture
- prevention of global style leakage
- lower runtime overhead compared to CSS-in-JS solutions

### Why Extract Business Logic Into Hooks?

Dispatch orchestration was moved into a custom hook to:
- separate UI concerns from business logic
- improve maintainability
- improve testability
- reduce component complexity

### Why Use Pure Utility Functions?

Distance calculation and ranking logic were implemented as pure functions to enable:
- deterministic behavior
- easier unit testing
- reusable domain logic
- reduced side effects

### Why Use Readonly Data?

Clinician and lab datasets are immutable to prevent accidental runtime mutation of shared application state.

---

## Assumptions

- All clinicians are assumed to be available at all times
- Patient geocoding is simulated using deterministic coordinates
- Distances are calculated using crow-flight mileage rather than road-network routing
- The nearest lab is selected solely based on geographic proximity

---

## Production Improvements

| Area | Improvement |
|---|---|
| Geocoding | Integrate Google Maps or Mapbox Geocoding API |
| Routing | Replace Haversine with real driving ETA/distance |
| Scheduling | Filter clinicians by shift availability |
| Performance | Add caching for geocoding/routing requests |
| Testing | Add unit and integration tests |
| Accessibility | Add automated accessibility CI checks |
| Monitoring | Add error tracking and telemetry |
| API Layer | Move clinician/lab data into backend services |

---

## Accessibility Considerations

The application includes:
- semantic HTML structure
- accessible form labels
- `aria-busy` loading states
- `role="alert"` error announcements
- semantic ordered ranking lists
- keyboard-friendly interactions

---

## Future Enhancements

Potential optimization factors beyond distance:
- clinician specialty matching
- patient urgency/severity
- live traffic conditions
- lab operating hours
- clinician shift balancing
- appointment scheduling windows


## Author

Rajarajeswari Darba
