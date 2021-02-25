import React from 'react'
import Button from 'react-bootstrap/Button'
import './MonitorButtons.css'
function MonitorButtons() {
    return(
        <div className="buttonArr">
        <Button variant="success">Start Robot</Button>
        <Button variant="primary">Assume Control</Button>
        <Button variant="danger">Emergency Stop</Button>
        </div>
    )
}

export default MonitorButtons
