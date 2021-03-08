/* eslint no-undef: 0 */ // --> OFF
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import "./Leaflet.css"


class Leaflet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      robots: [],
      isLoading: false,
      isError: false,
      currentLocation: [55.9419738104196, -3.19145729727135],
      zoom: 16
    }
  }
  async fetchRobots() {
    this.setState({ isLoading: true })
    const url = "http://localhost:2000/robot_details";
    const response = await fetch(url);
    if (response.ok) {
      const robots = await response.json();
      this.setState({ robots: robots, isLoading: false })
      console.log(robots)
    }
    else {
      this.setState({ error: true, isLoading: false })
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => this.fetchRobots(), 5000);
    this.fetchRobots()
  }



  renderMarkers = () => {
    return this.state.robots.map(robot => {
      return (
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
                  <td>Gritting</td>
                  <td>{robot.status}</td>
                </tr>
                <tr>
                  <td>Battery</td>
                  <td>{robot.battery}</td>
                </tr>
                <tr>
                  <td>Grit</td>
                  <td>{robot.grit}</td>
                </tr>
                <tr>
                  <td>Longitude</td>
                  <td>{robot.longitude}</td>
                </tr>
                <tr>
                  <td>Latitude</td>
                  <td>{robot.latitude}</td>
                </tr>
              </thead>
            </Table>
          </Popup>
        </Marker>
      )
    })
  }

  adjustMap(lng, lat) {
    this.setState({ currentLocation: [lng, lat] })
  }

  render() {
    const { currentLocation, zoom } = this.state;
    return (
      <div>
        <MapContainer className="map" center={currentLocation} zoom={zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.renderMarkers()}
        </MapContainer>
      </div>
    )
  }
}

export default Leaflet