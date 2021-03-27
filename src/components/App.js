import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Leaflet from "./Leaflet/Leaflet.js";
import RobotInfoTable from "./RobotInfoTable/RobotInfoTable.js";
import MonitorButtons from "./MonitorButtons/MonitorButtons.js";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const url = "http://localhost:2000/robots";
  const refresh = 10000;
  const [robots, setRobots] = useState([]);

  const fetchData = async function () {
    const response = await fetch(url);
    if (response.ok) {
      const new_robots = await response.json();
      setRobots([...new_robots]);
    }
  };

  // Get initial data
  fetchData();

  // Set timer for fetching data
  useEffect(() => {
    let interval = setInterval(async () => {
      fetchData();
    }, refresh);

    return () => clearInterval(interval);
  }, [robots]);

  return (
    <div>
      <Container fluid className="bg">
        <Row>
          <Col sm={9}>
            <Leaflet robots={robots} />
          </Col>
          <Col sm={3}>
            <Row>
              <h2>Current Robots</h2>
            </Row>
            <Row>
              <RobotInfoTable robots={robots} />
            </Row>
            <Row>
              <MonitorButtons robots={robots} />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
