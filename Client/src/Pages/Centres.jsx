import { React, useState, useEffect } from "react";
import { Form, Input, Table, Button, Radio, DatePicker, TimePicker } from "antd";
import axios from 'axios';
import { getAllCentresRoute, CentresRoute } from "../Utils/APIRoutes";
import loader from "../Assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import moment from 'moment';


export default function Centres() {

  const disabledDate = current => {
    const today = moment().startOf('day');
    return current && (current.isBefore(today) || current.isSame(today, 'day'));
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
  };
  const { user } = useAuth();
  const Navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        toast.error("Login first", toastOptions);
      }, 1);
      Navigate("/");
  }}, []);

useEffect(() => {
if(sessionStorage.getItem('k'))
{
  toast.error("Enter Date of Booking!", toastOptions);
}
sessionStorage.removeItem('k');
}, []);
const [value, setValue] = useState("");
const [date, setDate] = useState(null);
const [selectedKey, setSelectedRadio] = useState("");
const [data, setData] = useState([]);
const [selectedTime, setSelectedTime] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const onChange = (event) => {
  setValue(event.target.value);
};

const handleTimeChange = (time) => {
  setSelectedTime(time ? time.format('HH:mm') : null);
};

const filteredData = selectedTime
  ? data.filter((item) => {
      const startTime = item.starttime;
      const endTime = item.endtime;
      return selectedTime >= startTime && selectedTime <= endTime;
    })
  : data;

const dateChange = (date, dateString) => {
  setDate(dateString);
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
      title: "Select",
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

const onFinish = async(event) => {
    setIsLoading(true);
    var fdate = date;
    const cname = selectedKey;
    const email = user;
    if(!(fdate)) {
      sessionStorage.setItem('k', true);
      window.location.reload(true);
    }
    else {
    const { data } = await axios.post(CentresRoute, {fdate, cname, email});
    if (data.status === false)
    {
      toast.error(data.msg, toastOptions);
      setIsLoading(false);
    }
    if (data.status === true){
      setIsLoading(false);
      setTimeout(() => {
        toast.success(data.msg, toastOptions);
      }, 1);
      setDate(null);
      Navigate('/Centres');
    }
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
    <Navbar />
    <center><Input.Search className="search-bar"
    placeholder="Search for Centres"
    value={value}
    onChange={onChange}
    enterButton
     /></center>
     
  <Form
    onFinish={(event) => onFinish(event)}
    >
      <center><TimePicker
          format="HH:mm"
          onChange={handleTimeChange}
          value={selectedTime ? moment(selectedTime, 'HH:mm') : null}
        /></center>
      <br></br>
      <div className="date-div">
      Choose date (does not include today)* : <DatePicker onChange={dateChange} disabledDate={disabledDate} />
      </div>
    <Radio.Group className="table" onChange={(e) => handleRadioChange(e.target.value)}>
    <Table columns={columns} dataSource={filteredData} pagination={{
      pageSizeOptions,
      showSizeChanger: true,
      showTotal: (total) => `Total ${total} items`,
    }}
    />
    </Radio.Group>
    <center><Button type="primary" htmlType="submit">
              BOOK
    </Button></center>
    </Form>
    </div>
  )}
  <ToastContainer limit={1} />
  </>
);
}

