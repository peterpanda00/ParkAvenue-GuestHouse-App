import { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    guestName: '',
    mobileNumber: '',
    email: '',
    checkIn: '',
    checkOut: '',
    bookingChannel: '',
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
    <div style={{ width:'100%',padding: '5px', borderRadius: '10px', marginTop: '20px', background: '#665651', color: 'white',alignItems: 'center', justifyContent:'center', display: 'flex', flexDirection: 'column'}} >
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2">
          <Col lg=""><strong>Guest Name</strong></Col>
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
        
      </Form>
    </div>
  );
};

export default BookingForm;
