import React, { useState } from 'react';
import { Card, Table, Button, Row, Col, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';

const Report = () => {
    const [selectedReport, setSelectedReport] = useState('Revenue Report');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [bookingList, setBookingList] = useState([]);

    // Hardcoded data for testing purposes
    const revenueData = [
        { bookingNumber: 1, date: '2024-03-04', clientName: 'Jiliana Tan', roomCharges: 1000, additionalServices: 200, otherIncomeStreams: 100, totalRevenue: 1300 },
        { bookingNumber: 2, date: '2024-01-12', clientName: 'Jilliane Elloso', roomCharges: 1200, additionalServices: 300, otherIncomeStreams: 150, totalRevenue: 1650 },
        { bookingNumber: 3,  date: '2024-02-13', clientName: 'Taylor Swift', roomCharges: 1500, additionalServices: 250, otherIncomeStreams: 120, totalRevenue: 1870 },
    ];

    const guestTrendData = [
        { roomType: 'Single', averageLengthOfStay: 3, percentageOfRepeatGuests: 30 },
        { roomType: 'Double', averageLengthOfStay: 2.5, percentageOfRepeatGuests: 25 },
        { roomType: 'Suite', averageLengthOfStay: 4, percentageOfRepeatGuests: 40 },
    ];

    const occupancyAnalysisData = [
        { month: 'March', occupancyRate: '75%', peakPeriod: 'Yes', roomTypeOccupancy: '80%', cancellationRate: '10%', revenuePerRoom: '₱15000' },
        { month: 'April', occupancyRate: '55%', peakPeriod: 'No', roomTypeOccupancy: '45%', cancellationRate: '15%', revenuePerRoom: '₱9000' },
        { month: 'May', occupancyRate: '85%', peakPeriod: 'Yes', roomTypeOccupancy: '90%', cancellationRate: '12%', revenuePerRoom: '₱17000' },
    ];

    // Function to compute totals for revenue data
    const computeRevenueTotals = () => {
        let totalRoomCharges = 0;
        let totalAdditionalServices = 0;
        let totalOtherIncomeStreams = 0;
        let totalRevenue = 0;

        revenueData.forEach(data => {
            totalRoomCharges += data.roomCharges;
            totalAdditionalServices += data.additionalServices;
            totalOtherIncomeStreams += data.otherIncomeStreams;
            totalRevenue += data.totalRevenue;
        });

        return { totalRoomCharges, totalAdditionalServices, totalOtherIncomeStreams, totalRevenue };
    };

    // Render the totals row for Revenue Report
    const renderRevenueTotalsRow = () => {
        const totals = computeRevenueTotals();
        return (
            <tr>
                <td colSpan={3}><b>Total:</b></td>
                <td colSpan={1}><b>₱{totals.totalRoomCharges}</b></td>
                <td><b>₱{totals.totalAdditionalServices}</b></td>
                <td><b>₱{totals.totalOtherIncomeStreams}</b></td>
                <td><b>₱{totals.totalRevenue}</b></td>
            </tr>
        );
    };

    // Function to compute totals for occupancy analysis data
    const computeOccupancyAnalysisTotals = () => {
        let totalOccupancyRate = 0;
        let totalRevenuePerRoom = 0;

        occupancyAnalysisData.forEach(data => {
            // Assuming revenuePerRoom is a string containing the currency symbol and value
            const revenueValue = Number(data.revenuePerRoom.slice(1)); // Removing currency symbol and converting to number
            totalOccupancyRate += parseFloat(data.occupancyRate);
            totalRevenuePerRoom += revenueValue;
        });

        return { totalOccupancyRate: totalOccupancyRate.toFixed(2), totalRevenuePerRoom };
    };

    const handleReportSelection = (reportType) => {
        setSelectedReport(reportType);
    };

    const handleFilterSelection = (filterType) => {
        setSelectedFilter(filterType);
    };

    // Filter revenue data based on selected filter
    const filteredRevenueData = () => {
        if (selectedFilter === '') return revenueData;

        // Logic to filter data based on selected filter
        // You can implement filtering logic here based on selectedFilter
        return revenueData; // Placeholder, replace with actual filtered data
    };

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <Row>
                <Col lg="8" className="text-end">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "50%", display: "flex",
                                                                        backgroundColor: "#665651", borderRadius: "10px",
                                                                        overflow: "hidden"}}>
                        <div style={{backgroundColor: "#665651", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                <FaFilter size={20} />
                            </div>  
                        </div>
                        <select className="form-select" onChange={(e) => handleFilterSelection(e.target.value)}>
                            <option value="">All Bookings</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Button 
                    variant="first" 
                    style={{ 
                        flex: 1, 
                        marginRight: '10px',
                        background: selectedReport === 'Revenue Report' ? '#665651' : '#D0C8B6', 
                        color: selectedReport === 'Revenue Report' ? 'white' : 'black' 
                    }} 
                    onClick={() => handleReportSelection('Revenue Report')}
                >
                    Revenue Report
                </Button>
                <Button 
                    variant="second" 
                    style={{ 
                        flex: 1, 
                        marginRight: '10px',
                        background: selectedReport === 'Guest Trend Report' ? '#665651' : '#D0C8B6', 
                        color: selectedReport === 'Guest Trend Report' ? 'white' : 'black' 
                    }} 
                    onClick={() => handleReportSelection('Guest Trend Report')}
                >
                    Guest Trend Report
                </Button>
                <Button 
                    variant="third" 
                    style={{ 
                        flex: 1 ,
                        background: selectedReport === 'Occupancy Analysis' ? '#665651' : '#D0C8B6', 
                        color: selectedReport === 'Occupancy Analysis' ? 'white' : 'black'
                    }} 
                    onClick={() => handleReportSelection('Occupancy Analysis')}
                >
                    Occupancy Analysis
                </Button>
            </div>

            {selectedReport === 'Revenue Report' && (
                <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: 'black' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Booking #</th>
                                <th>Date</th>
                                <th>Client Name</th>
                                <th>Room Charges</th>
                                <th>Additional Services</th>
                                <th>Other Income Streams</th>
                                <th>Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRevenueData().map((data, index) => (
                                <tr key={index}>
                                    <td>{data.bookingNumber}</td>
                                    <td>{data.date}</td>
                                    <td>{data.clientName}</td>
                                    <td>₱{data.roomCharges}</td>
                                    <td>₱{data.additionalServices}</td>
                                    <td>₱{data.otherIncomeStreams}</td>
                                    <td>₱{data.totalRevenue}</td>
                                </tr>
                            ))}
                            {renderRevenueTotalsRow()}
                        </tbody>
                    </Table>
                </Card>
            )}

            {selectedReport === 'Guest Trend Report' && (
                <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: 'black' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Room Type</th>
                                <th>Average Length of Stay</th>
                                <th>Percentage of Repeat Guests</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guestTrendData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.roomType}</td>
                                    <td>{data.averageLengthOfStay}</td>
                                    <td>{data.percentageOfRepeatGuests}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}

            {selectedReport === 'Occupancy Analysis' && (
                <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: 'black' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Occupancy Rate</th>
                                <th>Peak Period</th>
                                <th>Room Occupancy Rate</th>
                                <th>Cancellation Rate</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {occupancyAnalysisData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.month}</td>
                                    <td>{data.occupancyRate}</td>
                                    <td>{data.peakPeriod}</td>
                                    <td>{data.roomTypeOccupancy}</td>
                                    <td>{data.cancellationRate}</td>
                                    <td>{data.revenuePerRoom}</td>
                                </tr>
                            ))}
                            {/* Render the total row */}
                            <tr>
                                <td colSpan={5}><b>Total Revenue:</b></td>                                

                                <td><b>₱{computeOccupancyAnalysisTotals().totalRevenuePerRoom}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            )}
        </div>
    );
};

export default Report;
