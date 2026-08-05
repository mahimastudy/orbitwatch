import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu, Satellite, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import Globe from "./components/Globe";
import SatelliteCard from "./components/SatelliteCard";
import { satellites } from "./data/satellites";
import { fetchLivePositions, fetchNextVisiblePass, hasLiveApiKey, type LivePassPrediction } from "./api/satelliteAPI";
import type { SatelliteType } from "./types/satellite";
import "./App.css";

const filters: Array<"All" | SatelliteType> = ["All", "Climate", "Station", "Science", "Communications"];

function App() {
  const [selectedId, setSelectedId] = useState("25544");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [time, setTime] = useState(new Date());
  const [panelOpen, setPanelOpen] = useState(true);
  const [satelliteData, setSatelliteData] = useState(satellites);
  const [activeNav, setActiveNav] = useState("Live map");
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<"demo" | "live" | "error">(hasLiveApiKey ? "live" : "demo");
  const [livePass, setLivePass] = useState<LivePassPrediction | null>(null);
  useEffect(() => { const timer = window.setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []);
  useEffect(() => {
    const update = () => fetchLivePositions(satellites).then((next) => {
      setSatelliteData(next); setApiStatus(hasLiveApiKey ? "live" : "demo");
    }).catch(() => setApiStatus("error"));
    void update();
    const timer = window.setInterval(update, 300_000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    let cancelled = false;
    setLivePass(null);
    if (!hasLiveApiKey) return;
    const updatePass = () => fetchNextVisiblePass(selectedId)
      .then((prediction) => { if (!cancelled) setLivePass(prediction); })
      .catch(() => { if (!cancelled) setLivePass(null); });
    void updatePass();
    const timer = window.setInterval(updatePass, 300_000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [selectedId]);

  const visible = useMemo(() => satelliteData.filter((sat) =>
    (filter === "All" || sat.type === filter) &&
    `${sat.name} ${sat.shortName}`.toLowerCase().includes(query.toLowerCase())
  ), [filter, query, satelliteData]);
  const selected = satelliteData.find((sat) => sat.id === selectedId) ?? satelliteData[0];
  const selectSatellite = (id: string) => { setSelectedId(id); setPanelOpen(true); };
  const navigate = (view: string) => {
    setActiveNav(view); setWeatherOpen(view === "Space weather");
    if (view === "Live map") setFilter("All");
    if (view === "Satellites") { setFilter("All"); window.setTimeout(() => document.querySelector<HTMLInputElement>(".search-box input")?.focus(), 0); }
    if (view === "Missions") setFilter("Climate");
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-icon"><Satellite size={19} /></span><div><b>ORBIT<span>WATCH</span></b><small>LOW EARTH ORBIT TRACKER</small></div></div>
        <nav>{["Live map", "Satellites", "Missions", "Space weather"].map((item) => <button key={item} className={activeNav === item ? "active" : ""} onClick={() => navigate(item)}>{item}</button>)}</nav>
        <div className="header-actions"><div className="utc"><span>UTC</span><b>{time.toISOString().slice(11, 19)}</b></div><button className="mobile-menu"><Menu /></button></div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-heading"><div><span className="eyebrow">ORBITAL OBJECTS</span><h1>Live satellites</h1></div><button className="icon-button"><SlidersHorizontal size={17} /></button></div>
          <label className="search-box"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or NORAD ID" /><kbd>⌘ K</kbd></label>
          <div className="filter-row">{filters.slice(0, 4).map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <div className="list-meta"><span>{visible.length} objects in view</span><button>Altitude <ChevronDown size={13} /></button></div>
          <div className="satellite-list">
            {visible.map((sat) => (
              <button key={sat.id} className={`satellite-item ${sat.id === selectedId ? "active" : ""}`} onClick={() => selectSatellite(sat.id)}>
                <span className="item-orbit" style={{ color: sat.color }}><Satellite size={17} /></span>
                <span className="item-copy"><b>{sat.shortName}</b><small>{sat.type} · {sat.altitude} km</small></span>
                <span className="item-status"><i /> LIVE</span>
              </button>
            ))}
            {!visible.length && <div className="empty-state">No satellites found in this orbit.</div>}
          </div>
          <button className="climate-mode" onClick={() => setFilter(filter === "Climate" ? "All" : "Climate")}><span><Sparkles size={16} /></span><div><b>Climate mission mode</b><small>Explore Earth observation</small></div><ChevronDown size={15} /></button>
        </aside>

        <div className="map-area">
          <Globe satellites={visible} selectedId={selectedId} onSelect={selectSatellite} />
          <div className="map-title"><span className="eyebrow">EARTH · LOW ORBIT</span><b>Real-time orbital view</b></div>
          {panelOpen && <SatelliteCard satellite={selected} livePass={livePass} onClose={() => setPanelOpen(false)} />}
          {weatherOpen && <section className="weather-panel"><button className="icon-button" onClick={() => setWeatherOpen(false)}>×</button><span className="eyebrow">NOAA SPACE WEATHER</span><h2>Geomagnetic conditions</h2><div className="kp-value"><b>Kp 2</b><span>QUIET</span></div><p>Solar activity is currently low. No significant operational risk to tracked LEO missions.</p><div className="weather-meter"><i /></div><small>Connect NOAA SWPC feeds to enable live forecasts.</small></section>}
          <div className={`api-badge ${apiStatus}`}><i /> {apiStatus === "live" ? "N2YO CONNECTED" : apiStatus === "error" ? "API FALLBACK" : "DEMO DATA · ADD N2YO KEY"}</div>
        </div>
      </div>
    </main>
  );
}

export default App;
