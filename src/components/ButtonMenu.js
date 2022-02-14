import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ButtonMenu({ title, to, src, srchover, Callback }) {

    const [Hover, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
        // Callback(title)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    return (
        <React.Fragment>
            <Link to={to}>
                <img src={Hover ? srchover : src} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className='menuitem shadow-lg' alt={title} />
            </Link>
        </React.Fragment>
    )
}
