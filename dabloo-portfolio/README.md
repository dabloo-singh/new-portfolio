# Dabloo Singh — Developer Portfolio

A responsive React + Vite portfolio featuring a persistent light/dark theme, accessible section navigation, project filtering, scroll reveals, and a lazy-loaded React Three Fiber hero scene. The 3D scene is disabled on small/touch devices and when reduced motion is requested; a CSS sphere remains as the visual fallback.

## Run locally

From the workspace root:

```powershell
npm install
npm run dev
```

Or run the app directly from this folder:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

From the workspace root:

```powershell
npm run build
npm run preview
```

Or directly from this folder:

```powershell
npm run build
npm run preview
```

## Personalize

- Update project titles, copy, tags, and verified demo links in `src/data/portfolio.js`.
- Update the skill groups in `src/data/portfolio.js`.
- Profile links and the contact email are in `src/App.jsx`.
- Experience and education entries are in `src/App.jsx`. The B.Tech CGPA is omitted until confirmed.
- Project visuals are illustrative CSS artwork, not screenshots of the live applications.
- Contact uses a `mailto:` link. It opens the visitor's email application; this site does not send, store, or track messages.

No environment variables or backend services are required.
