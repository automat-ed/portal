import React from "react";
import Button from "react-bootstrap/Button";
import "./MonitorButtons.css";

function MonitorButtons(props) {
  return (
    <div className="buttonArr">
      <Button variant="success">Start Robot</Button>
      <Button variant="danger">Emergency Stop</Button>
    </div>
  );
}

export default MonitorButtons;
