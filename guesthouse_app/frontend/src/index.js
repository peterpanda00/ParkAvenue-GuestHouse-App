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
import Room_Booking from "./routes/Room_Booking";
import Restaurant from "./routes/Restaurant";
import Reports from "./routes/Reports";
import Management from "./routes/Management";
import Navbar from "./components/Navbar";
import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

 const router = createBrowserRouter(
   createRoutesFromElements(
     <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/room_booking" element={<Room_Booking />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/management" element={<Management />} />
     </Route>
   )
 );
/*
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);
*/
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
