import React from 'react';
import AccChart from '../AccChart';
import { Card, Container } from 'react-bootstrap';

export default function InforCard() {
    return (
        <>
            <Container>
                <Card>
                    <Card.Header>Information</Card.Header>
                    <Card.Body>
                        <AccChart />
                    </Card.Body>
                </Card>
            </Container>

        </>
    )
}
