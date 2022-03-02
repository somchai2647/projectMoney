import React from 'react';
import Menu from '../components/Menu';
import { Outlet, useParams } from "react-router-dom";

export default function Dashboard() {
    const { account } = useParams();
    return (
        <>
            {/* <img src="/assets/images/accbar1.png" style={{ width: "100%" }} /> */}
            {/* <h1>Dashboard {account}</h1> */}
            <Menu />
            <Outlet />
        </>
    )
}
