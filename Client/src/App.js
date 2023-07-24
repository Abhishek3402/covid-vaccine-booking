import './App.css';
import UserLogin from './Pages/UserLogin';
import AdminLogin from './Pages/AdminLogin';
import Register from './Pages/Register';
import Centres from './Pages/Centres';
import AdminLanding from './Pages/AdminLanding';
import AddCentre from './Pages/AddCentre';
import RemoveCentre from './Pages/RemoveCentre';
import Dosage from './Pages/Dosage';
import {Route, Routes} from "react-router-dom";
import { ConfigProvider } from 'antd';
import React from "react";

function App() {

  return (
    <>
    <ConfigProvider>
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Centres" element={<Centres />} />
      <Route path="/AdminLanding" element={<AdminLanding />} />
      <Route path="/AddCentre" element={<AddCentre />} />
      <Route path="/RemoveCentre" element={<RemoveCentre />} />
      <Route path="/dosage" element={<Dosage />} />
    </Routes>
    </ConfigProvider>
    </>
  );
}

export default App;
