import { React, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/AdminNavbar";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLanding() {

    const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false,
        draggable: false,
      };
    const {user} = useAuth();
    const Navigate = useNavigate();
   useEffect(() => {
        if ((!user) || (user !== "admin")) {
            setTimeout(() => {
                toast.error("Login as admin", toastOptions);
              }, 1);
            Navigate("/AdminLogin");
          }
     }, []);
    
    const dosage = () => {
        Navigate('/Dosage');
    }
    const addcentre = () => {
        Navigate('/AddCentre');
    }
    const removecentre = () => {
        Navigate('/RemoveCentre');
    }

    return (
        <>
        <div>
        <Navbar />
        <div className="login-page1">
            <div className="login-box1">
                    <Button className="admin-button" type="primary" onClick={dosage} >Get Dosage Details</Button>
                    <Button className="admin-button" type="primary" onClick={removecentre}>Remove Centres</Button>
                    <Button className="admin-button" type="primary" onClick={addcentre} >Add Centres</Button>
            </div>
        </div>
        </div>
        <ToastContainer limit={1} />
        </>
    )
}