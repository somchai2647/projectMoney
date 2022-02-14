import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { addCategory } from '../../services/category';
import { useForm } from "react-hook-form";

export default function AddCategory({ open, close }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { account } = useParams()
    const [Loading, setLoading] = useState(false);

    const handleClose = () => close(false)
    const handleSave = async (formdata) => {
        try {
            setLoading(true)
            const payload = { ...formdata, account }
            const docID = await addCategory(payload)
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
                        <Modal.Title>เพิ่มหมวดหมู่ใหม่</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formCategoryName">
                            <Form.Label>ชื่อหมวดหมู่</Form.Label>
                            <Form.Control type="text" required {...register("name", { required: true })} />
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
