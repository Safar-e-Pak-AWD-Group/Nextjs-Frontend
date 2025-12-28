import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
"use client";
import { useRouter } from "next/navigation";
import L from "leaflet";
// import "./TourMap.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* Fix leaflet marker icons */
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
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((loc) => (
            <Marker
              key={loc._id}
              position={[loc.lat, loc.lng]}
              eventHandlers={{
                click: () => {
                  // ✅ DIRECT BOOK NOW PAGE
                  router.push(
                    `/booknow?tourId=${loc._id}&tourName=${encodeURIComponent(
                      loc.name
                    )}`
                  );
                },
              }}
            >
              <Popup>
                <b>{loc.name}</b>
                <br />
                Click to book now
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default TourMap;
