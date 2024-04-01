import  React, { useEffect,useState } from 'react';
import { Col, Row, Form, Button, Card,Table,CardBody,InputGroup,FormControl,Modal,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap';
import { FaEllipsisH, FaSave, FaEye, FaEyeSlash, FaTrash, FaCheck} from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";

import ReactDOM from 'react-dom';
import  FinalBilling  from './FinalBilling'; 
import { PDFDownloadLink } from '@react-pdf/renderer';

import supabase from "../config/supabaseClient";


const CheckOutForm = ({ RoomNumber }) => {
 
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(true); 
  const [fetchError,setFetchError] = useState(null)
  const [chargeList,setChargeList] = useState([])
  const [itemList, setItemList] = useState([]);
  const [itemListTotals, setItemListTotals] = useState([]);
  const [room_bookings, setBookingInfo] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const [selectedMethod, setSelectedMethod] = useState('Select Payment Method');

  const paymentMethods = ['Cash', 'GCash', 'Debit/Credit Card', 'Cheque'];

 

  useEffect(() => {
    const fetchCharges = async () => {
        try {
            // Fetch room charges including guest details
            const { data: roomData, error: roomDataError } = await supabase
                .from('rooms_bookings')
                .select('*, bookings(*,guests(*)), rooms(RoomType,Price,AddPrice,GuestCapacity)')
                .eq('RoomNumber', RoomNumber)
                .eq('BookingStatus', 'Staying');

            if (roomData) {
                console.log(roomData);
                setBookingInfo(roomData);

                // Fetch orders associated with the room booking
                const { data: orderData, error: orderDataError } = await supabase
                    .from('order_products')
                    .select('*, orders(OrderDate),food_items(*)')
                    .eq('RoomBookingID', roomData[0]?.RoomBookingID);

                if (orderData) {
                    console.log(orderData);

                    

                    // Combine room charges and orders into chargeList
                    const combinedCharges = [];

                    const charge = roomData[0];
                    if (charge && charge.bookings && charge.rooms) {
                        combinedCharges.push({
                            Date: charge.bookings.CreatedAt,
                            Description: charge.rooms.RoomType,
                            Quantity: charge.bookings.Nights,
                            Price: charge.rooms.Price,
                            Cost: charge.bookings.Nights*charge.rooms.Price
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
                            Description: charge.food_items.ItemName, // Assuming ItemName represents the description of the ordered item
                            Quantity: charge.Quantity,
                            Price: charge.food_items.ItemPrice,
                            Cost: (charge.food_items.ItemPrice * charge.Quantity) // Calculate the total cost for the ordered item
                        });
                    });

                    setChargeList(combinedCharges);
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

    fetchCharges();
}, [RoomNumber]);


useEffect(() => {
    console.log(room_bookings);
}, [room_bookings]);

  

  
  // Log roomList whenever it changes
  useEffect(() => {
    console.log(chargeList);
  }, [chargeList]);
  
const formatNumber = (number) => {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Function to calculate totals
const calculateTotals = () => {
    let subtotal = 0;
    let total = 0;
    let totalDisc = 0;

    // Calculate subtotal and total
    itemList.forEach(item => {
        subtotal += parseFloat(item.ItemPrice) * item.quantity;
        total += parseFloat(item.discPrice) * item.quantity;
    });

    // Calculate total discount
    totalDisc = total - subtotal;

    // Update itemListTotals state
    setItemListTotals({
        subtotal: subtotal,
        total: total,
        totalDisc: totalDisc
    });
};

const totalCost = chargeList.reduce((total, charge) => total + charge.Cost, 0);

const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setDropdownOpen(false); // Close the dropdown after selection
  }

  
const handleCheckOutRoom = async (roomNumber, RoomBookingID) => {
    try {
      // Update the 'Availability' column to 'FALSE' in the rooms table
      const roomUpdateResult = await supabase
        .from('rooms')
        .update({ Availability: true })
        .eq('RoomNumber', roomNumber);
  
      if (roomUpdateResult.error) {
        console.error('Error updating room availability:', roomUpdateResult.error);
        setModalMessage('Error checking out booking.');
        setShowModal(true);
        return;
      }
  
      console.log('Room availability updated successfully');
  
      // Update the 'BookingStatus' column to 'Completed' in the room_bookings table
      const bookingUpdateResult = await supabase
        .from('rooms_bookings')
        .update({ BookingStatus: 'Completed' })
        .eq('RoomBookingID', RoomBookingID);
  
      if (bookingUpdateResult.error) {
        console.error('Error updating booking status:', bookingUpdateResult.error);
        setModalMessage('Error checking in booking.');
      } else {
        console.log('Booking status updated successfully');
        setModalMessage('Guest successfully checked-out.');
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

  const invoiceInfo = room_bookings.length > 0 ? {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: room_bookings[0].RoomBookingID,
    company: room_bookings[0].bookings.guests.FirstName + ' ' + room_bookings[0].bookings.guests.LastName,
    email: room_bookings[0].bookings.guests.Email,
    phone: room_bookings[0].bookings.guests.Phone,
    trans_date: room_bookings[0].bookings.CheckOut,
    items: chargeList.map((charge, index) => ({
        sno: index + 1,
        desc: charge.Description,
        qty: charge.Quantity,
        rate: charge.Price,
    })),
} : null;

      

  return (
    <div style={{ width: '100%',maxHeight: '750px', padding: '30px', borderRadius: '10px', marginTop: '20px', background: '#665651', color: 'white', display: 'flex', flexDirection: 'column', overflowY: 'auto'  }}>

    {/* Guest Information */}
    <div style={{ margin: '20px' }}>
      <h3>Guest Information</h3>
      <div
        style={{
          height: '2px', // Adjust the height of the horizontal bar
          backgroundColor: 'white',
          margin: '10px 0', // Adjust the margin as needed
        }}
      ></div>

            <Row className="mb-2">
            <Col lg=""><strong>First Name</strong></Col>
            <Col lg="6">{room_bookings.length > 0 && room_bookings[0].bookings.guests.FirstName}</Col>
            </Row>
            <Row className="mb-2">
            <Col lg=""><strong>Last Name</strong></Col>
            <Col lg="6">{room_bookings.length > 0 && room_bookings[0].bookings.guests.LastName}</Col>
            </Row>
            <Row className="mb-2">
            <Col lg="6"><strong>Mobile Number</strong></Col>
            <Col lg="6">{room_bookings.length > 0 && room_bookings[0].bookings.guests.Phone}</Col>
            </Row>
            <Row className="mb-2">
            <Col lg="6"><strong>Email</strong></Col>
            <Col lg="6">{room_bookings.length > 0 && room_bookings[0].bookings.guests.Email}</Col>
            </Row>

    </div>

    {/* Booking Information */}
    <div
        style={{
          height: '2px', // Adjust the height of the horizontal bar
          backgroundColor: 'white',
          margin: '10px 0', // Adjust the margin as needed
        }}
      ></div>
    <div>
    <div style={{ margin: '20px' }}>
      <h3>Booking Information</h3>
      <div
        style={{
          height: '2px', // Adjust the height of the horizontal bar
          backgroundColor: 'white',
          margin: '10px 0', // Adjust the margin as needed
        }}
      ></div>
      <Row className="mb-2">
        <Col lg="6"><strong>Room Number</strong></Col>
        <Col lg="6">{room_bookings.length > 0 && room_bookings[0].RoomNumber}</Col></Row>

      <Row className="mb-2"><Col lg="6"><strong>Room Type</strong></Col>
        <Col lg="6">{room_bookings.length > 0 && room_bookings[0].rooms.RoomType}</Col></Row>
      
      <Row className="mb-2">
        <Col lg="6"><strong>Check-In</strong></Col>
        <Col lg="6">{room_bookings.length > 0 && room_bookings[0].bookings.CheckIn}</Col></Row>
      <Row className="mb-2">
        <Col lg="6"><strong>Check-Out</strong></Col>
        <Col lg="6">{room_bookings.length > 0 && room_bookings[0].bookings.CheckOut}</Col>
      </Row>
      <Row className="mb-2">
        <Col lg="6"><strong>Number of Guests</strong></Col>
        <Col lg="6">{room_bookings.length > 0 && room_bookings[0].bookings.NumGuests}</Col>
      </Row>
      <Row className="mb-2">
        <Col lg="6"><strong>Additional Guests</strong></Col>
        <Col lg="6">
            {room_bookings.length > 0 && 
            (room_bookings[0].bookings.NumGuests - room_bookings[0].rooms.GuestCapacity < 0
                ? 0
                : room_bookings[0].bookings.NumGuests - room_bookings[0].rooms.GuestCapacity)
            }
        </Col>
        </Row>
      <Row className="mb-2">
        <Col lg="6"><strong>Nights</strong></Col>
        <Col lg="6">{room_bookings.length > 0 && room_bookings[0].bookings.Nights}</Col>
      </Row>
      <Row className="mb-2">
        <Col lg="6"><strong>Payment Method</strong></Col>
        <Col lg="6">
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
            <DropdownToggle caret style={{ color: "#665651", backgroundColor: "white", borderColor: "white"}}>
              {selectedMethod}
            </DropdownToggle>
            <DropdownMenu style={{ color: "#665651", backgroundColor: "white" }}>
              {paymentMethods.map((method, index) => (
                <DropdownItem key={index} onClick={() => handleMethodSelect(method)}>{method}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      </div>
      <Row>
   
  
        
        <Card style={{ borderRadius: '20px', marginTop: '20px', maxHeight: '400px', overflowY: 'auto'}}>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th style={{ color: '#665651' }}>Date</th>
              <th style={{ color: '#665651' }}>Description</th>
              <th style={{ color: '#665651' }}>Quantity</th>
              <th style={{ color: '#665651' }}>Price Per Qty</th>
              <th style={{ color: '#665651' }}>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {chargeList.map((charge, index) => (
              <tr key={charge.TransactionID} style={{ borderRadius: '20px', padding: '5px' }}>
                <td style={{ color: '#665651' }}>{new Date(charge.Date).toLocaleDateString()}</td>
                <td style={{ color: '#665651' }}>{charge.Description}</td>
                <td style={{ color: '#665651' }}>{charge.Quantity}</td>
                <td style={{ color: '#665651' }}>₱ {formatNumber(charge.Price)}</td>
                <td style={{ color: '#665651' }}>₱ {formatNumber(charge.Cost)}</td>
              </tr>
            ))}
          </tbody>
           

        </Table>
        {/*Total*/}
        <Row className="mt-2" style={{ justifyContent:'flex-end'}}>
                <Col lg="2">
                <strong>Total </strong>
                </Col>
                <Col lg="3">
                    <strong>₱ {totalCost.toFixed(2)}</strong>
                </Col>
              
            </Row>
       
      </CardBody>
    </Card>
              
      </Row>
    

    </div>

    {/* Check-out Button */}
    <Row className="mt-4" style={{ display: 'flex', justifyContent: 'center'}}>
        <Col lg="5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop: '30px' }}>
            {invoiceInfo ? (
                <PDFDownloadLink document={<FinalBilling invoice={invoiceInfo}/>} fileName={`FinalBilling_${room_bookings[0].RoomBookingID}`} >
                    {({loading}) => (
                        loading ? 'Loading' : 
                        <button className="btn"
                            style={{ borderRadius:'10px',color: '#665651', backgroundColor: 'white', marginTop: '10px' }}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} 
                            Generate Final Billing 
                        </button>
                    )} 
                </PDFDownloadLink>
            ) : null}
        </Col>
        {selectedMethod!='Select Payment Method' && (
          <Col lg="5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
            <button className="btn" style={{ color: "#665651", backgroundColor: "white" }} onClick={() => handleCheckOutRoom(room_bookings[0].RoomNumber, room_bookings[0].RoomBookingID)}>
              <MdOutlineMeetingRoom size={18} style={{ marginRight: '5px' }} /> Continue Check-out
            </button>
          </Col>
       
      )}
    </Row>


  <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Room Check-out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalMessage}</p>
      </Modal.Body>
    </Modal>
    
</div>




  );
};

export default CheckOutForm;
