import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

function Navigationbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
        StreetSmart by
        {' '}
        <img
            alt=""
            src="/inverted_logo.png"
            width="125"
            height="30"
            className="d-inline-block align-top"
        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#">Monitoring Panel</Nav.Link>
            <Nav.Link href="#">Robot Registration</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigationbar;