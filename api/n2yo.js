const allowedSatelliteIds = new Set(["25544", "54207", "49260", "43013", "20580", "48274", "39634", "40697", "42063", "39084", "27424", "25994", "43613", "33591", "37849", "41765", "28485", "40069", "46984", "44713"]);

export default async function handler(request, response) {
  const apiKey = process.env.N2YO_API_KEY;
  if (!apiKey) return response.status(503).json({ error: "N2YO is not configured" });

  const operation = Array.isArray(request.query.operation) ? request.query.operation[0] : request.query.operation;
  const satelliteId = Array.isArray(request.query.id) ? request.query.id[0] : request.query.id;
  if (!allowedSatelliteIds.has(satelliteId) || !["positions", "visualpasses"].includes(operation)) {
    return response.status(400).json({ error: "Invalid satellite request" });
  }

  const latitude = process.env.OBSERVER_LATITUDE ?? "42.3314";
  const longitude = process.env.OBSERVER_LONGITUDE ?? "-83.0458";
  const suffix = operation === "positions" ? "0/1" : "0/10/120";
  const upstream = `https://api.n2yo.com/rest/v1/satellite/${operation}/${satelliteId}/${latitude}/${longitude}/${suffix}/&apiKey=${apiKey}`;
  try {
    const upstreamResponse = await fetch(upstream);
    const data = await upstreamResponse.json();
    response.setHeader("Cache-Control", operation === "positions" ? "s-maxage=30, stale-while-revalidate=60" : "s-maxage=300, stale-while-revalidate=600");
    return response.status(upstreamResponse.status).json(data);
  } catch {
    return response.status(502).json({ error: "Satellite service unavailable" });
  }
}
