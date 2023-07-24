/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Button, Form, Input, Col } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../Assets/loader.gif";
import { loginRoute } from "../Utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";

export default function UserLogin()
{
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
  };
  const { logout } = useAuth();
  logout();
  const { login } = useAuth();

const [values, setValues] = useState({ email: "", password: "" });
const [isLoading, setIsLoading] = useState(false);

const Navigate = useNavigate();
const goto = () => {
Navigate('/AdminLogin');
}

const reg = () => {
  Navigate('/Register');
}

const handleChange = (event) => {
  setValues({ ...values, [event.target.name]: event.target.value });
};

const handleSubmit = async(event) => {
  setIsLoading(true);
  const {email, password} = values;
  const { data } = await axios.post(loginRoute, {
    email,
    password,
  });
  if (data.status === false)
  {
    toast.error(data.msg, toastOptions);
    setIsLoading(false);
  }
  if (data.status === true) {
    setIsLoading(false);
    login(email);
    Navigate('/Centres');
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
      <Button className="userlogin-button" type="primary" disabled>User Login</Button>
      <Button className="login-button2" onClick={goto}>Admin Login</Button>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={(event) => handleSubmit(event)}
        >
          <p className="form-title">Covid Vaccine Booking</p>
          <p>User Login to Dashboard</p>
          <Form.Item
            name="accountemail"
            rules={[
              {
                required: true,
                message: 'Missing entry',
                pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
                message:"Enter correct Email ID"
              },
            ]}
          >
            <Input name="email" value={values.email} onChange={(e) => handleChange(e)}
              placeholder="E-Mail"
            />
          </Form.Item>

          <Form.Item
            name="pword"
            rules={[
              {
                required: true,
                message: 'Missing entry',
                pattern :"^[A-Za-z0-9_]{4,}$",
                message: "Enter valid password",
                min: 8
              },
            ]}
          >
            <Input.Password value={values.password}  onChange={(e) => handleChange(e)} name="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
        <center>
          <p>
          Don't have an account?<br></br><Button type="link" onClick={reg}>Register</Button>
          </p>
        </center>
        </Col>
      </div>
    </div>
 )}
  <ToastContainer limit={1}/>
  </> 
  );
};