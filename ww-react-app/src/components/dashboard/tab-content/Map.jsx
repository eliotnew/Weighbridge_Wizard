import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [50.374791, -4.140002]; // Coordinates for Smeatons Building!
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "57.5vh", // Adjust based on your layout
        width: "70vw", // Adjust if necessary
        padding: "10px",
      }}
    >
      <MapContainer
        center={position}
        zoom={15}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            University of Plymouth <br /> Smeaton Building.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
