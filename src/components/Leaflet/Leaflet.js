import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./Leaflet.css";

function Leaflet(props) {
  const [zoom, setZoom] = useState(16);
  const [currLocation, setCurrLocation] = useState([
    55.9419738104196,
    -3.19145729727135,
  ]);

  const adjustMap = (lng, lat) => {
    setCurrLocation([lng, lat]);
  };

  const robotMarkers = props.robots.map((robot) => {
    <Marker position={[robot.longitude, robot.latitude]}>
      <Popup>
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <td>ID</td>
              <td>{robot._id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{robot.name}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{robot.state.state}</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>{robot.state.state}</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td>{robot.state.gps.lat}</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>{robot.state.gps.lng}</td>
            </tr>
          </thead>
        </Table>
      </Popup>
    </Marker>;
  });

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
      </MapContainer>
    </div>
  );
}

export default Leaflet;
