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
import RoomBooking from "./routes/RoomBooking";
import Restaurant from "./routes/Restaurant";
import Reports from "./routes/Reports";
import Management from "./routes/Management";
import Sidebar from "./components/Sidebar";
import "./App.css";

const AppLayout = () => (
  <>
    <Outlet />
  </>
);

 const router = createBrowserRouter(
   createRoutesFromElements(
     <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/room_booking" element={<RoomBooking />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/management" element={<Management />} />
     </Route>
   )
 );

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);