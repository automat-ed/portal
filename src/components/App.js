import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Leaflet from "./Leaflet/Leaflet.js";
import SideBar from "./SideBar/SideBar.js";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const url = "http://localhost:2000/robots";
  const refresh = 10000;
  const [robots, setRobots] = useState([]);
  const [currRobot, setCurrRobot] = useState(null);

  const fetchData = async function () {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const new_robots = await response.json();
        setRobots([...new_robots]);
      }
    } catch {}
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 5000);
    return () => clearInterval(id);
  }, []);

  const onRobotSelect = (id) => (event) => {
    setCurrRobot(id);
  };

  const onRobotSelectMarker = (id) => {
    setCurrRobot(id);
  };

  return (
    <div>
      <Container fluid className="bg">
        <Row>
          <Col sm={9}>
            <Leaflet
              robots={robots}
              currRobot={currRobot}
              onRobotSelect={onRobotSelectMarker}
            />
          </Col>
          <Col sm={3}>
            <SideBar
              robots={robots}
              currRobot={currRobot}
              onRobotSelect={onRobotSelect}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
