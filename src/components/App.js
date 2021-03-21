import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Leaflet from './Leaflet/Leaflet';
import RobotInfoTable from './RobotInfoTable/RobotInfoTable';
import MonitorButtons from './MonitorButtons/MonitorButtons';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
class App extends Component{
  render(){
    return(
      <div>
        <Container fluid className="bg">
          <Row>
            <Col sm={9}>
              <Leaflet />
            </Col>
            <Col sm={3}>
              <Row>
                <h2>Current Robots</h2>
              </Row>
              <Row>
                <RobotInfoTable />
              </Row>
              <Row>
                <MonitorButtons />
              </Row>
              <Row>
                <h2>Camera Feed Here</h2>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;