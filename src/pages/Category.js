import { Button, Container, ListGroup } from 'react-bootstrap'
import CategoryModal from '../components/modals/AddCategory';
import { BsFillPlusCircleFill, BsListStars } from "react-icons/bs";
import { getCategory } from '../services/category';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

export default function Category() {
    const { account } = useParams()
    const [Data, setData] = useState([])
    const [Open, setOpen] = useState(false)

    const handleToggle = () => {
        setOpen(!Open)
    }

    const getData = async () => {
        try {
            const data = await getCategory(account)

            if (data) setData(data)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(async () => {
        await getData()
    }, [Open])


    return (
        <>
            <CategoryModal open={Open} close={setOpen} />
            <Container>
                <Button onClick={handleToggle} variant='success' size='sm' type='button' style={{ width: "100%" }}><BsFillPlusCircleFill /> เพิ่มหมวดหมู่ใหม่</Button>
                <div style={{ marginTop: 20 }}>
                    <ListGroup defaultActiveKey="#link1">
                        {Data && Data.map((item, index) => (
                            <ListGroup.Item action onClick={handleToggle} key={index} style={{ height: "4rem"}}>
                                <BsListStars /> {item.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </Container>
        </>
    )
}
