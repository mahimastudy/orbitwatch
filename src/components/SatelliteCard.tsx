import { Activity, ArrowUpRight, Gauge, Orbit, Radio, Timer, X } from "lucide-react";
import type { Satellite } from "../types/satellite";
import type { LivePassPrediction } from "../api/satelliteAPI";

interface Props { satellite: Satellite; livePass: LivePassPrediction | null; onClose: () => void; }

export default function SatelliteCard({ satellite, livePass, onClose }: Props) {
  return (
    <aside className="detail-panel">
      <div className="panel-accent" style={{ background: satellite.color }} />
      <div className="detail-head">
        <div className="satellite-mark" style={{ color: satellite.color }}><Radio size={22} /></div>
        <div><span className="eyebrow">NORAD {satellite.id}</span><h2>{satellite.shortName}</h2></div>
        <button className="icon-button" onClick={onClose} aria-label="Close details"><X size={18} /></button>
      </div>
      <div className="status-row"><span className="active-pill"><i /> {satellite.status}</span><span>{satellite.type} · LEO</span></div>
      <p className="description">{satellite.description}</p>
      <div className="metric-grid">
        <div><span><ArrowUpRight size={14} /> Altitude</span><strong>{satellite.altitude}</strong><small> km</small></div>
        <div><span><Gauge size={14} /> Velocity</span><strong>{satellite.velocity.toLocaleString()}</strong><small> km/h</small></div>
        <div><span><Orbit size={14} /> Inclination</span><strong>{satellite.inclination}°</strong></div>
        <div><span><Timer size={14} /> Orbit period</span><strong>{satellite.period}</strong><small> min</small></div>
      </div>
      {livePass && <div className="pass-card">
        <div><span className="eyebrow"><Activity size={13} /> Next visible pass</span><strong>{livePass.minutesUntil === 0 ? "In progress" : `${livePass.minutesUntil} minutes`}</strong><small>{livePass.durationMinutes} min duration · {livePass.maximumElevation}° max elevation</small></div>
        <div className="signal"><i /><i /><i /><i /></div>
      </div>}
      <div className="position-row"><span>Current position</span><b>{Math.abs(satellite.latitude).toFixed(2)}° {satellite.latitude > 0 ? "N" : "S"}</b><b>{Math.abs(satellite.longitude).toFixed(2)}° {satellite.longitude > 0 ? "E" : "W"}</b></div>
    </aside>
  );
}
