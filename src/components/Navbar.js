import React from 'react'
import {Container, Navbar} from 'react-bootstrap'

const NavbarComponent = () => {
  return (
    <Navbar variant='black' expand='lg'>
      <Container>
        <Navbar.Brand href="#home">
          <strong>Coffee Shop </strong>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent