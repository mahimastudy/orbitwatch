export type SatelliteType = "Station" | "Climate" | "Communications" | "Science";

export interface Satellite {
  id: string;
  name: string;
  shortName: string;
  type: SatelliteType;
  country: string;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  inclination: number;
  period: number;
  nextPass: number;
  status: "Active" | "Standby";
  color: string;
  description: string;
}
