import type { Satellite } from "../types/satellite";

interface N2yoPosition {
  satlatitude: number;
  satlongitude: number;
  sataltitude: number;
}

interface N2yoResponse { positions?: N2yoPosition[]; }
interface N2yoVisualPass { startUTC: number; endUTC: number; maxEl: number; }
interface N2yoVisualPassResponse { passes?: N2yoVisualPass[]; }

export const hasLiveApiKey = true;

export async function fetchLivePositions(satellites: Satellite[]): Promise<Satellite[]> {
  const requests = satellites.map(async (satellite) => {
    const response = await fetch(`/api/n2yo/positions?id=${encodeURIComponent(satellite.id)}`);
    if (!response.ok) throw new Error(`N2YO request failed (${response.status})`);
    const data = await response.json() as N2yoResponse;
    const position = data.positions?.[0];
    return position ? {
      ...satellite,
      latitude: position.satlatitude,
      longitude: position.satlongitude,
      altitude: Math.round(position.sataltitude),
    } : satellite;
  });

  return Promise.all(requests);
}

export interface LivePassPrediction {
  minutesUntil: number;
  durationMinutes: number;
  maximumElevation: number;
}

export async function fetchNextVisiblePass(satelliteId: string): Promise<LivePassPrediction | null> {
  const response = await fetch(`/api/n2yo/visualpasses?id=${encodeURIComponent(satelliteId)}`);
  if (!response.ok) throw new Error(`N2YO visual-pass request failed (${response.status})`);
  const data = await response.json() as N2yoVisualPassResponse;
  const pass = data.passes?.find((candidate) => candidate.endUTC * 1000 > Date.now());
  if (!pass) return null;
  return {
    minutesUntil: Math.max(0, Math.ceil((pass.startUTC * 1000 - Date.now()) / 60_000)),
    durationMinutes: Math.max(1, Math.round((pass.endUTC - pass.startUTC) / 60)),
    maximumElevation: Math.round(pass.maxEl),
  };
}
