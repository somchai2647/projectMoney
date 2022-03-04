import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap'
import { getTransition, getBalance, getIncomeOutcome } from '../services/transition';
import { useParams } from 'react-router-dom';
import Moment from 'moment'
import addComma3Point from '../utils/addCommaNumber'
import "moment/locale/th";

const style = {
    fontSize: "24pt"
}
export default function AccChart() {
    const [Data, setData] = useState([])
    const { account } = useParams()

    useEffect(async () => {
        const data = await getTransition(account)
        if (data) setData(data)
    }, [])

    return (
        <>
            <div>
                <div className='mt-4'>
                    <h1>💰 ยอดเงินคงเหลือ:  {addComma3Point(getBalance(Data))} บาท</h1>
                    <span style={style}> <Badge bg='success'>💵 รายรับทั้งหมด:  {addComma3Point(getIncomeOutcome(Data).income)} บาท</Badge></span>
                    <span style={style}> <Badge bg='danger'>💸 รายจ่ายทั้งหมด:  {addComma3Point(getIncomeOutcome(Data).outcome)} บาท</Badge></span>
                </div>
                <hr />

            </div>
        </>
    )
}
