import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import supabase from "../config/supabaseClient";

const Report = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data, error } = await supabase
                    .from('bookings')
                    .select(`
                        *,
                        guests:guests("GuestID ", FirstName, LastName)
                    `);
                if (error) {
                    console.error('Could not fetch bookings:', error.message);
                    return;
                }

                if (data) {
                    setBookingList(data);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleReportSelection = (reportType) => {
        setSelectedReport(reportType);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="primary" onClick={() => handleReportSelection('Revenue Report')}>Revenue Report</Button>
                <Button variant="secondary" onClick={() => handleReportSelection('Guest Trend Report')}>Guest Trend Report</Button>
                <Button variant="success" onClick={() => handleReportSelection('Occupancy Analysis')}>Occupancy Analysis</Button>
            </div>

            {selectedReport === 'Revenue Report' && (
                <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
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
                            {bookingList.map((booking, index) => (
                                <tr key={index}>
                                    <td>{booking.BookingID}</td>
                                    <td>{booking.guests ? `${booking.guests.FirstName} ${booking.guests.LastName}` : 'N/A'}</td>
                                    <td>{booking.RoomCharges}</td>
                                    <td>{booking.AdditionalServices}</td>
                                    <td>{booking.OtherIncomeStreams}</td>
                                    <td>{booking.TotalRevenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}

            {selectedReport === 'Guest Trend Report' && (
                <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
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
                            {/* Populate the table with guest trend data */}
                            {/* You need to fetch and map the data from your backend */}
                            {/* For now, you can leave this part empty or with mock data */}
                        </tbody>
                    </Table>
                </Card>
            )}

            {selectedReport === 'Occupancy Analysis' && (
                <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                    <Table striped bordered hover>
                        {/* Insert Occupancy Analysis Table here */}
                    </Table>
                </Card>
            )}
        </div>
    );
};

export default Report;
