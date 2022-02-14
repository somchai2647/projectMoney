import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { createAccount } from '../../services/accounts';
import { useForm } from "react-hook-form";

export default function AddReacord({ open, close }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { account } = useParams()
    const [Loading, setLoading] = useState(false);

    const handleClose = () => close(false)
    const handleSave = async (formdata) => {
        try {
            setLoading(true)
            const docID = await createAccount(formdata)
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

    return (
        <>
            <Modal show={open} onHide={handleClose} size='lg'>
                <Form onSubmit={handleSubmit(handleSave)}>
                    <Modal.Header closeButton>
                        <Modal.Title>เพิ่มรายการใหม่</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {account}
                        <Form.Group className="mb-3" controlId="formAccountName">
                            <Form.Label>ชื่อบัญชี</Form.Label>
                            <Form.Control type="text" required {...register("name", { required: true })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ค่าตั้งต้น (บาท)</Form.Label>
                            <Form.Control type="number" min={0} {...register("money")} />
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
