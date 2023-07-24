import React from 'react';
import { Button, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';

export default function Navbar() {

        const Navigate = useNavigate();
        const { logout } = useAuth();
        const goToLogin = () => {
            logout();
            Navigate("/");
        }

    return (
        <>
        <nav className="navbar">
            <Button className='navbutton' type="primary" onClick={goToLogin} danger>Logout</Button> 
            <center><h1 className='adminnavtext'>Admin Portal</h1></center>
        </nav>
        </>
    )
}