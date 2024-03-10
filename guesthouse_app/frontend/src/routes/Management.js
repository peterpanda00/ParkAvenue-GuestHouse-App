import React from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Report from "../components/Employees";

const Management = () => {
  // Sample data for different reports
  const reportList = [
    { name: "Revenue Report" },
    { name: "Guest Trend Report" },
    { name: "Occupancy Analysis" },
  ];

  return (
    <div
      style={{
        width: "100%",
        background: "white",
        color: "#014c91",
        display: "flex",
      }}
    >
      <Sidebar />
      <Report reportList={reportList} />
    </div>
  );
};

export default Management;
