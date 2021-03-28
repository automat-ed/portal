/* eslint no-undef: 0 */ // --> OFF

import React from "react";
import { Table } from "react-bootstrap";
import "./RobotInfoTable.css";

function RobotInfoTable(props) {
  let robotTableRows = null;
  if (props.robots.length === 0) {
    robotTableRows = (
      <tr style={{ cursor: "pointer" }}>
        <td colSpan={4}>No robots found.</td>
      </tr>
    );
  } else {
    robotTableRows = props.robots.map((robot) => (
      <tr
        className="clickable-row"
        key={robot._id}
        onClick={props.onRobotSelect(robot._id)}
        style={{ cursor: "pointer" }}
      >
        <td>{robot.name}</td>
        <td>{robot.state.state}</td>
        <td>{robot.state.battery}</td>
        <td></td>
      </tr>
    ));
  }

  return (
    <div className="tableWrapper">
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Battery</th>
            <th>Grit Level</th>
          </tr>
        </thead>
        <tbody>{robotTableRows}</tbody>
      </Table>
    </div>
  );
}

export default RobotInfoTable;
