import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams, Outlet } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { BsFillPlusCircleFill } from "react-icons/bs";
import AddModal from '../components/modals/AddAccount';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { getAccounts } from '../services/accounts';
import Moment from 'moment';
import "moment/locale/th";

function LinkItem({ item, img }) {
    const style = !img ? {
        backgroundSize: 'cover',
        overflow: 'hidden',
    } : {
        backgroundImage: `url('${img}')`,
        backgroundSize: 'cover',
        overflow: 'hidden',
        paddingLeft: '10rem',
    }

    return (
        <Link to={`/accounts/${item.id}`} style={{ textDecoration: "none" }}>
            <ListGroup.Item action
                style={style}
            >
                <span className={img ? `text-white` : null} style={{ fontSize: 25 }}>{item.name}</span>
                <p className='text-muted text-white' style={{ fontSize: "12pt" }}>{Moment.unix(item.createdDate).format("LLL")}</p>
            </ListGroup.Item>
        </Link>
    )
}

export default function Home() {

    const { currentUser } = useContext(AuthContext);
    const [Modal, setModal] = useState(false);
    const [Accut, setAccut] = useState(null);
    const handleOpen = () => setModal(!Modal);

    const loadData = async () => {
        try {
            const data = await getAccounts();

            setAccut(data)

        } catch (error) {
            console.log(error)
        }
    }

    const hanleClick = (account) => {

    }

    useEffect(async () => {

        await loadData()

    }, [Modal]);

    const { account } = useParams();

    return (
        <Container className='mt-4'>
            {account}
            <Button onClick={handleOpen} variant='success' size='sm'><BsFillPlusCircleFill size={18} /> เพิ่มบัญชีรายรับ-รายจ่าย</Button>
            <Button onClick={loadData} variant='success' size='sm'><BsFillPlusCircleFill size={18} /> Reload</Button>
            <AddModal Open={Modal} Close={setModal} />
            <Card style={{ width: '100%', marginTop: "1rem" }} text='light' bg='info' className='shadow'>
                <Card.Header>บัญชีรายรับ-รายจ่าย</Card.Header>
                <ListGroup variant="flush">
                    {!Accut ?
                        <ListGroup.Item action disabled style={{ textAlign: "center" }}>-ไม่พบบัญชี-</ListGroup.Item>
                        :
                        Accut.map((item, i) => (
                            <LinkItem item={item} key={item.id} img={`/assets/images/accbar${i+1}.png`} />
                        ))
                    }
                </ListGroup>
            </Card>
            <Outlet />
        </Container>

    )
}
