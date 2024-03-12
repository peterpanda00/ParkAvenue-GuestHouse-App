import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup,Modal } from 'react-bootstrap';
import BookingForm from "./BookingForm"
import '../index.css';
import supabase from '../config/supabaseClient';

const OrderForm = ({itemList,itemListTotals}) => {

    const [validated, setValidated] = useState(false);
    const [fetchError,setFetchError] = useState(null)
    const [foodList,setFoodList] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);

    const [bookingList,setBookingList] = useState([])

    useEffect(() => {
        console.log(supabase)
      
          fetchBookings();
          console.log(bookingList);
    
      }, []);
    
 
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
    
            }
      
            if (data) {
              // Filter data for 'Confirmed' status and 'Active' BookingStatus
              const filteredData = data.filter(
                (booking) => 
                  booking.BookingStatus === 'Staying'
              );
              setBookingList(filteredData);
              setFetchError(null);
         
            }
          } catch (error) {
            console.error(error);
          } 
        };

    
        const handleSubmit = async (event) => {
            event.preventDefault();
            console.log(itemList)
            console.log(selectedRoomNumber)
        
            try {
          
              const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .insert([
                  {
                    OrderDate: new Date().toISOString(),
                  },
                ])
                .select();
        
              if (ordersError) {
                throw ordersError;
              }
        
              const orderID = ordersData[0].OrderID; 
              console.log(orderID)
        
       
              const { data: orderProductsData, error: orderProductsError } = await supabase
                .from('order_products')
                .insert(
                  itemList.map((item) => ({
                    RoomBookingID: selectedRoomNumber,
                    OrderID: orderID,
                    ProductID: item.ProductID,
                    Quantity: item.quantity,
                  }))
                );
        
              if (orderProductsError) {
                throw orderProductsError;
              }
        
              setModalMessage('Ordered Successfully');
              setShowModal(true);
        
              setTimeout(() => {
                setShowModal(false);
                setModalMessage('');
                window.location.reload();
              }, 5000);
            } catch (error) {
              setFetchError(error.message || 'An error occurred while processing your order.');
              setModalMessage('Error processing your order');
              setShowModal(true);
            }
          };
        
      
      


    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Refresh the page after closing the modal
        window.location.reload();
      };
    
    const handleCheckboxChange = (roomNumber) => {
        setSelectedRoomNumber(roomNumber);
      };




    return (
        <>
       
            <>
                            {/*Order Summary*/}
                            <Col lg="12" style={{ transition: 'all 0.2s ease' }}>
                                <div className="mt-3" style={{ padding: '6px', borderRadius: '10px', background: 'white', color: '#665651', textAlign: 'center', fontSize: "30px" }}>
                                    <strong>Order Summary </strong>
                                </div>

                                <div style={{ marginTop: '6px', overflowY: 'auto', overflowX: 'hidden', overflowY: 'hidden' }}>

                                    <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: '#014c91' }}>
                                        <CardBody>
                                            <Form validated={validated} onSubmit={handleSubmit}>
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ color: '#665651', width: '10%' }}>Quantity</th>
                                                            <th style={{ color: '#665651' }}>Name</th>
                                                            <th style={{ color: '#665651' }}>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {itemList.map((item, index) => (
                                                            <tr key={index} style={{ borderRadius: '20px', padding: '10px' }}>
                                                                <td style={{ color: '#665651' }}>{item.quantity}</td>
                                                                <td style={{ color: '#665651' }}>{item.ItemName}</td>
                                                                <td style={{ color: '#665651' }}>
                                                                    ₱ {formatNumber(item.ItemPrice)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>

                                                {/*Total*/}
                                                <div style={{ padding: '10px', borderRadius: '10px', marginTop: '20px', background: '#F2EFEB', color: '#665651' }}>
                                                    <Row >
                                                        <Col lg="3">
                                                            Subtotal
                                                        </Col>
                                                        <Col lg="3">
                                                            ₱ {formatNumber(itemListTotals.subtotal)}
                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col lg="3">
                                                            Total Discount
                                                        </Col>
                                                        <Col lg="3">
                                                            (₱ {formatNumber(itemListTotals.totalDisc)})

                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-2" >
                                                        <Col lg="3">
                                                            <strong> Total </strong>
                                                        </Col>
                                                        <Col lg="3">
                                                            <strong>₱ {formatNumber(itemListTotals.total)} </strong>
                                                        </Col>
                                                    </Row>
                                                </div>

                                                <div className="mt-3" style={{ padding: '6px', borderRadius: '10px', background: 'white', color: '#665651', textAlign: 'center', fontSize: "30px" }}>
                                                    <strong>Select Room</strong>
                                                </div>

                                                <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                                                <CardBody>
                                                    <Table>
                                                        <thead>
                                                            <tr>
                                                                <th style={{color: '#665651'}}>Booking #</th>
                                                                <th style={{color: '#665651'}}>Client Name</th>
                                                                <th style={{color: '#665651'}}>Room Number</th>
                                                                <th style={{color: '#665651'}}></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {bookingList.map((room_booking, index) => (
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
                                                                        <input
                                                                        type="checkbox"
                                                                        checked={selectedRoomNumber === room_booking.RoomBookingID}
                                                                        onChange={() => handleCheckboxChange(room_booking.RoomBookingID)}
                                                                        />
                                                                        </td>
                                                                      
                                                                    </tr>
                                                                </React.Fragment>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </CardBody>
                                            </Card>


                                                <Row className="mt-4">
                                                    <Col lg="12" className="d-flex justify-content-center">
                                                        <button className="btn" style={{ color: "white", backgroundColor: "#665651" }}>
                                                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Place Order
                                                        </button>
                                                    </Col>
                                                </Row>

                                                

                                            </Form>
                                        </CardBody>
                                    </Card>

                                </div>
                            </Col>

                            
                        </>
                
     

            <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Restaurant Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{modalMessage}</p>
            </Modal.Body>
            </Modal>
        </>
    );
};

export default OrderForm;