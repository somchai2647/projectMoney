import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { login, create } from '../services/auth';
export default function Welcome() {
    const { register, handleSubmit, reset, setValue } = useForm();

    const [Loading, setLoading] = useState(false)
    const [Regis, setRegis] = useState(false)
    const [Remember, setRemember] = useState(false)
    const [Err, setErr] = useState("")

    useEffect(() => {
        if (!Regis) {
            const remember = localStorage.getItem("remember");
            if (remember) {
                setRemember(true)
                setValue("email", remember)
            }
        }

    }, [Regis])

    const handleToggleCheck = () => {
        setRemember(!Remember)
    }

    const hanleReset = () => {
        reset()
        setLoading(false)
        setErr("")
    }

    const handleToggleReg = () => {
        hanleReset()
        setRegis(!Regis)
        setRemember(false)
    }

    const onSubmit = data => {
        const { email, password, password2 } = data
        setLoading(true)
        if (Regis) {
            create(email, password, password2).then(user => {
                console.log(user)
                handleToggleReg()
            }).catch(e => {
                setErr("อีเมลถูกใช้งานแล้ว")
                console.log(e)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            login(email, password).then(user => {
                if (Remember === false) {
                    localStorage.removeItem("remember");
                }
                else {
                    localStorage.setItem("remember", email)
                }
                console.log(user)
            }).catch(e => {
                setErr("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
                console.log(e)
            }).finally(() => {
                setLoading(false)
            })
            setValue("password", "")
        }

    }

    return (
        <div>
            <Navbar />
            <Container className='mt-4 d-flex align-items-center justify-content-center'>
                <Card style={{ width: '20rem' }} className='shadow'>
                    <Card.Img variant="top" src={Regis ? "assets/images/reg.webp" : "assets/images/login.webp"} />
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="exampleForm.email">
                                <Form.Label>อีเมล</Form.Label>
                                <Form.Control type="email" autoFocus required {...register("email", { required: true, })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.password">
                                <Form.Label>รหัสผ่าน</Form.Label>
                                <Form.Control type="password" autoComplete='off' required {...register("password", { required: true })} />
                            </Form.Group>
                            {Regis &&
                                <Form.Group className="mb-3" controlId="exampleForm.password">
                                    <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                                    <Form.Control type="password" autoComplete='off' required {...register("password2", { required: true })} />
                                </Form.Group>}
                            <Form.Group className="mb-3" controlId="exampleForm.checkboxs">
                                <Form.Check
                                    type="checkbox"
                                    label={`จดจำอีเมลฉัน`}
                                    onChange={handleToggleCheck}
                                    checked={Remember}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Button variant="success" type='submit' disabled={Loading} style={{ width: "100%" }}>{(!Loading ? (Regis ? "สมัครสมาชิก" : "เข้าสู่ระบบ") : (Regis ? "กำลังสมัครสมาชิก..." : "กำลังเข้าสู่ระบบ..."))}</Button>
                            </Form.Group>
                            <Form.Group>
                                <Button onClick={handleToggleReg} variant="default" type='button' disabled={Loading} style={{ width: "100%" }}>{Regis ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</Button>
                            </Form.Group>
                            <Form.Group style={{ textAlign: "center" }}>
                                {Err && <span style={{ color: "red" }}>{Err}</span>}
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
