import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, ButtonGroup, ToggleButton, FloatingLabel } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { getCategory } from '../../services/category';
import { getTransition, addTransition } from '../../services/transition';
import { getOne } from '../../services/category';
import { useForm } from "react-hook-form";




export default function AddReacord({ open, close }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { account } = useParams()
    const [Loading, setLoading] = useState(false);
    const [Category, setCategory] = useState([]);
    const [radioValue, setRadioValue] = useState('IN');
    const radios = [
        { name: 'รายรับ', value: 'IN' },
        { name: 'รายจ่าย', value: 'OUT' },
    ];

    const handleClose = () => close(false)
    const handleSave = async (formdata) => {
        // console.log({ ...formdata, radioValue }, parseFloat(formdata.money))
        try {
            setLoading(true)
            const payload = { ...formdata, type: radioValue, money: parseFloat(formdata.money), account }
            const docID = await addTransition(payload)

            if (docID) {
                handleClose()
                reset()
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const loadData = async () => {
        const category = await getCategory(account)

        if (category) setCategory(category)

    }

    useEffect(async () => {
        await loadData()
        // console.log(await getOne("W1s0zvrQaQkIsE0krObe"))
    }, [])


    return (
        <>
            <Modal show={open} onHide={handleClose} size='lg'>
                <Form onSubmit={handleSubmit(handleSave)}>
                    <Modal.Header closeButton>
                        <Modal.Title>เพิ่มรายการใหม่</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ButtonGroup style={{ width: "100%", marginBottom: 20 }}>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <Form.Group className="mb-3" controlId="formAccountName">
                            <Form.Label>หมวดหมู่รายรับ-ร่ายจ่าย</Form.Label>
                            <Form.Select aria-label="เลือกหมวดหมู้" required {...register("category", { required: true })} defaultValue={""}>
                                <option disabled value={""}>เลือกหมวดหมู่</option>
                                {Category && Category.map((item, index) => (
                                    <option value={item.name} key={index}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDetail">
                            <Form.Label >รายละเอียด</Form.Label>
                            <FloatingLabel label="รายละเอียด">
                                <Form.Control
                                    aria-label="รายละเอียด"
                                    as="textarea"
                                    style={{ height: '100px' }}
                                    {...register("detail")}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formmoney">
                            <Form.Label>จำนวนเงิน (บาท)</Form.Label>
                            <Form.Control type='number' min={0} defaultValue={1.00} step={0.50} required {...register("money", { required: true })} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" disabled={Loading} onClick={handleClose}>
                            ปิด
                        </Button>
                        <Button variant="success" type='submit' disabled={Loading}>
                            {!Loading ? "บันทึก" : "กำลังบันทึก..."}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
