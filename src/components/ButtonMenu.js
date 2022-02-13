import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonMenu({ title, to, src, Callback }) {

    const handleMouseEnter = () => {
        Callback(title)
    }

    return (
        <React.Fragment>
            <Link to={to}>
                <img src={src} onMouseEnter={handleMouseEnter} className='menuitem shadow-lg' alt={title} />
            </Link>
        </React.Fragment>
    )
}
