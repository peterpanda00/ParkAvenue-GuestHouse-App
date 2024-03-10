import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import RestaurantFoodList from '../components/RestaurantFoodList';
import '../App.css';
import Sidebar from '../components/Sidebar';
import { Alert } from 'react-bootstrap';



const Restaurant = () => {
  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(''); // State for the selected filter
  const [filteredFoodList, setFilteredFoodList] = useState([]); // State for the filtered food list
  const [foodList,setFoodList] = useState([])

  /*useEffect(() => {
    console.log(supabase)

    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(
            `
              *,
              guests:guests("GuestID ", FirstName, LastName); // Set loading to false when done fetching
            `
          );
        if (error) {
          setFetchError('Could not fetch orders');
          setOrderList([]);
          setOrderCount(0);
        }

        if (data) {
          setOrderList(data);
          setFetchError(null);
          setOrderCount(data.length);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when done fetching
      }
    };

    fetchOrders();
    console.log(orderList)
    console.log(filteredorderList)
  }, []); */

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

  const notificationInfo = "Bed & Breakfast (BnB) Menu is open from Monday - Saturday at 7:00 am – 7:00 pm and on Sunday at 7:00 am – 4:00 pm";

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

        {/* Dropdown Filter */}
        <div className="mb-2 input-group" style={{ maxWidth: "300px", display: "flex" }}>
          <div style={{ marginLeft: "10px", width: "30px", height: "100%" }}>
            <div style={{ padding: "5px", color: 'white' }}>
              {React.createElement(FaFilter, { size: 20 })}
            </div>
          </div>
          <select
            className="form-select"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="All-Day Breakfast">All-Day Breakfast</option>
            <option value="Filipino Breakfast">Filipino Breakfast</option>
            <option value="Chips">Chips</option>
            <option value="Special Menu">Special Menu</option>
            <option value="Beverages">Beverages</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* RestaurantFoodList Component with filtered food list */}
        <RestaurantFoodList/>
      </div>
    </div>
  );
};

export default Restaurant;
