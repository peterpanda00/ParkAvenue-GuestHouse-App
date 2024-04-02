import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import '../index.css';
import RoomSelection from '../components/RoomSelectionList';
import '../App.css';
import Sidebar from '../components/Sidebar';
import { FaEllipsisH,FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup, Button, Dropdown} from 'react-bootstrap';
import BookingForm from "../components/BookingForm";
import supabase from "../config/supabaseClient";

const RoomBooking= () => {
  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [fetchError,setFetchError] = useState(null)
  const [bookingList,setBookingList] = useState([])
  const [bookingCount, setBookingCount] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [bookingFilterValue, setBookingFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;

  


  useEffect(() => {
    console.log(supabase)
  
    fetchBookings(currentPage);
      console.log(bookingList);
      console.log(filteredbookingList);

    }, [currentPage]);

  const fetchBookings = async (pageNumber) => {
    const startIndex = (pageNumber - 1) * bookingsPerPage;
    const endIndex = pageNumber * bookingsPerPage - 1;
    
    try {
      const { data, error } = await supabase
        .from('rooms_bookings')
        .select(
          `
          *,
          bookings: BookingID(CheckIn,CheckOut,Status,guests:GuestID(FirstName,LastName),CreatedAt)
          `
        )
        .range(startIndex, endIndex);
  
      if (error) {
        setFetchError('Could not fetch bookings');
        setBookingList([]);
        setBookingCount(0);
      }
  
      if (data) {
        setBookingList(data);
        setFetchError(null);
        setBookingCount(data.length);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when done fetching
    }
  };
  


  const sortedBookingList = [...bookingList].sort((a, b) => {
    // Assuming booking.bookings.CreatedAt is a valid date string
    const dateA = new Date(a.bookings.CreatedAt);
    const dateB = new Date(b.bookings.CreatedAt);

    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const filteredbookingList = bookingList
    .filter((booking) => {
      // Customize this condition based on your filtering criteria
      return (
        (filterValue === '' || booking.bookings.Status === filterValue) &&
        (searchValue === '' ||
          booking.bookings.guests.FirstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          booking.bookings.guests.LastName.toLowerCase().includes(searchValue.toLowerCase())
        
        )
      );
    })
    .filter((booking) => {
      // Customize this condition based on your filtering criteria
      return (
        (bookingFilterValue === '' || booking.BookingStatus === bookingFilterValue) &&
        (searchValue === '' ||
          booking.bookings.guests.FirstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          booking.bookings.guests.LastName.toLowerCase().includes(searchValue.toLowerCase())
        
        )
      );
    })
    .sort((a, b) => {
      // Customize this sorting logic based on your requirements
      const dateA = new Date(a.bookings.CreatedAt);
      const dateB = new Date(b.bookings.CreatedAt);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });


  const handleReserveRoom = () => {
    // Set the state to show the BookingForm when the button is clicked
    setShowBookingForm(true);
  };


  const [selectionType, setSelectionType] = useState('room'); // Default to room selection

  const handleOfferSubmission = () => {
    setSelectionType('client');
  };


  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleEllipsisClick = (index) => {
    setActiveDropdown(index === activeDropdown ? null : index);
  };


  const handleDropdownItemClick = async (index, action) => {
    try {
      // Assuming you have the BookingID available in the room_booking object
      const bookingID = index;
  
      // Update 'room_bookings' based on the selected action
      if (action === 'Confirm') {
        await supabase
          .from('bookings')
          .update({ 'Status': 'Confirmed' })
          .eq('BookingID', bookingID);
      } else if (action === 'Cancel') {
        await supabase
          .from('bookings')
          .update({ 'Status': 'Cancelled' })
          .eq('BookingID', bookingID);
        await supabase
          .from('rooms_bookings')
          .update({ 'BookingStatus': 'Inactive' })
          .eq('BookingID', bookingID);
      }
  
      // Refresh the page after the status update
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const handleDeleteBooking = async (bookingID) => {
    console.log("Deleting booking with ID:", bookingID);
    try {
      // Delete the booking from the database based on the bookingID
      await supabase.from('rooms_bookings').delete().eq('RoomBookingID', bookingID);
      console.log('Deleted', bookingID);
      // Refresh the list of bookings after deletion
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
      

  // Render different font colors based on the status
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return '#FFC300';
    case 'Confirmed':
      return '#5F891A';
    case 'Cancelled':
      return '#B32F0C';
    default:
      return 'black'; // Default color if status is not recognized
  }
};

// Slice the list of bookings to display only the ones for the current page
const currentBookings = filteredbookingList.slice(indexOfFirstBooking, indexOfLastBooking);

// Calculate total pages
const totalPages = Math.ceil(filteredbookingList.length / bookingsPerPage);

useEffect(() => {
  const updateBookingStatus = async () => {
    try {
      // Get the current date
      const currentDate = new Date();

      // Iterate through each booking
      for (const booking of bookingList) {
        const checkOutDate = new Date(booking.bookings.CheckOut);

        // Compare the check-out date with the current date
        if ((checkOutDate < currentDate && booking.BookingStatus == 'Active') && (booking.bookings.BookingStatus == 'Confirmed' || booking.bookings.BookingStatus == 'Pending')) {
          // Update the booking status to "Inactive"
          await supabase
            .from('rooms_bookings')
            .update({ 'BookingStatus': 'Inactive' })
            .eq('RoomBookingID', booking.RoomBookingID);
        }
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Call the function to update booking status
  updateBookingStatus();
}, [bookingList]);




  return (
    
    <div style={{ width: '100%', background: 'white', color: '#665651', display:'flex'}}>
      
      
      <Sidebar/>

      <div style={{ width: '100%', padding: '20px', background: 'white', color: '#665651'}}>
            <h1>Manage Bookings</h1>
            <h5>Manage all bookings</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            {/*Navigation Forms*/ }
            <Row>
                {/*Search Bar*/ }
                <Col lg="4">
                    <form>
                        <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", borderRadius: "10px", 
                                                                        overflow: "hidden"}} >
                            <input type="search" className="form-control" placeholder="Search Guest Name" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                            <button className="btn me-auto" style={{color: "white", backgroundColor: "#665651"}}>
                                <div style={{color: 'white'}}>
                                    {React.createElement(FaSearch, { size: 20 })}
                                </div>
                            </button>
                        </div>
                    </form>
                </Col>
                {/*Sorting Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                    backgroundColor: "#665651", borderRadius: "10px", 
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#665651", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaSort, { size: 20 })}
                            </div>
                        </div>
                        <select className="form-select" value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="asc">Sort by Date Booked (Oldest to Newest)</option>
                            <option value="desc">Sort by Date Booked (Newest to Oldest)</option>
                        </select>
                    </div>
                </Col>
                {/*Filtering Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#665651", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#665651", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select" 
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}>
                            <option value="">All Bookings</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </Col>
                {/*Filtering Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#665651", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#665651", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select" 
                                value={bookingFilterValue}
                                onChange={(e) => setBookingFilterValue(e.target.value)}>
                            <option value="">All Bookings</option>
                            <option value="Active">Active</option>
                            <option value="Staying">Staying</option>
                            <option value="Completed">Completed</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </Col>
            </Row>

        
            {/*Table for page content*/}
            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#665651'}}>Booking #</th>
                                <th style={{color: '#665651'}}>Client Name</th>
                                <th style={{color: '#665651'}}>Room Number</th>
                                <th style={{color: '#665651'}}>Check-In Date</th>
                                <th style={{color: '#665651'}}>Check-Out Date</th>
                                <th style={{color: '#665651'}}>Reservation Status</th>
                                <th style={{color: '#665651'}}>Date Booked</th>
                                <th style={{color: '#665651'}}>Booking Status</th>
                                <th style={{color: '#665651'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredbookingList.map((room_booking, index) => (
                                <React.Fragment key={room_booking.RoomBookingID}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#665651'}}>{room_booking.RoomBookingID}</td>
                                        <td style={{ color: '#665651' }}>
                                        {room_booking.bookings.guests
                                          ? `${room_booking.bookings.guests.FirstName} ${room_booking.bookings.guests.LastName}`
                                          : 'N/A'}
                                      </td>
                                        <td style={{color: '#665651'}}>{room_booking.RoomNumber}</td>
                                        <td style={{ color: '#665651' }}>
                                          {room_booking.bookings.CheckIn ? new Date(room_booking.bookings.CheckIn).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={{ color: '#665651' }}>
                                          {room_booking.bookings.CheckOut ? new Date(room_booking.bookings.CheckOut).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={{ color: getStatusColor(room_booking.bookings.Status) }}>
                                        {room_booking.bookings.Status}
                                      </td>
                                        <td style={{ color: '#665651' }}>
                                          {room_booking.bookings.CreatedAt? new Date(room_booking.bookings.CreatedAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={{color: '#665651'}}>
                                        {room_booking.BookingStatus}
                                      </td>
                                        <td style={{ color: '#665651' }}>
                                        <div style={{ position: 'relative' }}>
                                        <div style={{ cursor: 'pointer' }} onClick={() => handleEllipsisClick(index)}>
                                          <FaEllipsisH size={20} />
                                        </div>
                                        <Dropdown show={index === activeDropdown} align="start">
                                          {index === activeDropdown && (
                                            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
                                              <Dropdown.Item onClick={() => handleDropdownItemClick(room_booking.BookingID, 'Confirm')}>
                                                Confirm Booking
                                              </Dropdown.Item>
                                              <Dropdown.Item onClick={() => handleDropdownItemClick(room_booking.BookingID, 'Cancel')}>
                                                Cancel Booking
                                              </Dropdown.Item>
                                            </Dropdown.Menu>
                                          )}
                                        </Dropdown>
                                      </div>
                                        </td>
                                        {/* Trash icon for deleting booking */}
                                      <td>
                                        <FaTrash
                                          style={{ cursor: 'pointer', color: '#665651' }}
                                          onClick={() => handleDeleteBooking(room_booking.RoomBookingID)}
                                        />
                                      </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                    <ul className="pagination" style={{justifyContent:'center'}}>
                    <li className={currentPage === 1 ? 'disabled' : ''}>
                      <button style={{ color: "#665651", borderRadius: '5px', backgroundColor: "white", borderColor: "transparent" }} onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                        <button style={{ color: "#665651", borderRadius: '5px', backgroundColor: "white", borderColor: "transparent" }} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                      </li>
                    ))}
                    <li className={currentPage === totalPages ? 'disabled' : ''}>
                      <button style={{ color: "#665651", borderRadius: '5px', backgroundColor: "white", borderColor: "transparent" }} onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>
                    </li>
                  </ul>

                </CardBody>
            </Card>

            {/* Button to Reserve Room */}
        <button
          className="btn"
          style={{ color: 'white', backgroundColor: '#665651', marginTop: '20px' }}
          onClick={handleReserveRoom}
        >
          + Add Booking
        </button>

        </div>

        {showBookingForm && 
        <div className="overlay-container">
          <div className="overlay-content">
            <div className="overlay-header" style={{  display: 'flex',justifyContent: 'space-between',padding: '6px', borderRadius: '10px', background: 'white', color: '#665651', textAlign: 'center', fontSize: '30px' }}>
              <strong>Booking Form</strong>
              <button
              className="btn"
              style={{ color: 'white', backgroundColor: '#665651', padding: '5px', borderRadius: '5px',alignSelf: 'flex-end', }}
              onClick={() => setShowBookingForm(false)} // Close button functionality
            >
              X
        </button>
            </div>
            <div className="overlay-body" style={{ marginTop: '6px', overflowY: 'auto', overflowX: 'hidden', overflowY: 'hidden' }}>
              <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: '#014c91' }}>
                <CardBody>
                  <div style={{ padding: '10px', borderRadius: '10px', marginTop: '20px', background: '#665651', color: 'white' }}>
                    <BookingForm />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      }
      
     

    </div>
  );
};

export default RoomBooking;

