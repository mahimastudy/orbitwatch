import type { Satellite } from "../types/satellite";

export const satellites: Satellite[] = [
  {
    id: "25544", name: "International Space Station", shortName: "ISS (ZARYA)", type: "Station", country: "International",
    latitude: 17.42, longitude: -38.21, altitude: 408, velocity: 27600, inclination: 51.6, period: 92.9, nextPass: 18,
    status: "Active", color: "#ff9f43", description: "Crewed orbital laboratory and microgravity research platform.",
  },
  {
    id: "54207", name: "NOAA-21", shortName: "NOAA-21", type: "Climate", country: "United States",
    latitude: 43.18, longitude: 16.6, altitude: 824, velocity: 26740, inclination: 98.7, period: 101.4, nextPass: 31,
    status: "Active", color: "#46d7ff", description: "Monitors global weather, oceans, land and atmospheric conditions.",
  },
  {
    id: "49260", name: "Landsat 9", shortName: "LANDSAT 9", type: "Climate", country: "United States",
    latitude: -18.91, longitude: 55.44, altitude: 705, velocity: 27000, inclination: 98.2, period: 99.0, nextPass: 42,
    status: "Active", color: "#a5ef70", description: "Images Earth's land surface for climate and environmental research.",
  },
  {
    id: "43013", name: "Sentinel-5P", shortName: "SENTINEL-5P", type: "Climate", country: "European Union",
    latitude: 62.81, longitude: -117.3, altitude: 824, velocity: 26790, inclination: 98.7, period: 101.0, nextPass: 8,
    status: "Active", color: "#c6a7ff", description: "Maps air pollution and tracks the composition of the atmosphere.",
  },
  {
    id: "20580", name: "Hubble Space Telescope", shortName: "HUBBLE", type: "Science", country: "United States",
    latitude: -7.12, longitude: 118.21, altitude: 535, velocity: 27300, inclination: 28.5, period: 95.4, nextPass: 56,
    status: "Active", color: "#ff6b8a", description: "Observes deep space in ultraviolet, visible and near-infrared light.",
  },
  {
    id: "48274", name: "Starlink 2624", shortName: "STARLINK-2624", type: "Communications", country: "United States",
    latitude: 31.76, longitude: 139.15, altitude: 550, velocity: 27160, inclination: 53.2, period: 95.6, nextPass: 24,
    status: "Active", color: "#69e7c2", description: "Low-latency broadband communications satellite.",
  },
  {
    id: "39634", name: "Sentinel-1A", shortName: "SENTINEL-1A", type: "Climate", country: "European Union",
    latitude: 55.7, longitude: -22.4, altitude: 693, velocity: 27050, inclination: 98.2, period: 98.7, nextPass: 27,
    status: "Active", color: "#b890ff", description: "All-weather radar imaging for sea ice, floods, land movement and ocean monitoring.",
  },
  {
    id: "40697", name: "Sentinel-2A", shortName: "SENTINEL-2A", type: "Climate", country: "European Union",
    latitude: -32.4, longitude: 8.9, altitude: 786, velocity: 26900, inclination: 98.6, period: 100.6, nextPass: 14,
    status: "Active", color: "#72e7a8", description: "High-resolution multispectral imaging for land and coastal monitoring.",
  },
  {
    id: "42063", name: "Sentinel-2B", shortName: "SENTINEL-2B", type: "Climate", country: "European Union",
    latitude: 11.5, longitude: 94.3, altitude: 786, velocity: 26900, inclination: 98.6, period: 100.6, nextPass: 49,
    status: "Active", color: "#59d997", description: "Companion Earth-imaging mission providing five-day global revisit coverage.",
  },
  {
    id: "39084", name: "Landsat 8", shortName: "LANDSAT 8", type: "Climate", country: "United States",
    latitude: 38.2, longitude: -89.7, altitude: 705, velocity: 27000, inclination: 98.2, period: 99.0, nextPass: 6,
    status: "Active", color: "#c0ec6d", description: "Records global land change, agriculture, forests and water resources.",
  },
  {
    id: "27424", name: "Aqua", shortName: "AQUA", type: "Climate", country: "United States",
    latitude: -51.1, longitude: -148.5, altitude: 705, velocity: 27000, inclination: 98.2, period: 98.8, nextPass: 38,
    status: "Active", color: "#62cfff", description: "Studies Earth's water cycle, clouds, precipitation, ice and oceans.",
  },
  {
    id: "25994", name: "Terra", shortName: "TERRA", type: "Climate", country: "United States",
    latitude: 67.3, longitude: 42.1, altitude: 705, velocity: 27000, inclination: 98.5, period: 98.9, nextPass: 19,
    status: "Active", color: "#f0be65", description: "Flagship Earth observing mission studying the planet as an integrated system.",
  },
  {
    id: "43613", name: "ICESat-2", shortName: "ICESAT-2", type: "Climate", country: "United States",
    latitude: -72.2, longitude: 125.6, altitude: 496, velocity: 27300, inclination: 92.0, period: 94.3, nextPass: 52,
    status: "Active", color: "#90efff", description: "Measures ice-sheet elevation, sea ice thickness and forest canopy height.",
  },
  {
    id: "33591", name: "NOAA-19", shortName: "NOAA-19", type: "Climate", country: "United States",
    latitude: 22.8, longitude: 73.5, altitude: 850, velocity: 26700, inclination: 99.2, period: 102.0, nextPass: 33,
    status: "Active", color: "#4fbbe8", description: "Provides global weather imagery and atmospheric temperature profiles.",
  },
  {
    id: "37849", name: "Suomi NPP", shortName: "SUOMI NPP", type: "Climate", country: "United States",
    latitude: -14.6, longitude: -18.2, altitude: 824, velocity: 26750, inclination: 98.7, period: 101.4, nextPass: 45,
    status: "Active", color: "#7cc8ff", description: "Bridges long-term climate monitoring and operational weather forecasting.",
  },
  {
    id: "41765", name: "Tiangong Space Station", shortName: "TIANGONG", type: "Station", country: "China",
    latitude: 29.9, longitude: 110.8, altitude: 390, velocity: 27600, inclination: 41.5, period: 92.2, nextPass: 22,
    status: "Active", color: "#ffba68", description: "Crewed modular space station supporting long-duration research missions.",
  },
  {
    id: "28485", name: "Neil Gehrels Swift Observatory", shortName: "SWIFT", type: "Science", country: "United States",
    latitude: 8.4, longitude: -132.2, altitude: 585, velocity: 27180, inclination: 20.6, period: 96.0, nextPass: 73,
    status: "Active", color: "#ff82be", description: "Detects and rapidly observes gamma-ray bursts across the universe.",
  },
  {
    id: "40069", name: "OCO-2", shortName: "OCO-2", type: "Climate", country: "United States",
    latitude: 47.8, longitude: 159.2, altitude: 705, velocity: 27000, inclination: 98.2, period: 98.8, nextPass: 16,
    status: "Active", color: "#80df87", description: "Measures atmospheric carbon dioxide with regional-scale precision.",
  },
  {
    id: "46984", name: "Starlink 1895", shortName: "STARLINK-1895", type: "Communications", country: "United States",
    latitude: -41.3, longitude: 32.4, altitude: 550, velocity: 27160, inclination: 53.0, period: 95.6, nextPass: 11,
    status: "Active", color: "#52dcb7", description: "Low Earth orbit broadband communications relay.",
  },
  {
    id: "44713", name: "Starlink 1007", shortName: "STARLINK-1007", type: "Communications", country: "United States",
    latitude: 4.7, longitude: -68.9, altitude: 550, velocity: 27160, inclination: 53.0, period: 95.6, nextPass: 35,
    status: "Active", color: "#58cfae", description: "Part of the Starlink low-latency broadband constellation.",
  },
];
