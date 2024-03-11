import  React, { useEffect,useState } from 'react';
import { Col, Row, Form, Button, Card,Table,CardBody,InputGroup,FormControl,Modal, Dropdown} from 'react-bootstrap';
import { FaEllipsisH, FaSave, FaEye, FaEyeSlash, FaTrash, FaCheck} from 'react-icons/fa';
import { FaCalendarCheck } from "react-icons/fa6";

import supabase from "../config/supabaseClient";


const CheckInForm = () => {
    const [hasItems, setHasItems] = useState(true);
    const [validated, setValidated] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [fetchError,setFetchError] = useState(null)
    const [bookingList,setBookingList] = useState([])
    const [bookingCount, setBookingCount] = useState(0);
    const [filterValue, setFilterValue] = useState("");
    const [searchValue, setSearchValue] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


  

    useEffect(() => {
      console.log(supabase);
    
      const fetchBookings = async () => {
        try {
          const { data, error } = await supabase
            .from('rooms_bookings')
            .select(
              `
              *,
              bookings: BookingID(CheckIn, CheckOut, Status, guests:GuestID(FirstName, LastName), CreatedAt)
              `
            );
          if (error) {
            setFetchError('Could not fetch bookings');
            setBookingList([]);
            setBookingCount(0);
          }
    
          if (data) {
            // Filter data for 'Confirmed' status and 'Active' BookingStatus
            const filteredData = data.filter(
              (booking) => 
                booking.bookings.Status === 'Confirmed' &&
                booking.BookingStatus === 'Active' &&
                isToday(new Date(booking.bookings.CheckIn)) // Function to check if the 'CheckIn' date is today
            );
    
            setBookingList(filteredData);
            setFetchError(null);
            setBookingCount(filteredData.length);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Set loading to false when done fetching
        }
      };
    
      fetchBookings();
    }, []);


    // Function to check if a date is today
  function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
    
    
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleCheckInRoom = async (roomNumber, RoomBookingID) => {
    try {
      // Update the 'Availability' column to 'FALSE' in the rooms table
      const roomUpdateResult = await supabase
        .from('rooms')
        .update({ Availability: false })
        .eq('RoomNumber', roomNumber);
  
      if (roomUpdateResult.error) {
        console.error('Error updating room availability:', roomUpdateResult.error);
        setModalMessage('Error checking in booking.');
        setShowModal(true);
        return;
      }
  
      console.log('Room availability updated successfully');
  
      // Update the 'BookingStatus' column to 'Staying' in the room_bookings table
      const bookingUpdateResult = await supabase
        .from('rooms_bookings')
        .update({ BookingStatus: 'Staying' })
        .eq('RoomBookingID', RoomBookingID);
  
      if (bookingUpdateResult.error) {
        console.error('Error updating booking status:', bookingUpdateResult.error);
        setModalMessage('Error checking in booking.');
      } else {
        console.log('Booking status updated successfully');
        setModalMessage('Booking successfully checked-in.');
      }
  
      setShowModal(true);
      setTimeout(() => {
        window.location.reload();
      }, 5000); // Refresh after 3 seconds (adjust as needed)
  
      // Perform any other check-in related logic if needed
    } catch (error) {
      console.error(error);
    }
  };
  
  

 

  const handleCloseModal = () => {
    setShowModal(false);
    // Refresh the page after closing the modal
    window.location.reload();
  };

  

  return (
    <div style={{ width: '100%',maxHeight: '750px', padding: '10px', borderRadius: '10px', marginTop: '20px', background: '#665651', color: 'white', display: 'flex', flexDirection: 'column', overflowY: 'auto'  }}>
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
                                <th style={{color: '#665651'}}>Status</th>
                                <th style={{color: '#665651'}}>Date Booked</th>
                                <th style={{color: '#665651'}}></th>
                            </tr>
                        </thead>
                        <tbody>

                        {bookingList.length === 0 ? (
                            <tr>
                              <td colSpan="7" style={{ textAlign: 'center', color: '#665651' }}>
                                No Bookings Check-in for today
                              </td>
                            </tr>
                          ) : (
                            bookingList.map((room_booking, index) => (
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
                                        <td style={{color: '#665651'}}>{room_booking.bookings.Status}</td>
                                        <td style={{ color: '#665651' }}>
                                          {room_booking.bookings.CreatedAt? new Date(room_booking.bookings.CreatedAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={{ color: '#665651' }}>
                                        <div style={{ position: 'relative' }}>
                                        <button
                                          className="btn"
                                          style={{ color: 'white', backgroundColor: '#665651', marginTop: '10px' }}
                                          onClick={() => handleCheckInRoom(room_booking.RoomNumber, room_booking.RoomBookingID)}
                                        >
                                          <FaCalendarCheck />
                                        </button>
                        
                                      </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))
                          )}
                            
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Room Check-in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalMessage}</p>
      </Modal.Body>
    </Modal>
    
</div>




  );
};

export default CheckInForm;
