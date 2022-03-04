import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { getTransition } from '../../services/transition'
import { indexOf } from 'lodash';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const option = {
    plugins: {
        legend: {
            position: "left",
            align: "center"
        },
        title: {
            display: true,
            text: 'หมวดหมู่การใช้เงิน',
            font: {
                size: 20
            }
        }
    }
}

export default function OutChart() {
    const { account } = useParams()
    const [Lables, setLables] = useState([])
    const [Data, setData] = useState([])
    useEffect(async () => {
        const transitions = await getTransition(account)
        if (transitions) {
            let lable = []
            let data = []
            transitions.filter(items => items.type === "OUT").map((item) => {
                if (!lable.includes(item.category)) {
                    lable.push(item.category)
                    const index = indexOf(lable,item.category)
                    data[index] = item.money
                }else{
                    const index = indexOf(lable,item.category)
                    data[index] += item.money
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
                label: '# of Votes',
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
                borderWidth: 1,
            },
        ],
    };




    return (
        <div>
            <Pie data={data} options={option} />;
        </div>
    )
}
