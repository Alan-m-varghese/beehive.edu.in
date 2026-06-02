# 🐝 Beehive - Gamified Decentralized Learning Platform

Welcome to **Beehive**, a premium, gamified single-page educational application where students harvest knowledge, verified mentors build hives of learning, and administrators maintain quality control. 

This repository houses the production-ready **Vite + React** codebase, designed with sleek glassmorphism, responsive micro-animations, and fluid 3D card tilt effects.

---

## 🎨 Design Philosophy & Features

Beehive is built to stand out with premium visual aesthetics and immersive interactions:

* **Premium Glassmorphic Design:** Harmonies of translucent overlays, customized dark modes, and soft radial glows.
* **Cinematic Background Canvas:** A hardware-accelerated Bezier wave background layer, completed with vignette filters, fading grids, and an overlay of cinematic film grain.
* **Gamified Syllabi & Honey Wallet:** Structured visual honeycomb CSS grids. Complete module units to earn Honey Drops, level up ranks (from *Worker Bee* to *Queen Bee*), and unlock profile achievement badges.
* **Immersive Classrooms:** Clean video streamers aligned with interactive syllabus indexes.
* **Interactive 3D Tilt Cards:** Premium cards that dynamically alter their 3D perspective angle and shadow coordinates based on cursor movement.
* **Office Hours Slot Scheduler:** Fully interactive slot builder for mentors and demo booking grid for students.
* **Simulated Video Uploader:** Simulated transcoding video pipeline (uploading ➔ transcoding ➔ indexing ➔ completion verification) to verify lesson files before submission.

---

## 💻 Tech Stack

* **Core:** [React 18.3](https://react.dev/) (Functional Components, Hooks)
* **Build System:** [Vite 5.3](https://vite.dev/) (High-performance HMR bundler)
* **Styling:** Custom modern Vanilla CSS (Dynamic HSL variables, hardware compositor translations, glassmorphism filters)
* **State Management:** React Context API (`DbContext` backing LocalStorage transactions)

---

## 📂 Project Directory Structure

```bash
beehive/
├── assets/                     # Image assets & reference documents
├── src/
│   ├── components/             # Reusable React UI Components
│   │   ├── AdminDashboard.jsx  # Metrics, Verification Queues, User Controls
│   │   ├── AuthModal.jsx       # 3D 카드 Login/Register Flipper
│   │   ├── BackgroundCanvas.jsx# 2D waves & grain noise canvas engine
│   │   ├── LandingPage.jsx     # Hero headers, marketplaces, FAQ accordions
│   │   ├── MentorDashboard.jsx # Course builders, uploader simulations, slots
│   │   ├── Navbar.jsx          # Mobile drawer and role-aware navigation
│   │   ├── StudentDashboard.jsx# Syllabi Honeycombs, Classroom, Wallets
│   │   └── TiltCard.jsx        # 3D card tilt effect wrapper
│   ├── context/
│   │   └── DbContext.jsx       # Reactive State wrapper context provider
│   ├── js/
│   │   └── mockDb.js           # LocalStorage query interface helper
│   ├── App.jsx                 # Routing logic & monochrome layout transitions
│   ├── main.jsx                # Application root mounting script
│   └── style.css               # Premium styles database
├── index.html                  # Vite mounting point template
├── package.json                # Dependency manifest
├── vite.config.js              # Vite server configs
└── README.md                   # Documentation index
```

---

## 🚀 Getting Started

Ensure you have **Node.js** installed on your machine.

### 1. Clone & Install Dependencies
Navigate into your cloned project directory and fetch dependencies:
```bash
npm install
```

### 2. Start the Local Server
Launch Vite's high-speed development server:
```bash
npm run dev
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

---

## 👥 Seed Profiles for Testing (Password: `password`)

You can explore the full multi-role workflow using the following seeded credentials:

| Username | Role | Purpose / Tabs to Inspect |
|---|---|---|
| **`student1`** | **Student** | Honey Wallet, Explore marketplace, Immersive Classroom (Honeycomb cells), Slot bookings. |
| **`mentor1`** | **Mentor** | Workspace Analytics, Course Builder Form (Lessons, Video Uploader), Office Hours Scheduler. |
| **`mentor2`** | **Mentor** | *Unverified Profile* - Demonstrates pending approval states. |
| **`admin1`** | **Admin** | Overview Statistics, Users Control (Verification / Suspensions), Course Verification Queue. |

---

## 🔄 How the Data Syncs

1. All actions (creating courses, enrolling, booking slots, verifying mentors, updating lesson progress) update the React state through the `useDb()` hook.
2. The context calls [mockDb.js](file:///Users/alanmvarghese/alan/freelance/beehive/src/js/mockDb.js) to read and write these records directly into the browser's **LocalStorage**.
3. **For Backend Integration:** Since data access is encapsulated in [mockDb.js](file:///Users/alanmvarghese/alan/freelance/beehive/src/js/mockDb.js), transitioning to a real server (e.g. Node/Express, Supabase, or Firebase) requires only swapping the local utility functions with standard `fetch` API requests. The frontend views will work instantly without edits.
