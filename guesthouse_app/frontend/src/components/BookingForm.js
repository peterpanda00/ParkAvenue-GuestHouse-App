import  React, { useEffect,useState } from 'react';
import { Col, Row, Form, Button, Card,Table,CardBody,InputGroup,FormControl,Modal} from 'react-bootstrap';
import { FaEllipsisH, FaSave, FaEye, FaEyeSlash, FaTrash, FaCheck} from 'react-icons/fa';
import supabase from "../config/supabaseClient";


const BookingForm = () => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [fetchError,setFetchError] = useState(null)
  const [roomList,setRoomList] = useState([])
  const [roomCount, setRoomCount] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [numOfGuests, setNumOfGuests] = useState(1);

  const [formData, setFormData] = useState({
    guestName: '',
    mobileNumber: '',
    email: '',
    checkIn: '',
    checkOut: '',
    bookingChannel: '',
  });

  useEffect(() => {
    console.log(supabase)

    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select();
        if (error) {
          setFetchError('Could not fetch rooms');
          setRoomList([]);
          setRoomCount(0);
        }
  
        if (data) {
          setRoomList(data);
          setFetchError(null);
          setRoomCount(data.length);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when done fetching
      }
    };
  
      fetchRooms();
      console.log(roomList)
      console.log(filteredroomList)
  }, []);

 

  const handleCheckboxChange = (room) => {
    // Check if the room is already selected
    const isSelected = selectedRooms.includes(room);
    

    // Update the selectedRooms state based on the current state
    if (isSelected) {
      setSelectedRooms(selectedRooms.filter((selectedRoom) => selectedRoom !== room));
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
    
  };

  const filteredroomList = roomList.filter((room) => {
    // Customize this condition based on your filtering criteria
    return filterValue === "" || room.GuestID === filterValue;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Insert guest data
    const { data: guestData, error: guestError } = await supabase
      .from('guests')
      .insert([
        {
          FirstName: formData.FirstName,
          LastName: formData.LastName,
          Email: formData.email,
          Phone: formData.mobileNumber,
        },
      ])
      .select();
      
    if (guestError) {
      console.error('Error inserting guest data:', guestError);
      // Handle error appropriately
      return;
    }
    console.log('Guest data inserted:', guestData);

    const guestID = guestData[0].GuestID
    console.log(guestID)
    // Insert booking data
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          CheckIn: formData.checkIn,
          CheckOut: formData.checkOut,
          Status: "Pending",
          GuestID: guestID ,
          NumGuests: numOfGuests,
          BookingChannel: formData.bookingChannel,
        },
      ])
      .select();
  
    if (bookingError) {
      console.error('Error inserting booking data:', bookingError);
      // Handle error appropriately
      return;
    }

    console.log('Booking data inserted:', bookingData);
    const bookingID = bookingData[0].BookingID
    console.log(bookingID)
    console.log(selectedRooms)
  
    // Insert room_booking data

    selectedRooms.forEach(async (room) => {
      const { data: roomBookingData, error: roomBookingError } = await supabase
        .from('rooms_bookings')
        .insert([
          {
            RoomNumber: room.RoomNumber,
            BookingID: bookingID,
          },
        ])
        .select();
    
      // Handle errors or do something with roomBookingData if needed
      if (roomBookingError) {
        console.error('Error inserting room booking:', roomBookingError);
        setModalMessage('Error booking room. Check all fields');
      } else {
        console.log('Room booking successfully inserted:', roomBookingData);
        setModalMessage('Room successfully booked.');
      }
      setShowModal(true);
      setTimeout(() => {
        window.location.reload();
      }, 5000); // Refresh after 3 seconds (adjust as needed)
    });
    
  };
  

  const handleNumOfGuestsChange = (value) => {
    // Ensure the number of guests is within the range of 1 to 20
    const newValue = Math.min(Math.max(value, 1), 20);
    setNumOfGuests(newValue);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Refresh the page after closing the modal
    window.location.reload();
  };
  
      

  return (
    <div style={{ width: '100%',maxHeight: '750px', padding: '10px', borderRadius: '10px', marginTop: '20px', background: '#665651', color: 'white', display: 'flex', flexDirection: 'column', overflowY: 'auto'  }}>
  <Form onSubmit={handleSubmit}>

    {/* Guest Information */}
    <div style={{ marginBottom: '20px' }}>
    <div
        style={{
          height: '2px', // Adjust the height of the horizontal bar
          backgroundColor: 'white',
          margin: '10px 0', // Adjust the margin as needed
        }}
      ></div>
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
        <Col lg="6">
          <Form.Control
            type="text"
            placeholder="Enter guest name"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleInputChange}
            required
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg=""><strong>Last Name</strong></Col>
        <Col lg="6">
          <Form.Control
            type="text"
            placeholder="Enter guest name"
            name="LastName"
            value={formData.LastName}
            onChange={handleInputChange}
            required
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg="6"><strong>Mobile Number</strong></Col>
        <Col lg="6">
          <Form.Control
            type="tel"
            placeholder="Enter mobile number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg="6"><strong>Email</strong></Col>
        <Col lg="6">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Col>
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
      <h3>Booking Information</h3>
      <div
        style={{
          height: '2px', // Adjust the height of the horizontal bar
          backgroundColor: 'white',
          margin: '10px 0', // Adjust the margin as needed
        }}
      ></div>
      <Row className="mb-2">
        <Col lg="6"><strong>Check-In</strong></Col>
        <Col lg="6">
          <Form.Control
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleInputChange}
            required
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg="6"><strong>Check-Out</strong></Col>
        <Col lg="6">
          <Form.Control
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleInputChange}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6"><strong>Select Available Rooms</strong></Col>
        
        <Card style={{ borderRadius: '20px', marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th style={{ color: '#665651' }}>Room Number</th>
              <th style={{ color: '#665651' }}>Room type</th>
              <th style={{ color: '#665651' }}>Guest Capacity</th>
              <th style={{ color: '#665651' }}>Price</th>
              <th style={{ color: '#665651' }}>Additional Price</th>
              <th style={{ color: '#665651' }}>Select Room</th>
            </tr>
          </thead>
          <tbody>
            {roomList.map((room, index) => (
              <tr key={room.RoomNumber} style={{ borderRadius: '20px', padding: '10px' }}>
                <td style={{ color: '#665651' }}>{room.RoomNumber}</td>
                <td style={{ color: '#665651' }}>{room.RoomType}</td>
                <td style={{ color: '#665651' }}>{room.GuestCapacity}</td>
                <td style={{ color: '#665651' }}>{room.Price}</td>
                <td style={{ color: '#665651' }}>{room.AddPrice}</td>
                <td style={{ color: '#665651' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                 
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes(room)}
                      onChange={() => handleCheckboxChange(room)}
                    />
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
              
      </Row>
      <Row className="mb-2">
      <Col lg="6" className="mt-3">
        <strong>Number of Guests</strong>
      </Col>
      <Col lg="6" className="mt-3">
        <InputGroup>
          <Button variant="outline-secondary" onClick={() => handleNumOfGuestsChange(numOfGuests - 1)} style={{ backgroundColor: 'white', borderColor: '#665651', color:'#665651' }}>-</Button>
          <Form.Control
            type="number"
            name="numOfGuests"
            value={numOfGuests}
            onChange={(e) => handleNumOfGuestsChange(parseInt(e.target.value, 10))}
            min="1"
            max="20"
          />
          <Button variant="outline-secondary" onClick={() => handleNumOfGuestsChange(numOfGuests + 1)} style={{ backgroundColor: 'white', borderColor: '#665651', color:'#665651' }}>+</Button>
        </InputGroup>
      </Col>

      </Row>
      
      <Row className="mb-2">
        <Col lg="6"><strong>Booking Channel</strong></Col>
        <Col lg="6">
          <Form.Control
            as="select"
            name="bookingChannel"
            value={formData.bookingChannel}
            onChange={handleInputChange}
            required
          >
            <option value="">Select booking channel</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Call">Call</option>
            <option value="Agoda">Agoda</option>
            <option value="Expedia">Expedia</option>
            <option value="Booking.com">Booking.com</option>
            <option value="Ctrip">Ctrip</option>
          </Form.Control>
        </Col>
      </Row>
    </div>

    {/* Submit Button */}
    <Row className="mt-4">
      <Col lg="5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '180px',marginTop: '30px' }}>
        <button className="btn" style={{ color: "#665651", backgroundColor: "white" }}>
          {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Booking
        </button>
      </Col>
    </Row>
  </Form>

  <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Room Reservation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onHide={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    
</div>




  );
};

export default BookingForm;
