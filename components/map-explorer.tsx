'use client';

import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import type { RestaurantSummary } from '@/lib/types';
import { useEffect } from 'react';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://placehold.co/40x40/0f172a/ffffff?text=🍴',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

function FitBounds({ restaurants }: { restaurants: RestaurantSummary[] }) {
  const map = useMap();

  useEffect(() => {
    if (restaurants.length === 0) return;
    const bounds = L.latLngBounds(restaurants.map((r) => [r.lat, r.lng]));
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, restaurants]);

  return null;
}

export function MapExplorer({ restaurants }: { restaurants: RestaurantSummary[] }) {
  return (
    <MapContainer className="h-full w-full" zoom={13} center={[48.8566, 2.3522]} scrollWheelZoom>
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {restaurants.map((restaurant) => (
          <Marker key={restaurant.id} position={[restaurant.lat, restaurant.lng]} icon={markerIcon}>
            <Popup>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">{restaurant.name}</p>
                <p className="text-xs text-slate-500">{restaurant.city}</p>
                <p className="text-xs text-slate-500">Note {restaurant.averageRating.toFixed(1)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <FitBounds restaurants={restaurants} />
    </MapContainer>
  );
}
