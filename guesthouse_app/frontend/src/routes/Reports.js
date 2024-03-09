import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import RoomSelection from '../components/Report';
import '../App.css';
import Sidebar from '../components/Sidebar';


const Restaurant = () => {
  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);

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

  // Sample data for different products and services
  const foodList = [
    {
      name: 'Classic Pancakes',
      type: 'All-Day Breakfast',
      price: 100,

    },
    {
      name: 'Classic Pancakes with Fruits',
      type: 'All-Day Breakfast',
      price: 100,
    },
    {
      name: 'Pancakes with Chocolate',
      type: 'All-Day Breakfast',
      price: 100,
    },
    {
      name: 'Burger Pancake with Egg',
      type: 'All-Day Breakfast',
      price: 100,

    },
    {
      name: 'Cheesy Bacon Burger Pancake',
      type: 'All-Day Breakfast',
      price: 100,
    },
    {
      name: 'Ham, Egg, & Cheese Burrito',
      type: 'All-Day Breakfast',
      price: 100,
    },
    {
      name: 'Ham & Cheese Omelet',
      type: 'All-Day Breakfast',
      price: 100,
    },
    {
      name: 'Chicken Fillet Sandwhich',
      type: 'All-Day Breakfast',
      price: 100,
    },
    {
      name: 'Bacon, Egg, Sausage & Toasts',
      type: 'All-Day Breakfast',
      price: 100,
    },
    {
      name: 'Bacsilog',
      type: 'Filipino Breakfast',
      price: 100,

    },
    {
      name: 'Chix-silog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Cornsilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Bangsilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Burgersilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Danggitsilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Longsilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Lumpiasilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Sisigsilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Tapsilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Cornsilog',
      type: 'Filipino Breakfast',
      price: 100,
    },
    {
      name: 'Tocilog',
      type: 'Filipino Breakfast',
      price: 100,
    },



  ];


  return (

    <div style={{ width: '100%', background: 'white', color: '#014c91', display: 'flex' }}>


      <Sidebar />
      <RoomSelection foodList={foodList} />

    </div>
  );
};

export default Restaurant;
