import { MapContainer, TileLayer, Marker } from "react-leaflet";
import React from "react";
import "./Leaflet.css";
import MapControl from "./MapControl.js";

function Leaflet(props) {
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

      return null;
    });
  }

  return (
    <div>
      <MapContainer
        className="map"
        center={[50.0, 50.0]}
        zoom={16}
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
