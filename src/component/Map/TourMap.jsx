"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "./TourMap.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const TourMap = ({ locations }) => {
  const router = useRouter();

  return (
    <section className="map-section">
      <h2>Explore Pakistan Tours</h2>

      <div className="map-card">
        <MapContainer center={[31.5204, 74.3587]} zoom={6}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {locations.map((loc, index) => (
            <Marker
              key={loc._id || loc.id || index}
              position={[loc.lat, loc.lng]}
              eventHandlers={{
                click: () => {
                  const tourId = loc._id || loc.id;
                  if (tourId) {
                    router.push(`/tour/${tourId}`);
                  } else {
                    console.error("❌ Tour ID missing:", loc);
                  }
                },
              }}
            >
              <Popup>
                <b>{loc.name}</b>
                <br />
                Click for details
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default TourMap;
