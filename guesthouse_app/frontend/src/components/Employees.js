import React, { useState, useEffect, useRef } from "react";
import { Card, Table, Button, FormControl, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Chart from "chart.js/auto";
import supabase from "../config/supabaseClient";


const Employees = () => {
  const [selectedReport, setSelectedReport] = useState("Employee 1");
  const [searchQuery, setSearchQuery] = useState("");
  const chartRef = useRef(null); // Ref for the canvas element

  const handleReportSelection = (reportType) => {
    setSelectedReport(reportType);
  };

  useEffect(() => {
    // Create or update chart whenever selectedReport changes
    if (chartRef.current) {
      updateChart();
    }
  }, [selectedReport]);

  const updateChart = () => {
    const ctx = chartRef.current.getContext("2d");
    const chartData = {
      labels: ["Present", "Absent", "Late"],
      datasets: [{
        label: "Performance",
        data: [70, 10, 20], // Example data, replace with actual data
        backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
      }]
    };
  
    // Check if a chart instance exists and destroy it
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
  
    // Create a new chart instance
    chartRef.current.chart = new Chart(ctx, {
      type: "pie",
      data: chartData
    });
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
            background: selectedReport === "Employee 2" ? "#665651" : "#D0C8B6",
            color: selectedReport === "Employee 2" ? "white" : "#665651",
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
            background: selectedReport === "Employee 3" ? "#665651" : "#D0C8B6",
            color: selectedReport === "Employee 3" ? "white" : "#665651",
          }}
          onClick={() => handleReportSelection("Employee 3")}
        >
          Employee 3
        </Button>
      </div>

        {selectedReport === "Employee 1" && (
          <>
            <Card style={{ borderRadius: "20px", marginTop: "20px", background: "white", color: "black" }}>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <Table striped bordered hover style={{ borderRadius: "10px" }}>
                    <tbody>
                      <tr>
                        <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Name</th>
                        <td>Lorenzo De Luca</td>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Position</th>
                        <td>Chef</td>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Address</th>
                        <td>567 Willow Avenue Apt. 3B, Brookside Heights Apartments Pine Grove, Meadowville County Greenwood City, Sunshine State United States of America Postal Code: 12345-6789</td>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Email</th>
                        <td>lorenzo_de_luca@yahoo.com</td>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Contact Number</th>
                        <td>+63 912 123 4567</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div style={{ flex: 1 }}>
                  <canvas ref={chartRef} id="employeeChart" style={{ width: "100%", height: "200px" }}></canvas>
                </div>
              </div>
            </Card>
          </>
        )}


        {selectedReport === "Employee 2" && (
                  <>
                    <Card style={{ borderRadius: "20px", marginTop: "20px", background: "white", color: "black" }}>
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1, marginRight: "20px" }}>
                          <Table striped bordered hover style={{ borderRadius: "10px" }}>
                            <tbody>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Name</th>
                                <td>Lorenzo De Luca</td>
                              </tr>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Position</th>
                                <td>Chef</td>
                              </tr>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Address</th>
                                <td>567 Willow Avenue Apt. 3B, Brookside Heights Apartments Pine Grove, Meadowville County Greenwood City, Sunshine State United States of America Postal Code: 12345-6789</td>
                              </tr>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Email</th>
                                <td>lorenzo_de_luca@yahoo.com</td>
                              </tr>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Contact Number</th>
                                <td>+63 912 123 4567</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <div style={{ flex: 1 }}>
                          <canvas ref={chartRef} id="employeeChart" style={{ width: "100%", height: "200px" }}></canvas>
                        </div>
                      </div>
                    </Card>
                  </>
          )}

        {selectedReport === "Employee 3" && (
                  <>
                    <Card style={{ borderRadius: "20px", marginTop: "20px", background: "white", color: "black" }}>
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1, marginRight: "20px" }}>
                          <Table striped bordered hover style={{ borderRadius: "10px" }}>
                            <tbody>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Name</th>
                                <td>Lorenzo De Luca</td>
                              </tr>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Position</th>
                                <td>Chef</td>
                              </tr>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Address</th>
                                <td>567 Willow Avenue Apt. 3B, Brookside Heights Apartments Pine Grove, Meadowville County Greenwood City, Sunshine State United States of America Postal Code: 12345-6789</td>
                              </tr>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Email</th>
                                <td>lorenzo_de_luca@yahoo.com</td>
                              </tr>
                              <tr>
                                <th style={{ backgroundColor: "#D0C8B6", color: "white", borderTopLeftRadius: "10px" }}>Contact Number</th>
                                <td>+63 912 123 4567</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <div style={{ flex: 1 }}>
                          <canvas ref={chartRef} id="employeeChart" style={{ width: "100%", height: "200px" }}></canvas>
                        </div>
                      </div>
                    </Card>
                  </>
                )}

      {/* Other employee cards and charts */}
    </div>
  );
};

export default Employees;
