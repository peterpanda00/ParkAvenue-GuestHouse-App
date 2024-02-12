import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import RoomSelection from '../components/RoomSelectionList';
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
      name: 'Room 811',
      type: 'Single Room'
    },
    {
      name: 'Room 812',
      type: 'Single Room'
    },
    {
      name: 'Room 813',
      type: 'Single Room'
    },
    {
      name: 'Room 815',
      type: 'Twin Room'
    },
    {
      name: 'Room 816',
      type: 'Twin Room'
    },
    {
      name: 'Room 816',
      type: 'Twin Room'
    },
    {
      name: 'Room 821',
      type: 'Queen Room'
    },
    {
      name: 'Room 822',
      type: 'Queen Room'
    },
    {
      name: 'Room 823',
      type: 'Queen Room'
    },
    {
      name: 'Room 825',
      type: 'Twin Room'
    },
    {
      name: 'Room 826',
      type: 'Twin Room'
    },
    {
      name: 'Room 827',
      type: 'Twin Room'
    },
    {
      name: 'Room 828',
      type: 'Family Room'
    },
    {
      name: 'Room 829',
      type: 'Family Room'
    },
  ];
  

  return (
    
    <div style={{ width: '100%', background: 'white', color: '#014c91', display:'flex'}}>
      
      
      <Sidebar/>
      <RoomSelection roomList={roomList}/>

    </div>
  );
};

export default RoomBooking;
