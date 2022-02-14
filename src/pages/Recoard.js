import React, { useEffect, useState } from 'react'
import { Button, Container, Badge, ListGroup } from 'react-bootstrap'
import { BsFillPlusCircleFill } from "react-icons/bs";
import RecordModal from '../components/modals/AddRecoard'

const ListItem = () => (
    <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
    >
        <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            Cras justo odio
        </div>
        <Badge variant="primary" pill>
            14
        </Badge>
    </ListGroup.Item>
)

export default function Recoard() {
    const [Open, setOpen] = useState(false)
    const handleToggle = () =>{
        setOpen(!Open)
    }
    return (
        <>
            <RecordModal open={Open} close={setOpen} />
            <Container>
                <Button onClick={handleToggle} variant='success' size='sm' type='button' style={{ width: "100%" }}><BsFillPlusCircleFill /> เพิ่มรายการใหม่</Button>
                <div style={{ marginTop: 20 }}>
                    <ListGroup as="ol" numbered>
                        <ListItem />

                    </ListGroup>
                </div>

            </Container>
        </>
    )
}
