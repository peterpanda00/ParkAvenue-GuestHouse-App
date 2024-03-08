import  React, { useEffect,useState } from 'react';
import { Col, Row, Form, Button, Card,Table,CardBody,Dropdown,CheckBox  } from 'react-bootstrap';
import { FaEllipsisH, FaSave, FaEye, FaEyeSlash, FaTrash, FaCheck} from 'react-icons/fa';
import supabase from "../config/supabaseClient";


const BookingForm = () => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [fetchError,setFetchError] = useState(null)
  const [roomList,setRoomList] = useState([])
  const [roomCount, setRoomCount] = useState(0);
  const [filterValue, setFilterValue] = useState("");

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

  const handleCheckboxChange = (roomNumber) => {
    // Check if the room is already in the selectedRooms array
    const isSelected = selectedRooms.includes(roomNumber);
  
    // If it's selected, remove it; otherwise, add it
    if (isSelected) {
      setSelectedRooms(selectedRooms.filter((room) => room !== roomNumber));
    } else {
      setSelectedRooms([...selectedRooms, roomNumber]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or validation logic here
    console.log('Form submitted:', formData);
  };

  
      

  return (
    <div style={{ width: '100%', padding: '5px', borderRadius: '10px', marginTop: '20px', background: '#665651', color: 'white', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
  <Form onSubmit={handleSubmit}>

    {/* Guest Information */}
    <div style={{ marginBottom: '20px' }}>
      <h2>Guest Information</h2>
      <Row className="mb-2">
        <Col lg=""><strong>First Name</strong></Col>
        <Col lg="6">
          <Form.Control
            type="text"
            placeholder="Enter guest name"
            name="guestName"
            value={formData.guestName}
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
            name="guestName"
            value={formData.guestName}
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
    <div>
      <h2>Booking Information</h2>
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
        <Col lg="6"><strong>Available Rooms</strong></Col>
        
        <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
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
                <td style={{ color: '#665651' }}>{room["RoomNumber "]}</td>
                <td style={{ color: '#665651' }}>{room.RoomType}</td>
                <td style={{ color: '#665651' }}>{room.GuestCapacity}</td>
                <td style={{ color: '#665651' }}>{room.Price}</td>
                <td style={{ color: '#665651' }}>{room.AddPrice}</td>
                <td style={{ color: '#665651' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes(room.RoomNumber)}
                      onChange={() => handleCheckboxChange(room.RoomNumber)}
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
      <Col lg="5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '200px' }}>
        <button className="btn" style={{ color: "white", backgroundColor: "#665651" }}>
          {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Guest Information
        </button>
      </Col>
    </Row>

  </Form>
</div>
  );
};

export default BookingForm;
