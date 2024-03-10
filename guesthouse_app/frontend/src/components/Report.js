import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
// import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
// import { Row, Col, Form, CardBody, Card, Table, InputGroup } from 'react-bootstrap';
import BookingForm from "./BookingForm"
import '../index.css';

// From room booking
import RoomSelection from '../components/RoomSelectionList';
import '../App.css';
import Sidebar from '../components/Sidebar';
import { FaEllipsisH,FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup, Button, Dropdown} from 'react-bootstrap';
// import BookingForm from "../components/BookingForm";
import supabase from "../config/supabaseClient";

const RestaurantFoodList = ({ foodList, onOfferSubmission }) => {
    const [itemList, setItemList] = useState([]);
    const [itemListTotals, setItemListTotals] = useState([]);
    const [validated, setValidated] = useState(false);

    // From room booking
    const [hasItems, setHasItems] = useState(true);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [fetchError,setFetchError] = useState(null)
    const [bookingList,setBookingList] = useState([])
    const [bookingCount, setBookingCount] = useState(0);
    const [filterValue, setFilterValue] = useState("");

    const handleItemListChange = (event, index, property) => {
        const { value } = event.target;

        setItemList(prevItemList => {
            const updatedItemList = [...prevItemList];
            updatedItemList[index][property] = value;
            return updatedItemList;
        });
    };

    const handleRemoveFromItemList = (index) => {
        setItemList(prevItemList => {
            const updatedItemList = [...prevItemList];
            updatedItemList.splice(index, 1); // Remove the item at the specified index
            return updatedItemList;
        });
    };

    const handleAddToItemList = (room) => {
        const newItem = {
            ...room,
            quantity: 1,
            discPrice: room.price // Set discPrice to be the same as price initially
        };
        setItemList(prevItemList => [...prevItemList, newItem]);
    };

    const calculateTotals = () => {
        let subtotal = 0;
        let total = 0;
        let totalDisc = 0;

        itemList.forEach(item => {
            subtotal += parseFloat(item.price) * item.quantity;
            total += parseFloat(item.discPrice) * item.quantity;
        });

        totalDisc = total - subtotal;

        setItemListTotals({
            subtotal: subtotal,
            total: total,
            totalDisc: totalDisc
        });
    };

    // useEffect(() => {
    //     calculateTotals();
    // }, [itemList]);

    // const formatNumber = (number) => {
    //     return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // };
    
    // From room booking
    useEffect(() => {
        console.log(supabase)
    
        const fetchBookings = async () => {
          try {
            const { data, error } = await supabase
              .from('bookings')
              .select(
                `
                  *,
                  guests:guests("GuestID ", FirstName, LastName)
                `
              );
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
      
          fetchBookings();
          console.log(bookingList)
          console.log(filteredbookingList)
      }, []);

      const filteredbookingList = bookingList.filter((booking) => {
        // Customize this condition based on your filtering criteria
        return filterValue === "" || booking.GuestID === filterValue;
      });
    
      const handleReserveRoom = () => {
        // Set the state to show the BookingForm when the button is clicked
        setShowBookingForm(true);
      };
    
      const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    
      const [selectionType, setSelectionType] = useState('room'); // Default to room selection
    
      const handleOfferSubmission = () => {
        setSelectionType('client');
      };
    
    
      const [activeDropdown, setActiveDropdown] = useState(null);
    
        const handleEllipsisClick = (index) => {
            setActiveDropdown(index === activeDropdown ? null : index);
          };
    
          const renderDropdown = (index) => {
            if (index === activeDropdown) {
              return (
                <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
                  <Dropdown.Item>Confirm Booking</Dropdown.Item>
                  <Dropdown.Item>Cancel Booking</Dropdown.Item>
                </Dropdown.Menu>
              );
            }
            return null;
          };

    return (
        <div style = {{ width: '100%'}}>
            <Row className="justify-content-center">
                {foodList.slice(0, 3).map((room, index) => (
                    <Col className="mt-3" lg="4" key={index}>
                        <Card style={{ height: '200px', width: '200px', cursor: 'pointer', padding: '10px', background: '#665651', color: 'white' }} onClick={() => handleAddToItemList(room)}>
                            <div style={{ width: '100%', height: '100%', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Card.Title style={{ textAlign: 'center', marginBottom: '10px', position: 'relative', zIndex: 2 }}>{room.name}</Card.Title>
                                <Card.Text style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>{room.type}</Card.Text>
                            </div>
                            {/* <img src={room.imageUrl} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} alt={room.name} /> */}
                        </Card>
                    </Col>
                ))}
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
                                <th style={{color: '#665651'}}>Status</th>
                                <th style={{color: '#665651'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingList.map((booking, index) => (
                                <React.Fragment key={booking.BookingID}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#665651'}}>{booking.BookingID}</td>
                                        <td style={{ color: '#665651' }}>
                                        {booking.guests
                                          ? `${booking.guests.FirstName} ${booking.guests.LastName}`
                                          : 'N/A'}
                                      </td>
                                        <td style={{color: '#665651'}}>{booking.RoomNumber}</td>
                                        <td style={{ color: '#665651' }}>
                                          {booking.CheckIn ? new Date(booking.CheckIn).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={{ color: '#665651' }}>
                                          {booking.CheckOut ? new Date(booking.CheckOut).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={{color: '#665651'}}>{booking.Status}</td>
                                        <td style={{ color: '#665651' }}>
                                        <div style={{ position: 'relative' }}>
                        <div style={{cursor: 'pointer'}} onClick={() => handleEllipsisClick(index)}>
                          <FaEllipsisH size={20} />
                        </div>
                        <Dropdown show={index === activeDropdown} align="start">
              
                          {renderDropdown(index)}
                        </Dropdown>
                      </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>                     
    );
};

export default RestaurantFoodList;