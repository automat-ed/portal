import React, { useState, useEffect } from "react";
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import BellIcon from 'react-bell-icon';

function Navigationbar() {

    const url = "http://localhost:2000/data";
    const [notifications, setNotifications] = useState([]);

    const fetchData = async function () {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const new_notifs = await response.json();
            setNotifications([...new_notifs]);
          }
        } catch {}
      };

      useEffect(() => {
        fetchData();
        const id = setInterval(fetchData, 5000);
        return () => clearInterval(id);
      }, []);

      const enableNotif = (id) => {
        fetch('http://localhost:2000/updateNotif', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
        .then(res => {
            fetchData()
        })
      }

      const notifs = notifications.map((el, idx) => {
        return <React.Fragment key={idx}>
            <NavDropdown.Item>
                <p>{el.robotName} {el.problem}. Please {el.advice}</p>
                <Button style={{marginLeft: "50%"}} onClick={ev => enableNotif(el._id)} variant="success">Mark as done</Button>
            </NavDropdown.Item>
            <NavDropdown.Divider />
        </React.Fragment>
      })

      const getLen = notifs.length

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
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
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                <Nav.Link href="/index">Monitoring Panel</Nav.Link>
                <Nav.Link href="/addrob">Robot Registration</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
                <Nav className="dropdown-menu-right" style = {{marginRight: 30}}>
                    <NavDropdown drop="left" title={<BellIcon height='30' color={(getLen>0 ? 'yellow':'#fff')} active={(getLen>0)} animate={(getLen>0)} />} id="basic-nav-dropdown">
                        {notifs}
                    </NavDropdown>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigationbar;