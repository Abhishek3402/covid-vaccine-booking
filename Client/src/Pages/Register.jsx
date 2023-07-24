/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Button, Form, Input, Col } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../Assets/loader.gif";
import { registerRoute } from "../Utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Register()
{
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ email: "", name: "", password: "", phoneno: "", acard: "" });
  const Navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const logon = () => {
  Navigate('/')
}

  const handleSubmit = async (event) => {
    setIsLoading(true);
    const {email, password, name, phoneno, acard} = values;
    const {data} = await axios.post(registerRoute, 
    {
      email,
      name,
      password,
      phoneno,
      acard
    }
    )
    if (data.status === false) {
      setIsLoading(false);
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      setTimeout(() => {
        toast.success(data.msg, toastOptions);
      }, 1);
      setIsLoading(false);
    Navigate('/');
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
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={(event) => handleSubmit(event)}
        >
          <p className="form-title">Covid Vaccine Booking</p>
          <p>Sign Up</p>

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
              placeholder="example@example.com"
            />
          </Form.Item>

          <Form.Item
            name="accountname"
            rules={[
                {
                  required: true,
                  min : 3, 
                  message: "Minimum 3 characters"
                },
              ]}
          >
            <Input name="name" value={values.name} onChange={(e) => handleChange(e)}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item 
            name="pword"
            rules={[{ required: true, message: 'Minimum 8 characters', pattern :"^[A-Za-z0-9_]{4,}$", min:8 }]}
          >
            <Input.Password name="password"  value={values.password} onChange={(e) => handleChange(e)}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="phonenumber"
            rules={[
                {
                  required: true,
                  message: 'Missing entry',
                  pattern:"^\\d{10}$",
                  message:"Enter correct Phone Number"
                },
              ]}
          >
            <Input name="phoneno" value={values.phoneno} onChange={(e) => handleChange(e)}
              placeholder="10-digit phone number"
            />
            </Form.Item>

          <Form.Item
            name="aadhaarcard"
            rules={[
                {
                  required: true,
                  message: 'Missing entry',
                  pattern:"^\\d{12}$",
                  message:"Enter correct Aadhaar Number"
                },
              ]}
          >
            <Input name="acard" value={values.acard} onChange={(e) => handleChange(e)}
              placeholder="12-digit Aadhaar Number"
            />
            </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
        <center>
          <p>
          Have an account?<br></br><Button type="link" onClick={logon}>Login</Button>
          </p>
        </center>
        </Col>
      </div>
    </div>
    )}
    <ToastContainer />
    </> 
    );
};
