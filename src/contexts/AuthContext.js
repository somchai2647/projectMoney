import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const auth = getAuth()
    const [Loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false)
                setCurrentUser(user)
            }


        })
    }, []);

    // if(Loading) return <p>Loading...</p>

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}