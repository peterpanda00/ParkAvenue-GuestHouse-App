import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import RestaurantFoodList from '../components/RestaurantFoodList';
import '../App.css';
import Sidebar from '../components/Sidebar';
import RestaurantAdd from "../components/RestaurantAdd";
import { Alert } from 'react-bootstrap';



const Restaurant = () => {
  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(''); // State for the selected filter
  const [filteredFoodList, setFilteredFoodList] = useState([]); // State for the filtered food list
  const [foodList, setFoodList] = useState([])
  const [showRestaurantAdd, setShowRestaurantAdd] = useState(false);



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


  const handleFilterChange = (event) => {
    const { value } = event.target;
    setSelectedFilter(value);

    // Filter the food list based on the selected filter
    if (value === '') {
      setFilteredFoodList(foodList);
    } else {
      const filteredList = foodList.filter(item => item.type === value);
      setFilteredFoodList(filteredList);
    }
  };

  const handleAddRestaurantItem = () => {
    // Set the state to show the BookingForm when the button is clicked
    setShowRestaurantAdd(true);
  };

  // Inside Restaurant component

  const handleFormSubmit = (formData) => {
    // Process the form data here, e.g., insert into database
    console.log('Form submitted with data:', formData);
  };

  // Inside return statement
  <RestaurantAdd onSubmit={handleFormSubmit} />


  const notificationInfo = "Bed and Breakfast (BnB) Menu is open from Monday - Saturday at 7:00 am – 7:00 pm and on Sunday at 7:00 am – 4:00 pm";

  return (
    <div style={{ width: '100%', background: 'white', color: '#014c91', display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '20px' }}>
        {/* Notification */}
        <Alert
          variant="info"
          className="mb-3"
          style={{
            backgroundColor: '#665651',
            color: 'white',
            fontSize: '16px',
            marginLeft: "35px",
            borderColor: '#665651',
            maxWidth: "1590px",
            display: 'flex',
          }}
        >
          {notificationInfo}
        </Alert>

        {/* RestaurantFoodList Component with filtered food list */}
        <RestaurantFoodList />

        {/* Button */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn"
            style={{ color: 'white', backgroundColor: '#665651', marginTop: '40px', marginRight: '1405px' }}
            onClick={handleAddRestaurantItem} // You can add your onClick handler here
          >
            + Add Food Item
          </button>
        </div>
        {showRestaurantAdd &&
          <div className="overlay-container">
            <div className="overlay-content">
              <div className="overlay-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', borderRadius: '10px', background: 'white', color: '#665651', textAlign: 'center', fontSize: '30px' }}>
                <strong>Add an Item to the Menu</strong>
                <button
                  className="btn"
                  style={{ color: 'white', backgroundColor: '#665651', padding: '5px', borderRadius: '5px', alignSelf: 'flex-end', }}
                  onClick={() => setShowRestaurantAdd(false)} // Close button functionality
                >
                  X
                </button>
              </div>
              <div className="overlay-body" style={{ marginTop: '6px', overflowY: 'auto', overflowX: 'hidden', overflowY: 'hidden' }}>
                <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: '#014c91' }}>
                  <CardBody>
                    <div style={{ padding: '10px', borderRadius: '10px', marginTop: '20px', background: '#665651', color: 'white' }}>
                      <RestaurantAdd onSubmit={handleFormSubmit} /> {/* Render RestaurantAdd here with onSubmit prop */}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Restaurant;
