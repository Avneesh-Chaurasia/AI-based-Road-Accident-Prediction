import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const riskColors = {
  High: "red",
  Medium: "orange",
  Low: "yellow",
};

const RiskMap = ({ route, highZones, destination }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (route.length === 2 && mapRef.current) {
      const map = mapRef.current;
      // Remove previous routing controls
      map.eachLayer((layer) => {
        if (layer._controlName === "routing") {
          map.removeControl(layer);
        }
      });

      const routingControl = L.Routing.control({
        waypoints: route.map((coord) => L.latLng(coord[0], coord[1])),
        lineOptions: { styles: [{ color: "blue", weight: 4 }] },
        router: L.Routing.osrmv1(),
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: (i, wp) => L.marker(wp.latLng),
      }).addTo(map);

      return () => map.removeControl(routingControl);
    }
  }, [route]);

  return (
    <div className="h-[80vh] w-full max-w-5xl relative mb-8">
      <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">
        Accident Risk Map for Route to {destination}
      </h2>
      <p className="text-center text-gray-600 mb-3">
        Visualizing high-risk accident zones along your route
      </p>

      <MapContainer
        center={route.length ? route[0] : [19.0760, 72.8777]}
        zoom={7}
        className="h-full w-full rounded-lg shadow-md"
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        {route.length > 0 && <Polyline positions={route} color="blue" weight={4} opacity={0.7} />}
        {highZones.map((zone, idx) => (
          <CircleMarker
            key={idx}
            center={[zone.lat, zone.lng]}
            radius={10}
            fillColor={riskColors[zone.risk]}
            color={riskColors[zone.risk]}
            fillOpacity={0.6}
          >
            <Popup>
              <strong>Risk Level:</strong> {zone.risk}
              <br />
              Lat: {zone.lat.toFixed(3)}, Lng: {zone.lng.toFixed(3)}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RiskMap;
