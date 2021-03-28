import React from "react";
import RobotInfoTable from "../RobotInfoTable/RobotInfoTable.js";
import { Row, Table, Button } from "react-bootstrap";
import "./SideBar.css";
import socket from "../../socket/socket.js";

function SideBar(props) {
  const activeRobots = props.robots.filter((robot) => {
    return robot.state.state !== "Off";
  });

  const inactiveRobots = props.robots.filter((robot) => {
    return robot.state.state === "Off";
  });

  let currRobot = null;
  if (props.currRobot) {
    currRobot = props.robots.filter((robot) => {
      return robot._id === props.currRobot;
    })[0];
  }

  const handleClickStart = () => {
    if (props.currRobot) {
      socket.emit("start", { key: props.currRobot });
    }
  };

  const handleClickEmergency = () => {
    if (props.currRobot) {
      socket.emit("emergency", { key: props.currRobot });
    }
  };

  const robotDetails = (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <td>{currRobot ? currRobot._id : ""}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{currRobot ? currRobot.name : ""}</td>
        </tr>
        <tr>
          <th>State</th>
          <td>{currRobot ? currRobot.state.state : ""}</td>
        </tr>
        <tr>
          <th>Battery</th>
          <td>{currRobot ? currRobot.state.battery : ""}</td>
        </tr>
        <tr>
          <th>Grit Level</th>
          <td></td>
        </tr>
        <tr>
          <th>Latitude</th>
          <td>{currRobot ? currRobot.state.gps.lat : ""}</td>
        </tr>
        <tr>
          <th>Longitude</th>
          <td>{currRobot ? currRobot.state.gps.lng : ""}</td>
        </tr>
      </thead>
    </Table>
  );

  return (
    <div>
      <Row>
        <h2>Active Robots</h2>
      </Row>
      <Row>
        <RobotInfoTable
          robots={activeRobots}
          onRobotSelect={props.onRobotSelect}
        />
      </Row>
      <Row>
        <h2>Inactive Robots</h2>
      </Row>
      <Row>
        <RobotInfoTable
          robots={inactiveRobots}
          onRobotSelect={props.onRobotSelect}
        />
      </Row>
      <Row>
        <h2>Robot Details</h2>
      </Row>
      <Row>
        <div className="buttonArr">
          <Button variant="success" onClick={handleClickStart}>
            Start Robot
          </Button>
          <Button variant="danger" onClick={handleClickEmergency}>
            Emergency Stop
          </Button>
        </div>
      </Row>
      <Row>{robotDetails}</Row>
    </div>
  );
}

export default SideBar;
