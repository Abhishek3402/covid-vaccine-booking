import { React, useState, useEffect } from "react";
import { Input, Table } from "antd";
import axios from 'axios';
import { dosageRoute } from "../Utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/AdminNavbar";
import { useAuth } from "../Context/AuthContext";

export default function Dosage()
{
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
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    useEffect(() => {
        axios.get(dosageRoute)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            toast.error('Error fetching data:', error);
          });
      }, []);
    
    const onChange = (event) => {
    setValue(event.target.value);
    };

      const columns = [
        {
          title: 'Centre Name',
          dataIndex: '_id',
          key: '_id',
          filteredValue: [value],
            onFilter: (v, record) => {
                return record._id.toLowerCase().includes(v.toLowerCase())
            },
        },
        {
          title: 'Dosage Count (Total number of bookings per centre)',
          dataIndex: 'dosage',
          key: 'dosage',
        },
      ];
    
    const pageSizeOptions = ['5', '10', '20', '50', '100'];
  
    
      return(
        <>
        <div><Navbar />
        <center><Input.Search className="search-bar"
    placeholder="Search for Centres"
    value={value}
    onChange={onChange}
    enterButton
     /></center>
     <Table columns={columns} dataSource={data} pagination={{
      pageSizeOptions,
      showSizeChanger: true,
      showTotal: (total) => `Total ${total} items`,
    }}
    />
    <ToastContainer />
    </div>
        </>
    )
}