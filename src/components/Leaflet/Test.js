import { useMap } from "react-leaflet";
import React, { useState } from "react";

function Test(props) {
  const [currRobot, setCurrRobot] = useState(null);

  const map = useMap();
  if (props.currRobot !== currRobot) {
    setCurrRobot(props.currRobot);
    if (props.currRobot !== null) {
      if (
        props.currRobot.state.gps.lat !== null &&
        props.currRobot.state.gps.lng !== null
      ) {
        const center = [
          props.currRobot.state.gps.lat,
          props.currRobot.state.gps.lng,
        ];
        map.setView(center);
      }
    }
  }
  return null;
}

export default Test;
