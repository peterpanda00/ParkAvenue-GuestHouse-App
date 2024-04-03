import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./routes/Home";
import RoomCheckIn from "./routes/RoomCheckIn";
import RoomBooking from "./routes/RoomBooking";
import Restaurant from "./routes/Restaurant";
import Reports from "./routes/Reports";
import Management from "./routes/Management";
import Sidebar from "./components/Sidebar";
import Login from './routes/Login';
import Register from './routes/Login';
import "./App.css";

const AppLayout = () => (
  <>
    <Outlet />
  </>
);

 const router = createBrowserRouter(
   createRoutesFromElements(
     <Route element={<AppLayout />}>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/room_check_in" element={<RoomCheckIn />} />
      <Route path="/room_booking" element={<RoomBooking />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/reports" element={<Reports />} />
     </Route>
   )
 );

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);