import { React, useState, useEffect } from "react";
import { Form, Input, Table, Button, Radio } from "antd";
import axios from 'axios';
import { getAllCentresRoute, removeCentreRoute } from "../Utils/APIRoutes";
import loader from "../Assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/AdminNavbar";
import { useAuth } from "../Context/AuthContext";

export default function Centres() {

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
  };
  const { user } = useAuth();
  const Navigate = useNavigate();
  useEffect(() => {
      if ((!user) || (user !== "admin")) {
          setTimeout(() => {
              toast.error("Login as admin", toastOptions);
            }, 1);
          Navigate("/AdminLogin");
        }
    }, []);
const [value, setValue] = useState("");
const [selectedKey, setSelectedRadio] = useState("");
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const onChange = (event) => {
  setValue(event.target.value);
};

  useEffect(() => {
    axios.get(getAllCentresRoute)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRadioChange = (key) => {
    setSelectedRadio(key)
  };
const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <Radio value={record.cname} />
    ),
    },
    {
      title: 'Centre Name',
      dataIndex: 'cname',
      key: 'cname',
      filteredValue: [value],
        onFilter: (v, record) => {
            return record.cname.toLowerCase().includes(v.toLowerCase())
        },
    },
    {
      title: 'Starting Time',
      dataIndex: 'starttime',
      key: 'starttime',
    },
    {
        title: 'Closing Time',
        dataIndex: 'endtime',
        key: 'endtime',
    },
  ];

const pageSizeOptions = ['5', '10', '20', '50', '100'];

const deleter = async(event) => {
    setIsLoading(true);
    const test = selectedKey;
    const { data } = await axios.post(removeCentreRoute, {cname: test})
    if (data.status === false)
    {
      toast.error(data.msg, toastOptions);
      setIsLoading(false);
    }
    if (data.status === true) {
      setIsLoading(false);
      setTimeout(() => {
        toast.success(data.msg, toastOptions);
      }, 2);
      Navigate("/AdminLanding");
    }
}

return (
    <>
    {isLoading ? (
                <div className="login-page">
                <img src={loader} alt="loader" className="loader" />
                </div>
    ) : (
    <div>
    <Navbar /> <center> DELETING A CENTRE ALSO DELETES ALL ITS BOOKINGS*</center>
    <center><Input.Search className="search-bar"
    placeholder="Search for Centres"
    value={value}
    onChange={onChange}
    enterButton
     /></center>
  <Form
    onFinish={(event) => deleter(event)}
  
  >
    <Radio.Group className="table" onChange={(e) => handleRadioChange(e.target.value)}>
    <Table columns={columns} dataSource={data} pagination={{
      pageSizeOptions,
      showSizeChanger: true,
      showTotal: (total) => `Total ${total} items`,
    }}
    />
    </Radio.Group>
    <center><Button type="primary" htmlType="submit">
              DELETE
    </Button></center>
    </Form>
    </div>
  )}
  <ToastContainer />
  </>
);
}