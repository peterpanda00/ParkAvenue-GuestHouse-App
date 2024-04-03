import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Row, Col, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import supabase from "../config/supabaseClient";

const Report = () => {
    const [selectedReport, setSelectedReport] = useState('Revenue Report');
    const [selectedFilter, setSelectedFilter] = useState('');

    const [fetchError,setFetchError] = useState(null)
    const [bookingList,setBookingList] = useState([])
    const [bookingCount, setBookingCount] = useState(0);
    const [paymentList,setPaymentList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [itemListTotals, setItemListTotals] = useState([]);
    const [room_bookings, setBookingInfo] = useState([]);
    const [payments, setPayments] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const [totalAmountPaid, setTotalAmountPaid] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('Select Payment Method');
    const [chargeList,setChargeList] = useState([]);

    const [revenueData,setRevenueData] = useState([]);
    const [guestTrendData, setGuestTrendData] = useState([]);
    const [occupancyAnalysisData, setOccupancyAnalysisData] = useState([]);

    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    


    
    const fetchCharges = async (RoomBookingID) => {
        try {
            // Fetch room charges including guest details
            const { data: roomData, error: roomDataError } = await supabase
                .from('rooms_bookings')
                .select('*, bookings(*,guests(*)), rooms(RoomType,Price,AddPrice,GuestCapacity)')
                .eq('RoomBookingID', RoomBookingID);
    
            if (roomData) {
                // Fetch orders associated with the room booking
                const { data: orderData, error: orderDataError } = await supabase
                    .from('order_products')
                    .select('*, orders(OrderDate),food_items(*)')
                    .eq('RoomBookingID', roomData[0]?.RoomBookingID);
    
                if (orderData) {
                    // Combine room charges and orders into chargeList
                    const combinedCharges = [];
    
                    const charge = roomData[0];
                    if (charge && charge.bookings && charge.rooms) {
                        combinedCharges.push({
                            Date: charge.bookings.CreatedAt,
                            Description: charge.rooms.RoomType,
                            Quantity: charge.bookings.Nights,
                            Price: charge.rooms.Price,
                            Cost: charge.bookings.Nights * charge.rooms.Price
                        });
    
                        const additionalGuests = charge.bookings.NumGuests - charge.rooms.GuestCapacity;
                        if (additionalGuests > 0) {
                            combinedCharges.push({
                                Date: charge.bookings.CreatedAt,
                                Description: 'Additional Guests',
                                Quantity: additionalGuests,
                                Price: charge.rooms.AddPrice,
                                Cost: charge.rooms.AddPrice * additionalGuests
                            });
                        }
                    }
    
                    // Add order charges
                    orderData.forEach(charge => {
                        combinedCharges.push({
                            Date: charge.orders.OrderDate,
                            Description: charge.food_items.ItemName,
                            Quantity: charge.Quantity,
                            Price: charge.food_items.ItemPrice,
                            Cost: charge.food_items.ItemPrice * charge.Quantity
                        });
                    });
    
                    // Compute total room charges
                    const totalRoomCharges = combinedCharges
                        .filter(current => (current.Description === charge.rooms.RoomType) || (current.Description === 'Additional Guests'))
                        .reduce((total, current) => total + current.Cost, 0);
    
                    // Compute total food charges
                    const totalFoodCharges = combinedCharges
                        .filter(current => current.Description !== charge.rooms.RoomType)
                        .reduce((total, current) => total + current.Cost, 0);
    
                    // Compute total revenue
                    const totalRevenue = totalRoomCharges + totalFoodCharges;
    
                    // Create revenue data object for this RoomBookingID
                    const revenueItem = {
                        bookingNumber: roomData[0]?.BookingID,
                        date: roomData[0]?.bookings.CreatedAt,
                        clientName: `${roomData[0]?.bookings?.guests?.FirstName} ${roomData[0]?.bookings?.guests?.LastName}`,
                        roomCharges: totalRoomCharges,
                        foodCharges: totalFoodCharges,
                        totalRevenue: totalRevenue
                    };
    
                    // Append revenue data for this RoomBookingID to the state
                    setRevenueData(prevData => [...prevData, revenueItem]);
                }
    
                if (orderDataError) {
                    console.error('Error fetching order data:', orderDataError);
                }
            }
    
            if (roomDataError) {
                console.error('Error fetching room charges:', roomDataError);
                return;
            }
    
        } catch (error) {
            console.error('Error fetching charges:', error);
        }
    };

    useEffect(() => {
        const fetchGuestTrendData = async () => {
            try {
                // Fetch room bookings data
                const { data: roomBookings, error: roomBookingsError } = await supabase
                    .from('rooms_bookings')
                    .select('*, bookings(*,guests(*)), rooms(RoomType,Price,AddPrice,GuestCapacity)')
                    .eq('BookingStatus', 'Completed');
                    
    
                if (roomBookings) {
                    // Aggregate data to calculate average length of stay and repeat guests for each room type
                    const roomTypeStats = roomBookings.reduce((acc, booking) => {
                        if (!acc[booking.rooms.RoomType]) {
                            acc[booking.rooms.RoomType] = {
                                totalNights: 0,
                                numBookings: 0,
                                uniqueGuestNames: new Set(), // Keep track of unique guest names
                                repeatGuests: 0,
                                totalCapacity:0,
                                totalGuests:0, // Counter for repeat guests
                            };
                        }
                        acc[booking.rooms.RoomType].totalNights += booking.bookings.Nights;
                        acc[booking.rooms.RoomType].numBookings++;
                        acc[booking.rooms.RoomType].uniqueGuestNames.add(`${booking.bookings.guests.FirstName} ${booking.bookings.guests.LastName}`); // Add guest name to set
                        acc[booking.rooms.RoomType].totalCapacity += booking.rooms.GuestCapacity; // Add room capacity to total
                        acc[booking.rooms.RoomType].totalGuests += booking.bookings.NumGuests; // Add number of guests to total
                        return acc;
                    }, {});
    
                    // Calculate average length of stay and percentage of repeat guests for each room type
                    const guestTrendData = Object.keys(roomTypeStats).map(roomType => {
                        const { totalNights, numBookings, uniqueGuestNames,totalGuests,totalCapacity} = roomTypeStats[roomType];
                        const averageLengthOfStay = totalNights / numBookings;
                        const repeatGuests = numBookings - uniqueGuestNames.size; // Calculate repeat guests
                        const percentageOfRepeatGuests = (repeatGuests / numBookings) * 100;
                        const roomTypeOccupancy = ((totalGuests / totalCapacity)/13) * 100; // Calculate room occupancy rate
               
                        return {
                            roomType,
                            averageLengthOfStay,
                            percentageOfRepeatGuests,
                            roomTypeOccupancy
                        };
                    });
    
                    setGuestTrendData(guestTrendData);
                }
    
                if (roomBookingsError) {
                    console.error('Error fetching room bookings:', roomBookingsError);
                }
            } catch (error) {
                console.error('Error fetching guest trend data:', error);
            }
        };
    
        fetchGuestTrendData();
    }, []);
    

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                // Fetch all completed bookings
                const { data, error } = await supabase
                    .from('rooms_bookings')
                    .select('RoomBookingID')
                    .eq('BookingStatus', 'Completed');

                if (data) {
                    for (const booking of data) {
                        await fetchCharges(booking.RoomBookingID);
                    }
                }

                if (error) {
                    console.error('Error fetching completed bookings:', error);
                }
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenueData();
    }, []);

    const fetchOccupancyAnalysisData = async () => {
        try {
            // Fetch room bookings data
            const { data: roomBookings, error: roomBookingsError } = await supabase
                .from('rooms_bookings')
                .select('*, bookings(*,guests(*)), rooms(RoomType,Price,AddPrice,GuestCapacity)')
                .or('BookingStatus.eq.Completed,BookingStatus.eq.Inactive');
                
            if (roomBookings) {
                // Aggregate data to calculate occupancy analysis metrics
                console.log(roomBookings)
                const occupancyAnalysis = {};

                roomBookings.forEach(booking => {
                    const { CreatedAt, NumGuests, RoomType, Nights } = booking.bookings;
                    const month = new Date(CreatedAt).toLocaleString('default', { month: 'long' });

                    if (!occupancyAnalysis[month]) {
                        occupancyAnalysis[month] = {
                            totalRooms: 0,
                            occupiedRooms: 0,
                            totalGuests: 0,
                            cancellations: 0,
                            revenue: 0,
                        };
                    }

                    occupancyAnalysis[month].totalRooms=13;
                    occupancyAnalysis[month].totalGuests += NumGuests;
                    occupancyAnalysis[month].GuestCapacity = booking.rooms.GuestCapacity;
    

                    if (booking.bookings.Status === "Cancelled") {
                        occupancyAnalysis[month].cancellations++;
                    }
                    
                    if (booking.BookingStatus === "Completed"){
                        occupancyAnalysis[month].occupiedRooms++;
                    }

                    
                });

                // Calculate occupancy rate, room occupancy rate, cancellation rate
                Object.keys(occupancyAnalysis).forEach(month => {
                    const data = occupancyAnalysis[month];
                    const occupancyRate = (data.occupiedRooms / data.totalRooms) * 100;
                    const cancellationRate = (data.cancellations / data.totalRooms) * 100;
                
                    let peakPeriod = 'No'; // Default value
                
                    // Check if occupancy rate is higher than or equal to 50%
                    if (occupancyRate >= 50) {
                        peakPeriod = 'Yes';
                    }
                
                    occupancyAnalysisData.push({
                        month,
                        occupancyRate: occupancyRate.toFixed(2) + '%',
                        peakPeriod,
                        cancellationRate: cancellationRate.toFixed(2) + '%',
                    });
                });

                setOccupancyAnalysisData(occupancyAnalysisData);
                
            }

            if (roomBookingsError) {
                console.error('Error fetching room bookings:', roomBookingsError);
            }
        } catch (error) {
            console.error('Error fetching occupancy analysis data:', error);
        }
    };

    useEffect(() => {
        fetchOccupancyAnalysisData();
    }, []);

    // Function to compute totals for occupancy analysis data
    const computeOccupancyAnalysisTotals = () => {
        let totalRevenuePerRoom = 0;

        occupancyAnalysisData.forEach(data => {
            totalRevenuePerRoom += parseFloat(data.revenue);
        });

        return { totalRevenuePerRoom };
    };

    

    // Function to compute totals for revenue data
    const computeRevenueTotals = () => {
        let totalRoomCharges = 0;
        let totalFoodCharges = 0;
        let totalRevenue = 0;

        revenueData.forEach(data => {
            totalRoomCharges += data.roomCharges;
            totalFoodCharges += data.foodCharges
            totalRevenue += data.totalRevenue;
        });

        return { totalRoomCharges, totalFoodCharges,totalRevenue };
    };

    // Render the totals row for Revenue Report
    const renderRevenueTotalsRow = () => {
        const totals = computeRevenueTotals();
        return (
            <tr>
                <td colSpan={3}><b>Total:</b></td>
                <td colSpan={1}><b>₱{formatNumber(totals.totalRoomCharges)}</b></td>
                <td><b>₱ {formatNumber(totals.totalFoodCharges)}</b></td>
                <td><b>₱ {formatNumber(totals.totalRevenue)}</b></td>
            </tr>
        );
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
                    {/*
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
                 */}
                    
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
                                <th>Food Charges</th>
                                <th>Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRevenueData().map((data, index) => (
                                <tr key={index}>
                                    <td>{data.bookingNumber}</td>
                                    <td>{new Date(data.date ).toLocaleDateString()}</td>
                                    <td>{data.clientName}</td>
                                    <td>₱ {formatNumber(data.roomCharges)}</td>
                                    <td>₱ {formatNumber(data.foodCharges)}</td>
                                    <td>₱ {formatNumber(data.totalRevenue)}</td>
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
                                <th>Room Occupancy Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guestTrendData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.roomType}</td>
                                    <td>{data.averageLengthOfStay.toFixed(0)} days</td>
                                    <td>{data.percentageOfRepeatGuests.toFixed(2)}%</td>
                                    <td>{data.roomTypeOccupancy.toFixed(2)}%</td>
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
                                <th>Peak Period</th>
                                <th>Occupancy Rate</th>
                                <th>Cancellation Rate</th>
                    
                            </tr>
                        </thead>
                        <tbody>
                            {occupancyAnalysisData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.month}</td>
                                    <td>{data.peakPeriod}</td>
                                    <td>{data.occupancyRate}</td>
                                    <td>{data.cancellationRate}</td>
            
                                </tr>
                            ))}
                            {/* Render the total row */}
                        </tbody>
                    </Table>
                </Card>
            )}
        </div>
    );
};

export default Report;
