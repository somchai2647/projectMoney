import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ButtonMenu from './ButtonMenu';



export default function Menu() {
    const [Title, setTitle] = useState("");

    const handleMouseEnter = (title) => {
        setTitle(title)
    }

    const BASEPATH = "/assets/images/button"
    return (
        <div >
            <Row className='mt-4 d-flex align-items-center justify-content-center'>
                <Col xs="6" md="auto">
                    <ButtonMenu src={`${BASEPATH}/back.jpg`} srchover={`${BASEPATH}/back_hover.jpg`} to="/accounts" title="Back" />
                </Col>
                <Col xs="6" md="auto">
                    <ButtonMenu src={`${BASEPATH}/dashboard.jpg`} srchover={`${BASEPATH}/dashboard_hover.jpg`} to="" title="Dashboard" />
                </Col>
                <Col xs="6" md="auto">
                    <ButtonMenu src={`${BASEPATH}/category.jpg`} srchover={`${BASEPATH}/category_hover.jpg`} to="category" title="Dashboard" />
                </Col>
                <Col xs="6" md="auto">
                    <ButtonMenu src={`${BASEPATH}/recoard.jpg`} srchover={`${BASEPATH}/recoard_hover.jpg`} to="recoard" title="Dashboard" />
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
