import React from 'react';
import Menu from '../components/Menu';
import { Outlet, useParams } from "react-router-dom";

export default function Dashboard() {
    const { account } = useParams();
    console.log(account)
    return (
        <>
            <h1>Dashboard {account}</h1>
            <Menu />
            <Outlet />
        </>
    )
}
