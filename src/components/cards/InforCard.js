import React from 'react';
import AccChart from '../AccChart';
import { Card, Container, Row, Col } from 'react-bootstrap';
import OutChart from '../charts/Out.PieChart1';
import OutBarChart from '../charts/Out.Bar';
import MoneyDay from '../charts/MoneyDay.LineChart';

export default function InforCard() {
    return (
        <>
            <Container>
                <Card className='shadow'>
                    <Card.Header>Information</Card.Header>
                    <Card.Body>
                        <AccChart />
                        <Row>
                            <Col>
                                <div style={{ width: 500 }}>
                                    <OutChart />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ marginTop: "5rem" }}>
                                    <OutBarChart />
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <div style={{ width: "100%" }}>
                                    <MoneyDay />
                                </div>
                            </Col>
  
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

        </>
    )
}
