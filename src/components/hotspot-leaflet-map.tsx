'use client';

import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/leaflet-icon';
import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import {
  Dog,
  Cat,
  HelpCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Hash,
} from 'lucide-react';

// --- Types ---
type Location = {
  id: string;
  latitude: number;
  longitude: number;
  reportId: string | null;
};

type Issue = {
  id: string;
  issue: string;
  reportId: string;
};

export type ReportWithLocation = {
  id: string;
  animalType: string;
  animalCount: number;
  environment: string;
  urgency: string;
  description: string;
  timeStamp: string | Date;
  imageUrl: string | null;
  location: Location | null;
  visibleIssues: Issue[];
};

type HotspotLeafletMapProps = {
  reports: ReportWithLocation[];
};

// --- Urgency helpers ---
const urgencyConfig: Record<string, { color: string; bg: string; ring: string }> = {
  Low: { color: 'text-emerald-700', bg: 'bg-emerald-50', ring: 'ring-emerald-200' },
  Medium: { color: 'text-amber-700', bg: 'bg-amber-50', ring: 'ring-amber-200' },
  High: { color: 'text-orange-700', bg: 'bg-orange-50', ring: 'ring-orange-200' },
  Urgent: { color: 'text-red-700', bg: 'bg-red-50', ring: 'ring-red-200' },
};

const urgencyMarkerColor: Record<string, string> = {
  Low: '#10b981',
  Medium: '#f59e0b',
  High: '#f97316',
  Urgent: '#ef4444',
};

const animalIcons: Record<string, React.ElementType> = {
  Dog: Dog,
  Cat: Cat,
};

// --- Custom colored marker ---
function createColoredIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="42">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      <circle cx="12" cy="11" r="5" fill="#fff" opacity="0.9"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 42],
    iconAnchor: [14, 42],
    popupAnchor: [0, -42],
  });
}

// --- Heatmap layer using CircleMarkers ---
function HeatmapLayer({ reports }: { reports: ReportWithLocation[] }) {
  // Group nearby locations into clusters for heatmap intensity
  const heatPoints = useMemo(() => {
    const points: { lat: number; lng: number; intensity: number }[] = [];
    const located = reports.filter((r) => r.location);

    // Simple grid-based clustering
    const gridSize = 0.005; // ~500m cells
    const grid: Record<string, { lat: number; lng: number; count: number }> = {};

    located.forEach((r) => {
      const lat = r.location!.latitude;
      const lng = r.location!.longitude;
      const key = `${Math.round(lat / gridSize)}_${Math.round(lng / gridSize)}`;

      if (!grid[key]) {
        grid[key] = { lat: 0, lng: 0, count: 0 };
      }
      grid[key].lat += lat;
      grid[key].lng += lng;
      grid[key].count += 1;
    });

    Object.values(grid).forEach((cell) => {
      points.push({
        lat: cell.lat / cell.count,
        lng: cell.lng / cell.count,
        intensity: cell.count,
      });
    });

    return points;
  }, [reports]);

  const maxIntensity = Math.max(...heatPoints.map((p) => p.intensity), 1);

  return (
    <>
      {heatPoints.map((point, idx) => {
        const normalized = point.intensity / maxIntensity;
        const radius = 20 + normalized * 60;
        const opacity = 0.12 + normalized * 0.25;

        // Gradient from yellow → orange → red based on intensity
        const r = Math.round(255);
        const g = Math.round(200 - normalized * 150);
        const b = Math.round(50 - normalized * 50);
        const color = `rgb(${r}, ${g}, ${b})`;

        return (
          <CircleMarker
            key={`heat-${idx}`}
            center={[point.lat, point.lng]}
            radius={radius}
            pathOptions={{
              color: 'transparent',
              fillColor: color,
              fillOpacity: opacity,
            }}
          />
        );
      })}
    </>
  );
}

// --- Auto-fit map bounds ---
function FitBounds({ reports }: { reports: ReportWithLocation[] }) {
  const map = useMap();

  useEffect(() => {
    const located = reports.filter((r) => r.location);
    if (located.length === 0) return;

    const bounds = L.latLngBounds(
      located.map((r) => [r.location!.latitude, r.location!.longitude] as [number, number])
    );
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
  }, [reports, map]);

  return null;
}

// --- Format date ---
function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// --- Main map component ---
const HotspotLeafletMap = ({ reports }: HotspotLeafletMapProps) => {
  const locatedReports = reports.filter((r) => r.location);

  // Default center: first report or fallback
  const defaultCenter: [number, number] = locatedReports.length > 0
    ? [locatedReports[0].location!.latitude, locatedReports[0].location!.longitude]
    : [6.9271, 79.8612]; // Colombo fallback

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ background: '#f1f5f9' }}
    >
      <TileLayer
        attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Heatmap overlay */}
      <HeatmapLayer reports={reports} />

      {/* Fit bounds */}
      <FitBounds reports={locatedReports} />

      {/* Individual markers */}
      {locatedReports.map((report) => {
        const AnimalIcon = animalIcons[report.animalType] || HelpCircle;
        const urgency = urgencyConfig[report.urgency] || urgencyConfig.Medium;
        const markerColor = urgencyMarkerColor[report.urgency] || '#f59e0b';

        return (
          <Marker
            key={report.id}
            position={[report.location!.latitude, report.location!.longitude]}
            icon={createColoredIcon(markerColor)}
          >
            <Popup maxWidth={280} minWidth={240}>
              <div className="font-sans -m-1">
                {/* Popup header */}
                <div className="flex items-center gap-2 mb-2.5 pb-2.5 border-b border-slate-100">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <AnimalIcon className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {report.animalType} · {report.environment}
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(report.timeStamp)}
                    </p>
                  </div>
                </div>

                {/* Urgency + Count */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${urgency.bg} ${urgency.color} ${urgency.ring}`}
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {report.urgency}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
                    <Hash className="h-3 w-3" />
                    {report.animalCount} {report.animalCount === 1 ? 'animal' : 'animals'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-2">
                  {report.description}
                </p>

                {/* Issues */}
                {report.visibleIssues.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {report.visibleIssues.map((issue) => (
                      <span
                        key={issue.id}
                        className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500"
                      >
                        {issue.issue}
                      </span>
                    ))}
                  </div>
                )}

                {/* Coordinates */}
                <div className="mt-2.5 pt-2 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {report.location!.latitude.toFixed(4)}, {report.location!.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default HotspotLeafletMap;
