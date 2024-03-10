import React, { useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import supabase from "../config/supabaseClient";

const Report = () => {
    const [selectedReport, setSelectedReport] = useState('Revenue Report');

    const handleReportSelection = (reportType) => {
        setSelectedReport(reportType);
    };

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Button
                    variant={selectedReport === 'Revenue Report' ? "dark" : "light"}
                    style={{ flex: 1, marginRight: '10px', background: selectedReport === 'Revenue Report' ? '#665651' : '#D0C8B6', color: selectedReport === 'Revenue Report' ? 'white' : '#665651' }}
                    onClick={() => handleReportSelection('Revenue Report')}
                >
                    Revenue Report
                </Button>
                <Button
                    variant={selectedReport === 'Guest Trend Report' ? "dark" : "light"}
                    style={{ flex: 1, marginRight: '10px', background: selectedReport === 'Guest Trend Report' ? '#665651' : '#D0C8B6', color: selectedReport === 'Guest Trend Report' ? 'white' : '#665651' }}
                    onClick={() => handleReportSelection('Guest Trend Report')}
                >
                    Guest Trend Report
                </Button>
                <Button
                    variant={selectedReport === 'Occupancy Analysis' ? "dark" : "light"}
                    style={{ flex: 1, background: selectedReport === 'Occupancy Analysis' ? '#665651' : '#D0C8B6', color: selectedReport === 'Occupancy Analysis' ? 'white' : '#665651' }}
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
                            {/* Render revenue report data here */}
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
                            {/* Render guest trend report data here */}
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
                            {/* Render occupancy analysis data here */}
                        </tbody>
                    </Table>
                </Card>
            )}
        </div>
    );
};

export default Report;
