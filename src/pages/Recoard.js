import { Button, Container, Badge, ListGroup } from 'react-bootstrap'
import RecordModal from '../components/modals/AddRecoard'
import { BsFillPlusCircleFill } from "react-icons/bs";
import React, { useEffect, useState } from 'react'
import { getTransition, getBalance, getIncomeOutcome } from '../services/transition';
import { useParams } from 'react-router-dom';
import Moment from 'moment'
import "moment/locale/th";

function addComma3Point(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListItem = ({ data }) => (
    <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        variant={data.type == "IN" ? "success" : "danger"}
    >
        <div className="ms-2 me-auto">
            <div className="fw-bold">{data.category}</div>
            รายละเอียด: {data.detail} <br />
            <small>⏰: {Moment.utc(data.createdDate * 1000).format("LLL")}</small>
        </div>
        <h3>{data.type == "IN" ? "+" : "-"}{addComma3Point(data.money)} บาท</h3>
    </ListGroup.Item>
)

export default function Recoard() {
    const { account } = useParams()
    const [Open, setOpen] = useState(false)
    const [Data, setData] = useState([])
    const handleToggle = () => {
        setOpen(!Open)
    }

    useEffect(async () => {
        const data = await getTransition(account)
        if (data) setData(data)
    }, [Open])


    return (
        <>
            <RecordModal open={Open} close={setOpen} />
            <Container>
                <Button onClick={handleToggle} variant='success' size='sm' type='button' style={{ width: "100%" }}><BsFillPlusCircleFill /> เพิ่มรายการใหม่</Button>
                {/* {JSON.stringify(Data)} */}
                <div className='mt-4'>
                    <h1>💰 ยอดเงินคงเหลือ:  {addComma3Point(getBalance(Data))} บาท</h1>
                    <h4>  <Badge bg='success'>💵 รายรับทั้งหมด:  {addComma3Point(getIncomeOutcome(Data).income)} บาท</Badge></h4>
                    <h4> <Badge bg='danger'>💸 รายจ่ายทั้งหมด:  {addComma3Point(getIncomeOutcome(Data).outcome)} บาท</Badge></h4>
                </div>
                <hr />
                <div style={{ marginTop: 20 }}>
                    <ListGroup as="ol" numbered>
                        {Data && Data.map((item, index) => (
                            <ListItem key={index} data={item} />
                        ))}
                    </ListGroup>
                </div>
            </Container>
        </>
    )
}
