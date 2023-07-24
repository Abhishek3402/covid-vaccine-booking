/* eslint-disable no-dupe-keys */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Col } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../Assets/loader.gif";
import { adminLoginRoute } from "../Utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin()
{
  const { logout } = useAuth();
  logout();
  const { login } = useAuth();
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
  };

    const Navigate = useNavigate();
    const [values, setValues] = useState({ uname: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const goto = () => {
    Navigate('/')
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async(event) => {
    setIsLoading(true);
    const {uname, password} = values;
    const { data } = await axios.post(adminLoginRoute, {
      uname,
      password,
    });
    if (data.status === false)
    {
      toast.error(data.msg, toastOptions);
      setIsLoading(false);
    }
    if (data.status === true) {
      setIsLoading(false);
      login(uname);
      Navigate('/AdminLanding');
    }
  };

  return (
    <>
    {isLoading ? (
          <div className="login-page">
          <img src={loader} alt="loader" className="loader" />
          </div>
      ) : (
    <div className="login-page">
      <div className="login-box">
        <Col>
        <Button className="login-button" onClick={goto}>User Login</Button>
        <Button className="adminlogin-button2" type="primary" disabled>Admin Login</Button>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={(event) => handleSubmit(event)}
        >
          <p className="form-title">Admin Login</p>
          <p>Admin Login to Dashboard<br></br>(Default username is admin and password is admin123)</p>
          <Form.Item
            name="username"
            rules={[
                {
                  required: true,
                  message: 'Missing entry',
                  pattern: "[a-z]$",
                  min: 5,
                  message:"Enter correct Username",
                },
              ]}
          >
            <Input name="uname" value={values.uname} onChange={(e) => handleChange(e)}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="pword"
            rules={[
                {
                  required: true,
                  message: 'Missing entry',
                  pattern :"^[A-Za-z0-9_]{4,}$",
                  min: 5,
                  message: "Enter valid password" 
                },
              ]}
          >
            <Input.Password name="password" value={values.password} onChange={(e) => handleChange(e)}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
        </Col>
      </div>
    </div>
  )}
  <ToastContainer />
  </>
);
};
