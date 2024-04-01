import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup, Button} from 'react-bootstrap';
import '../index.css';
import { IoNavigateCircleOutline } from 'react-icons/io5';
import supabase from "../config/supabaseClient";
import { FadeLoader } from 'react-spinners'
import { FaAlignCenter } from 'react-icons/fa6';
import CheckInForm from "./CheckInForm";
import CheckOutForm from "./CheckOutForm";
import { IoPerson } from "react-icons/io5";


const RoomSelectionList = ({onOfferSubmission}) => {
  const [fetchError,setFetchError] = useState(null)
  const [roomList,setRoomList] = useState([])
  const [hasItems, setHasItems] = useState(false);
  const [isFullView, setIsFullView] = useState(true);
  const [validated, setValidated] = useState(false);
  const [roomCount, setRoomCount] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true); 
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showCheckOutForm, setShowCheckOutForm] = useState(false);


  //Rendering Transition Logic for Alternating Views
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, 250); // 0.03 seconds in milliseconds

    return () => clearTimeout(timeout);
  }, [isFullView]);


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
  
      fetchRooms()
      console.log(roomList)
      console.log(filteredRoomList)
  }, []);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setSelectedCardIndex(null);
    setShowBookingForm(false); 
  };

  const filteredRoomList = roomList.filter((room) => {
    // Customize this condition based on your filtering criteria
    return filterValue === "" || room.RoomType === filterValue;
  });



  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        onOfferSubmission()
    }

    setValidated(true);
  };

  const handleCheckIn = () => {
    // Implement the logic for check-in based on the selected card or room
    setShowBookingForm(true);
  };

  const handleCheckOut = () => {
    // Implement the logic for check-out based on the selected card or room
    if (selectedCardIndex !== null) {
      // Access the selected room using roomList[selectedCardIndex]
      console.log(`Check-out for room: ${roomList[selectedCardIndex].RoomNumber}`);
      setShowCheckOutForm(true);
    } else {
      console.log('No room selected for check-out');
    }
  };

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };



  

  return (
        <>     
            

            <Row>
                <Row>
                        
                        {/*Filtering Mechanism*/ }
                        <Col lg="6" style={{marginLeft:"40px", marginRight:"10px",marginTop:"50px"}}>
                            <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                            backgroundColor: "#665651", borderRadius: "10px",
                                                                            overflow: "hidden"}}>
                                <div style={{backgroundColor: "#665651", width: "30px", height: "100%"}}>   
                                    <div style={{padding: "5px", color: 'white'}}>
                                        {React.createElement(FaFilter, { size: 20 })}
                                    </div>  
                                </div>
                                <select className="form-select" value={filterValue} onChange={handleFilterChange}>
                                    <option value="">All</option>
                                    <option value="Single Room">Single Room</option>
                                    <option value="Superior Twin">Superior Twin</option>
                                    <option value="Deluxe Queen">Deluxe Queen</option>
                                    <option value="Imperial King">Imperial King</option>
                                    <option value="Family Room">Family Room</option>
                                    
                                </select>
                            </div>
                        </Col>
                    </Row>

                    <Col style={{ marginLeft: "40px", marginRight: "10px" }}>
                    {loading ? (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <FadeLoader color="#665651" />
                      </div>
                    ) : (
                      <Row>
                        {filteredRoomList.map((room, index) => (
                          <Col className="mt-3" lg="2" key={index}>
                            <Card
                              style={{
                                height: '200px',
                                width: '200px',
                                cursor: 'pointer',
                                padding: '10px',
                                background: selectedCardIndex === index ? '#9A8D88' : '#665651',
                                color: 'white',
                                justifyContent: 'flex-end',
                                position: 'relative', // Position relative for icon placement
                              }}
                              onClick={() => handleCardClick(index)}
                            >
                              {room.Availability === false && (
                                <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                
                                  <IoPerson style={{ color: 'white', fontSize: '80px' }} />
                                </div>
                              )}

                              <Card.Title style={{ textAlign: 'center', color: 'white' }}>{room.RoomNumber}</Card.Title>
                              <Card.Text style={{ textAlign: 'center' }}>{room.RoomType}</Card.Text>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Col>

                     {/* Buttons for Check-in and Check-out */}
                     
                     <Row>
                    <div style={{ display: 'flex', justifyContent: 'flex-end',marginRight: '60px' }}>
                      <Button variant="success" style={{ marginRight: '10px', borderRadius: '20%', width: '200px', height: '200px', fontWeight: 'bold', fontSize: '25px' }} onClick={handleCheckIn}>
                        CHECK-IN
                      </Button>
                      <Button variant="danger" style={{ borderRadius: '20%', width: '200px', height: '200px', fontWeight: 'bold', fontSize: '25px' }} onClick={handleCheckOut}>
                        CHECK-OUT
                      </Button>
                    </div>
                  </Row>

        
                 
                <>
               
            



                 
                
                    
                    
                    </>
                 
                

            
            </Row>

            
           
        
         {showBookingForm && 
        
          <div className="overlay-container">
          <div className="overlay-content">
            <div className="overlay-header" style={{  display: 'flex',justifyContent: 'space-between',padding: '6px', borderRadius: '10px', background: 'white', color: '#665651', textAlign: 'center', fontSize: '30px' }}>
              <strong>Check In Form</strong>
              <button
              className="btn"
              style={{ color: 'white', backgroundColor: '#665651', padding: '5px', borderRadius: '5px',alignSelf: 'flex-end', }}
              onClick={() => setShowBookingForm(false)} // Close button functionality
            >
              X
        </button>
            </div>
            <div className="overlay-body" style={{display: 'flex',transform: 'translate(-15%, 0%)',width: '150%', marginTop: '6px', overflowY: 'auto', overflowX: 'hidden', overflowY: 'hidden'}}>
                    <CheckInForm />
            </div>
          </div>
        </div>
        }

      {showCheckOutForm && 
        
        <div className="overlay-container">
        <div className="overlay-content">
          <div className="overlay-header" style={{  display: 'flex',justifyContent: 'space-between',padding: '6px', borderRadius: '10px', background: 'white', color: '#665651', textAlign: 'center', fontSize: '30px' }}>
            <strong>Check Out Form</strong>
            <button
            className="btn"
            style={{ color: 'white', backgroundColor: '#665651', padding: '5px', borderRadius: '5px',alignSelf: 'flex-end', }}
            onClick={() => setShowBookingForm(false)} // Close button functionality
          >
            X
      </button>
          </div>
          <div className="overlay-body" style={{display: 'flex',transform: 'translate(-15%, 0%)',width: '170%', marginTop: '6px', overflowY: 'auto', overflowX: 'hidden', overflowY: 'hidden'}}>
                  <CheckOutForm RoomNumber={roomList[selectedCardIndex].RoomNumber} />
          </div>
        </div>
      </div>
      }




    
    </>
  );
};

export default RoomSelectionList;
