/* eslint no-undef: 0 */ // --> OFF

import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import './RobotInfoTable.css'
class RobotInfoTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            robots: [],
            isLoading: false,
            isError: false
        }
    }

    async fetchRobots() {
        this.setState({ isLoading: true })
        const url = "http://localhost:2000/robots";
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

    rowSelect = value => () => {
        console.log(value);
    }

    renderTableRow = () => {
        return this.state.robots.map(robot => {
            return (
                <tr className="clickable-row" key={robot._id} onClick={this.rowSelect()}>
                    <td>{robot._id}</td>
                    <td>{robot.name}</td>
                    <td>{robot.ip_address}</td>
                    <td>{robot.connected ? "No" : "Yes"}</td>
                </tr>
            )
        })
    }



    render() {
        const { robots, isLoading, isError } = this.state
        return robots.length > 0
            ? (
                <div className="tableWrapper">
                    <Table responsive striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>IP</th>
                                <th>Online</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableRow()}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div>No Robots Registered</div>
            )
    }


}


export default RobotInfoTable
