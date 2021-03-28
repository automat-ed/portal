import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect, useState } from "react";
import "./Leaflet.css";
import MapControl from "./MapControl.js";

function Leaflet(props) {
  const [zoom, setZoom] = useState(16);
  const [currLocation, setCurrLocation] = useState([50.0, 50.0]);

  let robotMarkers = null;
  if (props.robots.length > 0) {
    robotMarkers = props.robots.map((robot) => {
      if (robot.state.gps.lat !== null && robot.state.gps.lng !== null) {
        return (
          <Marker
            position={[robot.state.gps.lat, robot.state.gps.lng]}
            eventHandlers={{
              click: () => {
                props.onRobotSelect(robot._id);
              },
            }}
          />
        );
      }
    });
  }

  return (
    <div>
      <MapContainer
        className="map"
        center={currLocation}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {robotMarkers}
        <MapControl robots={props.robots} currRobot={props.currRobot} />
      </MapContainer>
    </div>
  );
}

export default Leaflet;
