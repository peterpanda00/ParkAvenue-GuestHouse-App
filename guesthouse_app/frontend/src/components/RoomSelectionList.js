import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup} from 'react-bootstrap';
import BookingForm from "../components/BookingForm"
import '../index.css';

const RoomSelectionList = ({roomList, onOfferSubmission}) => {
  const [hasItems, setHasItems] = useState(false);
  const [isFullView, setIsFullView] = useState(true);
  const [validated, setValidated] = useState(false);

  //Rendering Transition Logic for Alternating Views
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, 250); // 0.03 seconds in milliseconds

    return () => clearTimeout(timeout);
  }, [isFullView]);

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




const [itemList, setItemList] = useState([]);
const [itemListTotals, setItemListTotals] = useState([]);

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

console.log(itemList)

const handleAddToItemList = (room) => {
    // Create a new object with the offer's properties and add additional fields
    const newItem = {
      ...room,
      quantity: 1,
      discPrice: room.price // Set discPrice to be the same as price initially
    };
    // Add the new item to the itemList
    setItemList(prevItemList => [...prevItemList, newItem]);
  };

  // Function to calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    let total = 0;
    let totalDisc = 0;
  
    // Calculate subtotal and total
    itemList.forEach(item => {
      subtotal += parseFloat(item.price) * item.quantity;
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
  
  

  // Calculate totals when itemList changes
  useEffect(() => {
    calculateTotals();
  }, [itemList]);

  const formatNumber = (number) => {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  

  return (
        <>     
            

            <Row>

                {/* Initial View Display */}
                
                {itemList.length == 0 ? (
                    <Col lg="11" style={{marginLeft:"40px", marginRight:"10px"}}>
                        <Row>
                        {roomList.map((room, index) => (
                            <Col className="mt-3" lg="2" key={index}>
                            <Card style={{ height: '200px',width:'200px',cursor: 'pointer', padding: '10px', background: '#665651', color: 'white' , justifyContent: 'flex-end'}} onClick={() => handleAddToItemList(room)}>
                                <Card.Title style={{textAlign: 'center'}}>{room.name}</Card.Title>
                                <Card.Text style={{textAlign: 'center'}} >
                                {room.type}
                                </Card.Text>
                            </Card>
                            </Col>
                        ))}
                        </Row>
                        
                  </Col>
                 
                ):(
                    
                <>
                {/*Booking Form*/}
                    <Col lg='6' style={{ transition: 'all 0.2s ease' }}>
                        <div className="mt-3" style={{ padding: '6px', borderRadius: '10px', background: 'white', color: '#665651', textAlign: 'center', fontSize:"30px"}}>
                            <strong>Booking Form</strong>
                        </div>

                        <div style={{ marginTop:'6px', overflowY: 'auto', overflowX:'hidden', overflowY:'hidden' }}>

                            <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: '#014c91'  }}>
                                <CardBody>
                                    <Form validated={validated} onSubmit={handleSubmit}>
                                        

                                        
                                        <div style={{ padding: '10px', borderRadius: '10px', marginTop: '20px', background: '#665651', color: 'white'  }}>
                                            <BookingForm></BookingForm>
                                        </div>

                                        <Row className="mt-4">
                                            <Col lg="6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginLeft:'200px'}}>
                                                <button className="btn" style={{ color: "white", backgroundColor: "#665651" }}>
                                                {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Book Room
                                                </button>
                                            </Col>
                                            </Row>
                                    </Form>                
                                </CardBody>
                            </Card>

                        </div>
                    </Col>

                    {/*Offer List*/}
                    
                    <Col lg="5" >

                   
                     <Row>
                        
                        {/*Filtering Mechanism*/ }
                        <Col lg="6">
                            <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                            backgroundColor: "#665651", borderRadius: "10px",
                                                                            overflow: "hidden"}}>
                                <div style={{backgroundColor: "#665651", width: "30px", height: "100%"}}>   
                                    <div style={{padding: "5px", color: 'white'}}>
                                        {React.createElement(FaFilter, { size: 20 })}
                                    </div>  
                                </div>
                                <select className="form-select">
                                    <option value="">Single Room</option>
                                    <option value="0">Twin Room</option>
                                    <option value="1">Queen Room</option>
                                    <option value="2">Family Size</option>
                                </select>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {/*Search Bar*/ }
                        <Col lg="12">
                        <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                            backgroundColor: "#665651", borderRadius: "10px",
                                                                            overflow: "hidden"}}>
                                <div style={{backgroundColor: "#665651", width: "30px", height: "100%"}}>   
                                    <div style={{padding: "5px", color: 'white'}}>
                                        {React.createElement(FaSearch, { size: 20 })}
                                    </div>  
                                </div>
                                <input type="search" className="form-control" placeholder="Search"/>
                            </div>
                        </Col>
                    </Row>


                    <div style={{ maxHeight: '78vh', overflowY: 'auto', overflowX:'hidden'}}>
                        <Row>
                        {roomList.map((room, index) => (
                            <Col className="mt-3" lg="4" key={index}>
                            <Card style={{ height:'200px',width:'200px',cursor: 'pointer', padding: '10px', background: '#665651', color: 'white' , justifyContent: 'flex-end'}} onClick={() => handleAddToItemList(room)}>
                                <Card.Title>{room.name}</Card.Title>
                                <Card.Text>
                                {room.type}
                                </Card.Text>
                            </Card>
                            </Col>
                        ))}
                        </Row>
                    </div>
                    </Col>
                    
                    
                    </>
                )} 
                

            
            </Row>



    
    </>
  );
};

export default RoomSelectionList;
