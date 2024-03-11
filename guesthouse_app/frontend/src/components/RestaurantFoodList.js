import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup,Modal } from 'react-bootstrap';
import BookingForm from "./BookingForm"
import '../index.css';
import supabase from '../config/supabaseClient';

const RestaurantFoodList = () => {
    const [hasItems, setHasItems] = useState(false);
    const [isFullView, setIsFullView] = useState(true);
    const [validated, setValidated] = useState(false);
    const [fetchError,setFetchError] = useState(null)
    const [foodList,setFoodList] = useState([])
    const [foodCount, setFoodCount] = useState(0);
    const [filterValue, setFilterValue] = useState("");
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true); 
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
  


    //Rendering Transition Logic for Alternating Views
    const [shouldRender, setShouldRender] = useState(false);
    useEffect(() => {
        console.log(supabase)
    
        const fetchFood = async () => {
          try {
            const { data, error } = await supabase
              .from('food_items')
              .select();
      
            if (error) {
              setFetchError('Could not fetch food');
              setFoodList([]);
              setFoodCount(0);
            }
      
            if (data) {
              setFoodList(data);
              setFetchError(null);
              setFoodCount(data.length);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false); // Set loading to false when done fetching
          }
        };
      
          fetchFood()
          console.log(foodList)
          console.log(filteredFoodList)
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setModalMessage('Ordered Successfully');
        setShowModal(true);
        setTimeout(() => {
            window.location.reload();
          }, 5000);
         
    };

    const filteredFoodList = foodList
    .filter((food) => {
      
      return (
        (filterValue === '' || food.MealType === filterValue) &&
        (searchValue === '' ||
            food.ItemName.toLowerCase().includes(searchValue.toLowerCase()) ||
            food.ItemName.toLowerCase().includes(searchValue.toLowerCase())
          
        )
      );
    })
    

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
            discPrice: room.ItemPrice // Set discPrice to be the same as price initially
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

    const handleCloseModal = () => {
        setShowModal(false);
        // Refresh the page after closing the modal
        window.location.reload();
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
        {/*Navigation Forms*/ }
        <Row>
                {/*Search Bar*/ }
                <Col lg="4">
                    <form>
                        <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", borderRadius: "10px", 
                                                                        overflow: "hidden"}} >
                            <input type="search" className="form-control" placeholder="Search Item" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                            <button className="btn me-auto" style={{color: "white", backgroundColor: "#665651"}}>
                                <div style={{color: 'white'}}>
                                    {React.createElement(FaSearch, { size: 20 })}
                                </div>
                            </button>
                        </div>
                    </form>
                </Col>
                {/*Filtering Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#665651", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#665651", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select" 
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}>
                            <option value="">All Food</option>
                            <option value="All-Day Breakfast">All-Day Breakfast</option>
                            <option value="Filipino Breakfast">Filipino Breakfast</option>
                            <option value="Chips">Chips</option>
                            <option value="Special Menu">Special Menu</option>
                            <option value="Beverages">Beverages</option>
                        </select>
                    </div>
                </Col>
            </Row>
            <Row>
                
                {/* Initial View Display */}
                {itemList.length == 0 ? (
                    <Col lg="11" style={{ marginLeft: "40px", marginRight: "10px" }}>
                        <Row>
                            {filteredFoodList.map((food, index) => (
                                <Col className="mt-3" lg="2" key={index} style={{ marginBottom: '20px' }}>
                                <Card style={{ position: 'relative', height: '250px', width: '200px', cursor: 'pointer', padding: '10px', background: '#665651', color: 'white' }} onClick={() => handleAddToItemList(food)}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
                                        <Card.Title style={{ textAlign: 'center', marginBottom: '10px', position: 'relative', zIndex: 2 }}></Card.Title>
                                        <Card.Text style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}></Card.Text>
                                    </div>
                                    <img src={food.imgURL} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} alt={food.ItemName} />
                                    <div style={{ backgroundColor: '#665651', color: 'white', marginBottom: '110px', textAlign: 'center', position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', width: '80%', padding: '5px', borderRadius: '5px',fontSize:'15px' }}>{food.ItemName}</div>
                                </Card>
                            </Col>
                            
                            ))}
                        </Row>
                    </Col>
                ) : (
                        <>
                            {/*Order Summary*/}
                            <Col lg={isFullView ? "5" : "12"} style={{ transition: 'all 0.2s ease' }}>
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
                                                                <td style={{ color: '#665651' }}>
                                                                    <Form.Group controlId={`qty-${index}`}>
                                                                        <Form.Control type="number" inputmode="numeric" min="1" required
                                                                            value={item.quantity} onChange={(e) => handleItemListChange(e, index, 'quantity')} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td style={{ color: '#665651' }}>{item.ItemName}</td>
                                                                <td style={{ color: '#665651' }}>
                                                                    ₱ {formatNumber(item.ItemPrice)}
                                                                </td>
                                                                <td style={{ color: '#665651' }}>
                                                                    {React.createElement(FaTrash, {
                                                                        size: 18,
                                                                        style: { marginTop: '6px', cursor: 'pointer' },
                                                                        onClick: () => handleRemoveFromItemList(index) // Attach onClick event handler
                                                                    })}
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

                                                <Row className="mt-4">
                                                    <Col lg="12" className="d-flex justify-content-center">
                                                        <button className="btn" style={{ color: "white", backgroundColor: "#665651" }}>
                                                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Order
                                                        </button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </CardBody>
                                    </Card>

                                </div>
                            </Col>

                            {/*Offer List*/}
                            <Col lg="7" >
                            
                               


                                <div style={{ maxHeight: '78vh', overflowY: 'auto', overflowX: 'hidden' }}>
                                    <Row>
                                                {filteredFoodList.map((food, index) => (
                                            <Col className="mt-3" key={index} style={{ marginBottom: '20px' }}>
                                            <Card style={{ position: 'relative', height: '200px', width: '200px', cursor: 'pointer', padding: '10px', background: '#665651', color: 'white' }} onClick={() => handleAddToItemList(food)}>
                                                <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
                                                    <Card.Title style={{ textAlign: 'center', marginBottom: '10px', position: 'relative', zIndex: 2 }}></Card.Title>
                                                    <Card.Text style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}></Card.Text>
                                                </div>
                                                <img src={food.imgURL} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} alt={food.ItemName} />
                                                <div style={{ backgroundColor: '#665651', color: 'white', marginBottom: '110px', textAlign: 'center', position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', width: '80%', padding: '5px', borderRadius: '5px',fontSize:'15px' }}>{food.ItemName}</div>
                                            </Card>
                                        </Col>
                                        
                                        ))}
                                    </Row>
                                </div>
                            </Col>
                        </>
                    )}
            </Row>

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

export default RestaurantFoodList;