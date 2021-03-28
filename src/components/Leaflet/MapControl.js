import { useMap } from "react-leaflet";
import React, { useState } from "react";

function MapControl(props) {
  const [currRobot, setCurrRobot] = useState(null);

  const map = useMap();
  if (props.currRobot !== currRobot) {
    setCurrRobot(props.currRobot);

    if (props.currRobot !== null) {
      let currRobot = null;
      if (props.currRobot) {
        currRobot = props.robots.filter((robot) => {
          return robot._id === props.currRobot;
        })[0];
      }

      if (
        currRobot.state.gps.lat !== null &&
        currRobot.state.gps.lng !== null
      ) {
        const center = [currRobot.state.gps.lat, currRobot.state.gps.lng];
        map.setView(center);
      }
    }
  }
  return null;
}

export default MapControl;
