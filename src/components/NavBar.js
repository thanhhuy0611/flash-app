import React from 'react';
import {
    Navbar, Nav, NavDropdown, Form, FormControl, Button, InputGroup
} from "react-bootstrap";
import '../static/NavBar.css';

export default function NavBar(props) {
    const doLogout = async() => {
        const token = sessionStorage.getItem('token')
        const res = await fetch(process.env.REACT_APP_URL + 'logout',{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                Authorization:`Token ${token}`
            },
        })
        const data =await res.json()
        console.log('data', data)
        if (data.success) {
            props.setIsLogin(false)
            props.setCurrentUser(null)
            sessionStorage.clear(token)
        }
        return
    }
    return (
        <div>
            <Navbar expand="lg" id="navbar">
                <Navbar.Brand href="#home" ><i className="fas fa-bolt brand"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Form inline>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    id="searchInput"
                                />
                                <InputGroup.Append>
                                    <Button id="buttonSearch"><i className="fas fa-search"></i></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Nav>
                    <Form inline>
                        <Nav.Link href="#home">{props.currentUser && props.currentUser.user_name}</Nav.Link>
                        <Nav.Link href="#" onClick={()=>doLogout()}>Logout</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
