/* eslint-disable no-dupe-keys */
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Col } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../Assets/loader.gif";
import { addCentreRoute } from "../Utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";
import Navbar from "../Components/AdminNavbar";

export default function AdminAddCentre() {
  const { user } = useAuth();
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
  };
  const Navigate = useNavigate();
  useEffect(() => {
      if ((!user) || (user !== "admin")) {
          setTimeout(() => {
              toast.error("Login as admin", toastOptions);
            }, 1);
          Navigate("/AdminLogin");
        }
    }, []);

    const [values, setValues] = useState({ cname: "", starttime: "", endtime: "" });
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = async(event) => {
      setIsLoading(true);
      const {cname, starttime, endtime} = values;
      const { data } = await axios.post(addCentreRoute, {
        cname,
        starttime,
        endtime
      });
      if (data.status === false)
      {
        toast.error(data.msg, toastOptions);
        setIsLoading(false);
        
      }
      if (data.status === true) {
        setTimeout(() => {
          toast.success(data.msg, toastOptions);
        }, 1);
        setIsLoading(false);
        Navigate("/AdminLanding");
      }
    };

    return (
        <>
        {isLoading ? (
              <div className="login-page">
              <img src={loader} alt="loader" className="loader" />
              </div>
          ) : (
          <div> <Navbar />
          <div className="login-page">
          <div className="login-box">
          <Col>
            <Form
              name="login-form"
              initialValues={{ remember: true }}
              onFinish={(event) => handleSubmit(event)}
            >
              <p className="form-title">Add a Centre</p>
              <p>Enter centre details below</p>
              <Form.Item
                name="centrename"
                rules={[
                  {
                    required: true,
                    message: 'Missing entry',
                    pattern:"[a-z0-9._%+-]$",
                  },
                ]}
              >
                <Input className="text-box" name="cname" value={values.cname} onChange={(e) => handleChange(e)}
                  placeholder="Centre Name"
                />
              </Form.Item>
    
              <Form.Item
                name="start_time"
                rules={[
                  {
                    required: true,
                    message: 'Missing entry',
                    pattern :"^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
                    message: "Enter a valid time",
                  },
                ]}
              >
                <Input className="text-box" value={values.starttime}  onChange={(e) => handleChange(e)} name="starttime"
                  placeholder="Start Time in 24-Hour format (HH:MM)"
                />
              </Form.Item>

              <Form.Item
                name="end_time"
                rules={[
                  {
                    required: true,
                    message: 'Missing entry',
                    pattern :"^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
                    message: "Enter a valid time",
                  },
                ]}
              >
                <Input className="text-box" value={values.endtime}  onChange={(e) => handleChange(e)} name="endtime"
                  placeholder="End Time in 24-Hour format (HH:MM)"
                />
              </Form.Item>
    
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  ADD
                </Button>
              </Form.Item>
            </Form>
            </Col>
          </div>
        </div>
        </div>
     )}
      <ToastContainer />
      </> 
      );
}