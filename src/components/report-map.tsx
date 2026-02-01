'use client';

import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/leaflet-icon';

type ReportMapProps = {
  lat: number;
  lng: number;
  zoom?: number;
  imageUrl?: string;
};

const ReportMap = ({ lat, lng, zoom = 13 }: ReportMapProps) => {
  return (
    <div className="h-100 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup>
            Report location <br />
            Lat: {lat}, Lng: {lng}
          </Popup>
        </Marker>
      </MapContainer>
      <p>Testing</p>
    </div>
  );
};

export default ReportMap;
