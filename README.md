# Travel Day Companion App ✈️🚆

A production-ready mobile web application built with **React, TypeScript, Vite, and Tailwind CSS** based on the **Stitch Nocturnal Transit** design system.

![Obsidian Dark Mode](https://img.shields.io/badge/Theme-Obsidian%20Dark-121414?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🌟 Key Features

- **📱 Dual Viewport Mode**: Switch between an authentic 3D Mobile Phone Frame View and a Responsive Full-Screen View.
- **🛫 Module A: Flight / Train Itinerary Input**: Toggle between Flight and Train modes, input Carrier Code, Origin/Destination, Date/Time, and PNR. Includes quick preset loaders for instant testing.
- **⏱️ Module B: Dynamic Travel Day Timeline**:
  - **Smart Departure Alert**: "Leave Home In 25m" recommendation, live traffic status ("Traffic is light to JFK"), and "Book Uber" quick action.
  - **Check-in & Bag Drop**: Live ticking countdown (`00:45:00`) for bag drop closure and tap-to-reveal boarding pass preview.
  - **Gate & Terminal Hub**: High-visibility badges for Gate `B12` and Terminal `T2`.
  - **Weather Widget**: Live origin & destination weather cards (`JFK 22°C Sunny`, `LHR 15°C Rainy`).
  - **Interactive Quick Checklist**: Swipeable checkable cards (`Passport`, `Power Bank`, `Wallet`, `Meds`) with completion counter and local persistence.
- **🎟️ Module C: Offline Boarding Pass & QR Code Generator**: Active Pass card (LHR ✈ JFK, Flight AI 202, On Time status), expandable dynamic SVG QR code generator (`PNR: X7Y8Z9`), and offline saved documents manager (`Passport Copy`, `Hotel Voucher`, `Travel Insurance`).
- **🚖 Module D: Transit Hub & Ride Hail Options**: Express Rail widget (`14 min`, Platform 2, On Time), interactive ride options (`Uber Black $54.20`, `Lyft XL $48.50`, `UberX Green $32.10`), and live ride request simulation modal with driver assignment and deep-link launcher.
- **👤 Module E: Profile & Preferences**: Pro Member profile card (`Alex Walker`), loyalty miles/points, AI Smart Alerts switch, High Contrast mode switch, emergency contacts modal, and app data reset feature.
- **📷 Module F: Barcode & PNR Scanner**: Central floating scanner button on bottom navigation bar opens full-screen simulated camera viewfinder for ticket/PNR scanning.
- **📶 Module G: Offline Network Detector**: Automatic network status detector + header toggle button (`cloud_off` icon) to simulate offline mode.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/travel-day-companion.git
cd travel-day-companion

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` (or `http://localhost:3001`) in your browser.

---

## 🏗️ Project Structure

```
travel-day-companion/
├── index.html                   # HTML Entry Point
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Stitch design system color tokens & typography
├── vite.config.ts               # Vite configuration
└── src/
    ├── App.tsx                  # Root application & layout container
    ├── main.tsx                 # React entry mount
    ├── index.css                # Base Tailwind & custom utility classes
    ├── types/                   # TypeScript interfaces (Itinerary, Documents, Rides)
    ├── store/                   # Zustand-style localStorage persistence store
    ├── hooks/                   # Custom hooks (Network detector)
    ├── components/              # Reusable UI components & modals
    └── screens/                 # Core screen views (Timeline, Passes, Transit, Profile)
```

---

## 📄 License
MIT License
