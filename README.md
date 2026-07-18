# Artist Bio Page — Cold Case

A premium, highly interactive single-page portfolio/bio web application for Los Angeles-based West Coast rapper **Cold Case**. Built with React, Vite, Tailwind CSS v4, and Framer Motion, based on the original Figma design: [Figma Design Link](https://www.figma.com/design/pmF3zk2G5fXKczwLsvSfy5/Artist-Bio-Page).

---

## 🚀 Tech Stack

- **Core:** [React](https://react.dev/) (v18) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vite.dev/) (v6)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.0 with `@tailwindcss/vite` plugin)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (v12)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```
├── public/                # Static assets (favicon, etc.)
├── src/
│   ├── app/
│   │   ├── components/    # Page section components
│   │   │   ├── Header.tsx # Navigation & responsive mobile menu overlay
│   │   │   ├── Hero.tsx   # Header title & grayscaled portrait image
│   │   │   ├── Bio.tsx    # Artist background & career milestones
│   │   │   ├── Gallery.tsx# Selected discography with hover animations
│   │   │   ├── VideoSection.tsx # YouTube interview embed and custom thumbnail player
│   │   │   └── Footer.tsx # Footer social links, copyright, and newsletter signup
│   │   └── App.tsx        # Main application layout manager
│   ├── assets/            # Local images & media
│   ├── main.tsx           # React DOM entrypoint
│   └── styles/            # Tailwind imports & custom CSS variables
├── vite.config.ts         # Vite bundler configuration & custom asset resolver
├── package.json           # Project dependencies & npm scripts
└── README.md              # Project documentation
```

---

## ✨ Features Implemented

1. **Responsive Navbar:** Uses backdrop-blur with a black opacity overlay and has a smooth mobile slide-down menu.
2. **Hero Image Effect:** High-fidelity portrait of the artist using CSS filters that transition from grayscale to full color upon hovering.
3. **Animated Sections:** Leverages Framer Motion's `whileInView` viewport triggers to slide, scale, and fade sections into place cleanly as the user scrolls.
4. **Discography Cards:** Interactive release cards with hover play-button overlays, track-count indicators, and metadata styling.
5. **Interactive Video Booth:** Embeds an interview video player that dynamically swaps out the static preview thumbnail for a live YouTube player state upon user click.

---

## ⚡ Local Development

Follow these steps to run the application locally:

### 1. Install Dependencies
Make sure you have Node.js installed. In the project directory, run:
```bash
npm install
```

### 2. Start the Development Server
Launch Vite's hot-reloading dev server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
To bundle the application for production deployment:
```bash
npm run build
```

---

## 🌐 Vercel Infrastructure Support Matrix (Vite)

This project runs on the **Vite** frontend toolchain. Here is Vite's capability matrix when deployed on Vercel:

| Feature | Support Status |
| :--- | :---: |
| **Static Assets** (Served and cached at the edge) | ✓ |
| **Edge Routing Rules** (Headers, redirects, and caching) | ✓ |
| **Routing Middleware** (Run code before request processing) | ✓ |
| **Server-Side Rendering** (Dynamic backend rendering) | N/A |
| **Streaming SSR** (Chunks sent as ready) | N/A |
| **Incremental Static Regeneration (ISR)** | N/A |
| **Image Optimization** (Edge resizing/caching) | N/A |
| **Runtime Cache** (Fetch-level caching) | N/A |
| **Native OG Image Generation** | N/A |
| **Multi-runtime Support** | N/A |
| **Output File Tracing** | N/A |
| **Skew Protection** (Preventing version skew) | N/A |
| **Framework Routing Middleware** | N/A |

*(Note: N/A = Not Applicable for static single-page apps like Vite without backend SSR frameworks).*