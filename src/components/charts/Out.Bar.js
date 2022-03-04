import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransition, getIncomeOutcome } from '../../services/transition'
import { indexOf } from 'lodash';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'right',
        },
        title: {
            display: true,
            text: 'หมวดหมู่การใช้เงิน (ร้อยละ)',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'ประเภทการใช้จ่าย'
            }
        },
        y: {
            title: {
                display: true,
                text: 'ร้อยละ'
            },
            min: 0,
            max: 100,
            ticks: {
                // forces step size to be 50 units
                stepSize: 10
            }
        }
    }
};



export default function OutBar() {
    const { account } = useParams()
    const [Lables, setLables] = useState([])
    const [Data, setData] = useState([])
    useEffect(async () => {
        const transitions = await getTransition(account)
        const { income } = getIncomeOutcome(transitions)
        if (transitions) {
            let lable = []
            let data = []
            transitions.filter(items => items.type === "OUT").map((item) => {
                if (!lable.includes(item.category)) {
                    lable.push(item.category)
                    const index = indexOf(lable, item.category)
                    data[index] = (item.money / income) * 100
                } else {
                    const index = indexOf(lable, item.category)
                    data[index] += (item.money / income) * 100
                }

            })
            setData(data)
            setLables(lable)
        }
    }, [])

    const data = {
        labels: Lables,
        datasets: [
            {
                label: Lables,
                data: Data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            }
        ],
    };

    return <Bar options={options} data={data} />;
}
