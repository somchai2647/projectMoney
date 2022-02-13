import React from 'react';
import { Routes, Route, Outlet, useParams } from "react-router-dom";

export default function Test() {
    const {account} = useParams()
    return (
        <>
            <h1>TEST {account}</h1>
        </>
    )
}
