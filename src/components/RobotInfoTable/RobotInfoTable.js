/* eslint no-undef: 0 */ // --> OFF

import React from "react";
import { Table } from "react-bootstrap";
import "./RobotInfoTable.css";

function RobotInfoTable(props) {
  if (props.robots === 0) {
    return <div>No robots online.</div>;
  }

  const robotTableRows = props.robots.map((robot) => (
    <tr className="clickable-row" key={robot._id}>
      <td>{robot._id}</td>
      <td>{robot.name}</td>
      <td>{robot.state.state}</td>
      <td>{robot.state.battery}</td>
      <td>{robot.state.gps.lat}</td>
      <td>{robot.state.gps.lng}</td>
    </tr>
  ));

  return (
    <div className="tableWrapper">
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>State</th>
            <th>Battery</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>{robotTableRows}</tbody>
      </Table>
    </div>
  );
}

export default RobotInfoTable;
