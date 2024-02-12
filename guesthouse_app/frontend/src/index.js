import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Home from "./routes/Home.jsx";
import Room_Booking from "./routes/Room_Booking.jsx";
import Restaurant from "./routes/Restaurant.jsx";
import Reports from "./routes/Reports.jsx";
import Management from "./routes/Management.jsx";


const index = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/room_booking" element={<Room_Booking/>} />
          <Route path="/restaurant" element={<Restaurant/>} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default index;