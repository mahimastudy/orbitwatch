import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import { createReadStream, cpSync, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const cesiumSource = join(process.cwd(), "node_modules/cesium/Build/Cesium");

function cesiumAssets(): Plugin {
  return {
    name: "cesium-assets",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/cesium", (req, res, next) => {
        const relativePath = normalize(req.url?.split("?")[0] ?? "").replace(/^(\.\.(\/|\\|$))+/, "");
        const file = join(cesiumSource, relativePath);
        if (!existsSync(file) || !statSync(file).isFile()) return next();
        const types: Record<string, string> = { ".js": "text/javascript", ".json": "application/json", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
        res.setHeader("Content-Type", types[extname(file)] ?? "application/octet-stream");
        createReadStream(file).pipe(res);
      });
    },
    closeBundle() {
      cpSync(cesiumSource, join(process.cwd(), "dist/cesium"), { recursive: true });
    },
  };
}

const allowedSatelliteIds = new Set(["25544", "54207", "49260", "43013", "20580", "48274", "39634", "40697", "42063", "39084", "27424", "25994", "43613", "33591", "37849", "41765", "28485", "40069", "46984", "44713"]);

function n2yoProxy(apiKey: string, observerLat: string, observerLng: string): Plugin {
  return {
    name: "n2yo-server-proxy",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/n2yo", async (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");
        if (!apiKey) { res.statusCode = 503; res.end(JSON.stringify({ error: "N2YO is not configured" })); return; }
        const url = new URL(req.url ?? "/", "http://localhost");
        const operation = url.pathname.replace(/^\//, "");
        const satelliteId = url.searchParams.get("id") ?? "";
        if (!allowedSatelliteIds.has(satelliteId) || !["positions", "visualpasses"].includes(operation)) {
          res.statusCode = 400; res.end(JSON.stringify({ error: "Invalid satellite request" })); return;
        }
        const suffix = operation === "positions" ? "0/1" : "0/10/120";
        const upstream = `https://api.n2yo.com/rest/v1/satellite/${operation}/${satelliteId}/${observerLat}/${observerLng}/${suffix}/&apiKey=${apiKey}`;
        try {
          const response = await fetch(upstream);
          res.statusCode = response.status;
          res.end(await response.text());
        } catch {
          res.statusCode = 502; res.end(JSON.stringify({ error: "Satellite service unavailable" }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), cesiumAssets(), n2yoProxy(env.N2YO_API_KEY ?? "", env.OBSERVER_LATITUDE ?? "42.3314", env.OBSERVER_LONGITUDE ?? "-83.0458")],
    define: { CESIUM_BASE_URL: JSON.stringify("/cesium") },
  };
});
