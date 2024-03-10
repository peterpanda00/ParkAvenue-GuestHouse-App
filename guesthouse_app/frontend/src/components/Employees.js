import React, { useState } from "react";
import { Card, Table, Button, FormControl, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import supabase from "../config/supabaseClient";

const Employees = () => {
  const [selectedReport, setSelectedReport] = useState("Revenue Report");
  const [searchQuery, setSearchQuery] = useState("");

  const handleReportSelection = (reportType) => {
    setSelectedReport(reportType);
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Col lg="4">
        <form>
          <div
            className="mb-2 mt-3 input-group"
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              overflow: "hidden"
            }}
          >
            <input type="search" className="form-control" placeholder="Search"/>
            <button className="btn me-auto" style={{color: "white", backgroundColor: "#665651"}}>
              <div style={{color: 'white'}}>
                {React.createElement(FaSearch, { size: 20 })}
              </div>
            </button>
          </div>
        </form>
      </Col>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Button
          variant={selectedReport === "Employee 1" ? "dark" : "light"}
          style={{
            flex: 1,
            marginRight: "5px",
            background: selectedReport === "Employee 1" ? "#665651" : "#D0C8B6",
            color: selectedReport === "Employee 1" ? "white" : "#665651",
          }}
          onClick={() => handleReportSelection("Employee 1")}
        >
          Employee 1
        </Button>
        <Button
          variant={selectedReport === "Employee 2" ? "dark" : "light"}
          style={{
            flex: 1,
            marginRight: "5px",
            background:
              selectedReport === "Employee 2" ? "#665651" : "#D0C8B6",
            color:
              selectedReport === "Employee 2" ? "white" : "#665651",
          }}
          onClick={() => handleReportSelection("Employee 2")}
        >
          Employee 2
        </Button>
        <Button
          variant={selectedReport === "Employee 3" ? "dark" : "light"}
          style={{
            flex: 1,
            marginRight: "5px",
            background:
              selectedReport === "Employee 3" ? "#665651" : "#D0C8B6",
            color:
              selectedReport === "Employee 3" ? "white" : "#665651",
          }}
          onClick={() => handleReportSelection("Employee 3")}
        >
          Employee 3
        </Button>
        <Button
          variant={selectedReport === "Employee 4" ? "dark" : "light"}
          style={{
            flex: 1,
            background:
              selectedReport === "Employee 4" ? "#665651" : "#D0C8B6",
            color:
              selectedReport === "Employee 4" ? "white" : "#665651",
          }}
          onClick={() => handleReportSelection("Employee 4")}
        >
          +
        </Button>
      </div>

      {selectedReport === "Employee 1" && (
        <Card style={{ borderRadius: "20px", marginTop: "20px", background: "white", color: "black", width: "50%", marginRight: "20px" }}>
        <Table striped bordered hover style={{ borderRadius: "10px" }}>
          <tbody>
            <tr>
              <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Name</th>
              <td>John Doe</td>
            </tr>
            <tr>
              <th style={{ backgroundColor: "#D0C8B6", color: "white" }}>Address</th>
              <td>123 Main St, City</td>
            </tr>
            <tr>
              <th style={{ backgroundColor: "#D0C8B6", color: "white" }}>Email</th>
              <td>john@example.com</td>
            </tr>
            <tr>
              <th style={{ backgroundColor: "#D0C8B6", color: "white", borderBottomLeftRadius: "10px" }}>Cellphone Number</th>
              <td>123-456-7890</td>
            </tr>
          </tbody>
        </Table>
      </Card>
      )}



      {selectedReport === "Employee 2" && (
        <Card style={{ borderRadius: "20px", marginTop: "20px", background: "white", color: "black" }}>
          <Table striped bordered hover>
            {/* Table content for Guest Trend Report */}
          </Table>
        </Card>
      )}

      {selectedReport === "Employee 3" && (
        <Card style={{ borderRadius: "20px", marginTop: "20px", background: "white", color: "black" }}>
          <Table striped bordered hover>
            {/* Table content for Occupancy Analysis */}
          </Table>
        </Card>
      )}
    </div>
  );
};

export default Employees;
