import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup, Button} from 'react-bootstrap';
import '../index.css';
import { IoNavigateCircleOutline } from 'react-icons/io5';
import supabase from "../config/supabaseClient";
import { FadeLoader } from 'react-spinners'
import { FaAlignCenter } from 'react-icons/fa6';

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
    if (selectedCardIndex !== null ) {
      // Access the selected room using roomList[selectedCardIndex]
      console.log(`Check-in for room: ${roomList[selectedCardIndex].RoomNumber}`);
      setShowBookingForm(true); // Show booking form after check-in
    } else {
      console.log('No room selected for check-in');
    }
  };

  const handleCheckOut = () => {
    // Implement the logic for check-out based on the selected card or room
    if (selectedCardIndex !== null) {
      // Access the selected room using roomList[selectedCardIndex]
      console.log(`Check-out for room: ${roomList[selectedCardIndex].RoomNumber}`);
    } else {
      console.log('No room selected for check-out');
    }
  };

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
    setShowBookingForm(true);
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
                        <FadeLoader
                          color="#665651"
                     
                        />
                      </div>
                      ) : (
                        <Row>
                          {filteredRoomList.map((room, index) => (
                            <Col className="mt-3" lg="2" key={index}>
                              <Card style={{ height: '200px', width: '200px', cursor: 'pointer', padding: '10px', 
                                            background: selectedCardIndex === index ? '#9A8D88' : '#665651', 
                                            color: 'white', justifyContent: 'flex-end' }} onClick={() => handleCardClick(index)} >
                                <Card.Title style={{ textAlign: 'center', color: 'white' }}>{room.RoomNumber}</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }}>
                                  {room.RoomType}
                                </Card.Text>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      )}
                    </Col>

                    {/* Buttons for Check-in and Check-out */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button variant="success" style={{ marginRight: '10px' }} onClick={handleCheckIn}>
                      Check-in
                    </Button>
                    <Button variant="danger" onClick={handleCheckOut}>
                      Check-out
                    </Button>
                  </div>
        
                 
                <>
               
                {/* Form Overlay */}
        {showBookingForm && (
          <div className="overlay-container overlay-content">
              
            {/* Close button for the overlay */}
            <button className="close-button" onClick={() => setShowBookingForm(false)}>
              Close
            </button>
          </div>
        )}



                 
                
                    
                    
                    </>
                 
                

            
            </Row>



    
    </>
  );
};

export default RoomSelectionList;
