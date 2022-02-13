import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ButtonMenu from './ButtonMenu';



export default function Menu() {
    const [Title, setTitle] = useState("");

    const handleMouseEnter = (title) => {
        setTitle(title)
    }
    return (
        <div>
            <Row className='mt-4 d-flex align-items-center justify-content-center'>
                <Col xs="6" md="auto">
                    <ButtonMenu src="/assets/money1.webp" to="" title="Dashboard" />
                </Col>
                <Col xs="6" md="auto">
                    <ButtonMenu src="/assets/money1.webp" to="category" title="Category" />

                </Col>
                <Col xs="6" md="auto">

                </Col>
                <Col xs="6" md="auto">

                </Col>
            </Row>
            <Row className='d-flex align-items-center justify-content-center text-center' style={{ marginTop: "5rem" }}>
                <Col>
                    <h3>{Title}</h3>
                </Col>
            </Row>
        </div>
    )
}
