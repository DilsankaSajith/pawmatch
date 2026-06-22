'use client';

import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/leaflet-icon';
import { MapPin } from 'lucide-react';

type PetLocationMapProps = {
  lat: number;
  lng: number;
  name: string;
  address: string;
  zoom?: number;
};

const PetLocationMap = ({
  lat,
  lng,
  name,
  address,
  zoom = 15,
}: PetLocationMapProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-brand-100">
          <MapPin className="h-5 w-5 text-brand-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            {name}&apos;s Location
          </h3>
          <p className="text-xs text-slate-400">{address}</p>
        </div>
      </div>

      {/* Map */}
      <div className="h-[320px] w-full">
        <MapContainer
          center={[lat, lng]}
          zoom={zoom}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">{name}</p>
                <p className="text-xs text-slate-500">{address}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default PetLocationMap;
