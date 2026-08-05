import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Entity, LabelGraphics, PointGraphics, PolylineGraphics, Viewer, type CesiumComponentRef } from "resium";
import {
  Cartesian2, Cartesian3, Color, DistanceDisplayCondition, HeightReference, ImageryLayer,
  LabelStyle, NearFarScalar, UrlTemplateImageryProvider, VerticalOrigin, Viewer as CesiumViewer,
} from "cesium";
import { Earth, Minus, Plus, RotateCcw } from "lucide-react";
import type { Satellite } from "../types/satellite";
import "cesium/Build/Cesium/Widgets/widgets.css";

interface GlobeProps { satellites: Satellite[]; selectedId: string; onSelect: (id: string) => void; }

function orbitPositions(satellite: Satellite) {
  const amplitude = Math.max(1, Math.min(satellite.inclination, 78));
  const normalizedLatitude = Math.max(-1, Math.min(1, satellite.latitude / amplitude));
  const phaseAtSatellite = Math.asin(normalizedLatitude);
  return Array.from({ length: 97 }, (_, step) => {
    const offset = step - 48;
    const longitude = satellite.longitude + offset * 3.75;
    const latitude = Math.sin(phaseAtSatellite + (offset / 96) * Math.PI * 2) * amplitude;
    return Cartesian3.fromDegrees(longitude, latitude, satellite.altitude * 1000);
  });
}

export default function Globe({ satellites, selectedId, onSelect }: GlobeProps) {
  const [cameraHeight, setCameraHeight] = useState(24_000_000);
  const [worldView, setWorldView] = useState(true);
  const [viewer, setViewer] = useState<CesiumViewer>();
  const previousSelectedId = useRef(selectedId);
  const viewerRef = useCallback((ref: CesiumComponentRef<CesiumViewer> | null) => {
    setViewer(ref?.cesiumElement);
  }, []);
  const imagery = useMemo(() => new ImageryLayer(new UrlTemplateImageryProvider({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    credit: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
    maximumLevel: 19,
  }), {
    brightness: .9, contrast: 1.08, saturation: 1.08, gamma: .92,
  }), []);
  const selected = satellites.find((satellite) => satellite.id === selectedId);
  const selectedLatitude = selected?.latitude;
  const selectedLongitude = selected?.longitude;
  useEffect(() => {
    if (previousSelectedId.current !== selectedId) {
      previousSelectedId.current = selectedId;
      setCameraHeight(16_500_000);
      setWorldView(false);
    }
  }, [selectedId]);
  const destination = useMemo(() => !worldView && selectedLatitude !== undefined && selectedLongitude !== undefined
    ? Cartesian3.fromDegrees(selectedLongitude, selectedLatitude, cameraHeight)
    : Cartesian3.fromDegrees(0, 12, cameraHeight), [selectedLatitude, selectedLongitude, cameraHeight, worldView]);
  const showWholeWorld = () => { setCameraHeight(24_000_000); setWorldView(true); };
  useEffect(() => {
    if (!viewer) return;
    const controls = viewer.scene.screenSpaceCameraController;
    controls.enableRotate = true;
    controls.enableTranslate = true;
    controls.enableZoom = true;
    controls.enableTilt = true;
    controls.enableLook = true;
    controls.minimumZoomDistance = 1_000_000;
    controls.maximumZoomDistance = 50_000_000;
    viewer.camera.flyTo({ destination, duration: 1.1 });
  }, [viewer, destination]);

  return (
    <section className="globe-stage" aria-label="Interactive Cesium satellite globe">
      <Viewer ref={viewerRef} full baseLayer={imagery} animation={false} timeline={false} baseLayerPicker={false} geocoder={false}
        homeButton={false} navigationHelpButton={false} sceneModePicker={false} fullscreenButton={false}
        infoBox={false} selectionIndicator={false} requestRenderMode={false} resolutionScale={1.15}>
        {satellites.map((satellite) => {
          const color = Color.fromCssColorString(satellite.color);
          return <Entity key={satellite.id} name={satellite.name}
            position={Cartesian3.fromDegrees(satellite.longitude, satellite.latitude, satellite.altitude * 1000)}
            onClick={() => onSelect(satellite.id)}>
            <PointGraphics pixelSize={satellite.id === selectedId ? 13 : 9} color={color}
              outlineColor={Color.WHITE} outlineWidth={satellite.id === selectedId ? 2 : 1}
              heightReference={HeightReference.NONE} scaleByDistance={new NearFarScalar(1e6, 1.4, 3e7, .55)} />
            <LabelGraphics text={satellite.shortName} font="500 11px DM Mono" fillColor={Color.WHITE}
              outlineColor={Color.BLACK} outlineWidth={3} style={LabelStyle.FILL_AND_OUTLINE}
              pixelOffset={new Cartesian2(14, -4)} verticalOrigin={VerticalOrigin.CENTER}
              distanceDisplayCondition={new DistanceDisplayCondition(0, 25_000_000)} />
            <PolylineGraphics positions={orbitPositions(satellite)} width={satellite.id === selectedId ? 1.6 : .55}
              material={color.withAlpha(satellite.id === selectedId ? .68 : .14)} />
          </Entity>;
        })}
      </Viewer>
      <div className="map-controls">
        <button onClick={() => { setWorldView(false); setCameraHeight((v) => Math.max(3_000_000, v - 2_500_000)); }} aria-label="Zoom in"><Plus size={17} /></button>
        <button onClick={() => setCameraHeight((v) => Math.min(28_000_000, v + 2_500_000))} aria-label="Zoom out"><Minus size={17} /></button>
        <button onClick={() => { setWorldView(false); setCameraHeight(16_500_000); }} aria-label="Reset satellite view"><RotateCcw size={15} /></button>
      </div>
      <button className="world-view-button" onClick={showWholeWorld}><Earth size={14} /> World view</button>
      <div className="live-indicator"><span /> CESIUM 3D · LIVE ORBITAL DATA</div>
      <div className="globe-hint">DRAG TO ROTATE · SCROLL TO ZOOM</div>
    </section>
  );
}
