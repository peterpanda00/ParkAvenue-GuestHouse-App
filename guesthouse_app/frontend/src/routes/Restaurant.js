import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import RoomSelection from '../components/RestaurantFoodList';
import '../App.css';
import Sidebar from '../components/Sidebar';

const RoomBooking = () => {
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
  const roomList = [
    {
      name: 'Classic Pancakes',
      type: 'All-Day Breakfast',
    },
    {
      name: 'Classic Pancakes with Fruits',
      type: 'All-Day Breakfast'
    },
    {
      name: 'Pancakes with Chocolate',
      type: 'All-Day Breakfast'
    },
    {
      name: 'Burger Pancake with Egg',
      type: 'All-Day Breakfast'
    },
    {
      name: 'Cheesy Bacon Burger Pancake',
      type: 'All-Day Breakfast'
    },
    {
      name: 'Ham, Egg, & Cheese Burrito',
      type: 'All-Day Breakfast'
    },
    {
      name: 'Ham & Cheese Omelet',
      type: 'All-Day Breakfast'
    },
    {
      name: 'Chicken Fillet Sandwhich',
      type: 'All-Day Breakfast'
    },
    {
      name: 'Bacon, Egg, Sausage & Toasts',
      type: 'All-Day Breakfast'
    },
  ];


  return (

    <div style={{ width: '100%', background: 'white', color: '#014c91', display: 'flex' }}>


      <Sidebar />
      <RoomSelection roomList={roomList} />

    </div>
  );
};

export default RoomBooking;
