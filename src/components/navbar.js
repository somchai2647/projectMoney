import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function navbar() {
    return (
        <div>
            <Navbar bg="info" variant='dark' expand="lg">
                <Container>
                    <Navbar.Brand href="#">ระบบบันทึกรายรับ-รายจ่าย</Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
                </Container>
            </Navbar>
        </div>
    )
}
