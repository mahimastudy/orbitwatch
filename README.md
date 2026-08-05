# OrbitWatch

Interactive low Earth orbit satellite tracking on a real-time 3D globe.

OrbitWatch visualizes active spacecraft with CesiumJS, natural-color Earth imagery, orbital paths, live N2YO positions, and observer-specific visible-pass predictions. It includes dedicated climate-mission tools for exploring satellites such as Landsat, Sentinel, Terra, Aqua, and ICESat-2.

## Version

Current release: **v0.1.0**

## Features

- Interactive CesiumJS globe with drag, tilt, wheel, and pinch controls
- Natural-color Esri/Maxar Earth imagery
- Full-world and satellite-focused camera views
- Live satellite latitude, longitude, and altitude from N2YO
- Live visual-pass predictions based on observer location
- Orbital paths anchored to current satellite positions
- Searchable and scrollable satellite catalog
- Climate, station, science, and communications filters
- Satellite telemetry including velocity, inclination, altitude, and orbital period
- Responsive layout optimized for laptop displays
- Server-side N2YO proxy that keeps the API key out of browser bundles
- Local Vite and Vercel deployment support

## Technology

- React 19
- TypeScript
- Vite
- CesiumJS and Resium
- N2YO REST API
- Lucide React
- Vercel serverless functions

## Getting started

### Requirements

- Node.js 20 or newer
- npm
- A free [N2YO API key](https://www.n2yo.com/api/)
- An optional [Cesium ion token](https://ion.cesium.com/tokens)

### Installation

```bash
git clone https://github.com/mahimastudy/orbitwatch.git
cd orbitwatch
npm install
```

Create a `.env` file in the project root:

```env
N2YO_API_KEY=your_n2yo_api_key
OBSERVER_LATITUDE=42.3314
OBSERVER_LONGITUDE=-83.0458

# Optional with the current Esri imagery layer
VITE_CESIUM_ION_TOKEN=your_cesium_ion_token
```

Replace the observer coordinates with your location. These coordinates are used to calculate which satellite passes are visible to you.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Globe controls

| Action | Control |
| --- | --- |
| Rotate Earth | Click and drag |
| Zoom | Mouse wheel, trackpad, or pinch |
| Tilt | Secondary-button drag |
| Select satellite | Click its marker or list entry |
| Show the entire Earth | Select **World view** |

## Live data

The browser requests data only from the local `/api/n2yo` endpoint. The server-side proxy adds the N2YO credential before forwarding approved requests.

Position data refreshes every five minutes. Visible-pass predictions refresh every five minutes and whenever a different satellite is selected. If N2YO is unavailable or not configured, the globe continues with demonstration positions and hides pass predictions rather than displaying placeholder values.

## Available commands

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run lint     # Run Oxlint
npm run preview  # Preview the production build
```

## Deploying to Vercel

Import the GitHub repository into Vercel and configure these environment variables under **Project Settings → Environment Variables**:

```env
N2YO_API_KEY=your_n2yo_api_key
OBSERVER_LATITUDE=your_latitude
OBSERVER_LONGITUDE=your_longitude
VITE_CESIUM_ION_TOKEN=your_optional_cesium_token
```

The included `api/n2yo.js` function handles production API requests, while `vercel.json` routes the frontend endpoints to that function.

## Security

- Never commit `.env`.
- The N2YO key must use `N2YO_API_KEY`, without a `VITE_` prefix.
- Variables prefixed with `VITE_` are exposed to the browser.
- Use a Cesium token restricted to the required assets, permissions, and deployment URLs.
- Rotate credentials immediately if they are accidentally committed or shared publicly.

## Data attribution

- Satellite tracking and pass predictions: [N2YO](https://www.n2yo.com/api/)
- Globe rendering: [CesiumJS](https://cesium.com/platform/cesiumjs/)
- Earth imagery: Esri, Maxar, and Earthstar Geographics

## License

No license has been selected yet. All rights are reserved until a license file is added.
