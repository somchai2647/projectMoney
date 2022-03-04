import React, { useEffect, useState } from 'react';
import { getTransition, getIncomeOutcome } from '../../services/transition'
import { indexOf } from 'lodash';
import nFormatter from '../../utils/nFormatter';
import Moment from 'moment'
import "moment/locale/th"
import { useParams } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};



export default function MoneyChart() {
    const { account } = useParams()
    const [DataIn, setDataIn] = useState([])
    const [DataOut, setDataOut] = useState([])
    const [Date, setDate] = useState([])
    const [Lables, setLables] = useState([])

    useEffect(async () => {
        const transitions = await getTransition(account,9)
        console.log(transitions)
        let IN = []
        let OUT = []
        let myDate = []
        transitions && transitions.map((item, i) => {
            if (item.type === "IN") {
                IN[i] = item.money
                OUT[i] = 0

            } else {
                IN[i] = 0
                OUT[i] = item.money
            }
            myDate[i] = Moment.utc(item.createdDate * 1000).format("L")
        })
        setDataIn(IN)
        setDataOut(OUT)
        setDate(myDate)
    }, [])


    const data = {
        labels: Date,
        datasets: [
            {
                label: 'รายรับ',
                data: DataIn,
                fill: true,
                borderColor: 'rgba(0, 255, 0, 1)',
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
            },
            {
                label: 'รายจ่าย',
                data: DataOut,
                fill: true,
                borderColor: 'rgb(255, 99, 132,1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Line options={options} data={data} />;
}
