import React, { useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';

const Report = () => {
    const [selectedReport, setSelectedReport] = useState('Revenue Report');
    const [bookingList, setBookingList] = useState([]);

    // Hardcoded data for testing purposes
    const revenueData = [
        { bookingNumber: 1, clientName: 'John Doe', roomCharges: 100, additionalServices: 20, otherIncomeStreams: 10, totalRevenue: 130 },
        { bookingNumber: 2, clientName: 'Jane Doe', roomCharges: 120, additionalServices: 30, otherIncomeStreams: 15, totalRevenue: 165 },
        { bookingNumber: 3, clientName: 'Bob Smith', roomCharges: 150, additionalServices: 25, otherIncomeStreams: 12, totalRevenue: 187 },
    ];

    const guestTrendData = [
        { roomType: 'Single', averageLengthOfStay: 3, commonBookingChannel: 'Website', percentageOfRepeatGuests: '30%' },
        { roomType: 'Double', averageLengthOfStay: 2.5, commonBookingChannel: 'Online Travel Agency', percentageOfRepeatGuests: '25%' },
        { roomType: 'Suite', averageLengthOfStay: 4, commonBookingChannel: 'Phone', percentageOfRepeatGuests: '40%' },
    ];

    const occupancyAnalysisData = [
        { date: '2024-03-10', occupancyRate: '75%' },
        { date: '2024-03-11', occupancyRate: '80%' },
        { date: '2024-03-12', occupancyRate: '85%' },
    ];

    const handleReportSelection = (reportType) => {
        setSelectedReport(reportType);
    };

    return (
        <div style={{ width: '100%', padding: '20px' }}>
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
                                <th>Client Name</th>
                                <th>Room Charges</th>
                                <th>Additional Services</th>
                                <th>Other Income Streams</th>
                                <th>Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {revenueData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.bookingNumber}</td>
                                    <td>{data.clientName}</td>
                                    <td>{data.roomCharges}</td>
                                    <td>{data.additionalServices}</td>
                                    <td>{data.otherIncomeStreams}</td>
                                    <td>{data.totalRevenue}</td>
                                </tr>
                            ))}
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
                                <th>Common Booking Channel</th>
                                <th>Percentage of Repeat Guests</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guestTrendData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.roomType}</td>
                                    <td>{data.averageLengthOfStay}</td>
                                    <td>{data.commonBookingChannel}</td>
                                    <td>{data.percentageOfRepeatGuests}</td>
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
                                <th>Date</th>
                                <th>Occupancy Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {occupancyAnalysisData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.date}</td>
                                    <td>{data.occupancyRate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}
        </div>
    );
};

export default Report;
