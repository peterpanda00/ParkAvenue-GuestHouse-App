import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import RoomSelection from '../components/RestaurantFoodList';
import '../App.css';
import Sidebar from '../components/Sidebar';
import classicPancakes from '../restaurant/ALL DAY BREAKFAST/CLASSIC PANCAKES.png';
import classicPancakesWdFruits from '../restaurant/ALL DAY BREAKFAST/CLASSIC PANCAKES WITH FRUITS.png';
import pancakesWdChoco from '../restaurant/ALL DAY BREAKFAST/PANCAKES WITH CHOCOLATE.png';
import burgerPancakeWdEgg from '../restaurant/ALL DAY BREAKFAST/BURGER PANCAKE WITH EGG.png';
import cheesyBaconBurgerPancake from '../restaurant/ALL DAY BREAKFAST/CHEESY BACON BURGER PANCAKE.png';
import hamEggCheeseBurrito from '../restaurant/ALL DAY BREAKFAST/HAM, EGG, & CHEESE BURRITO.png';
import hamCheeseOme from '../restaurant/ALL DAY BREAKFAST/HAM & CHEESE OMELET.png';
import chickenFillSandwich from '../restaurant/ALL DAY BREAKFAST/CHICKEN FILLET SANDWICH.png';
import baconEggSausageToast from '../restaurant/ALL DAY BREAKFAST/BACON, EGG, SAUSAGE, & TOASTS.png';
import bacSilog from '../restaurant/FILIPINO-BREAKFAST-2/Bacsilog.png'
import chixSilog from '../restaurant/FILIPINO-BREAKFAST-2/Chix-silog.png'
import cornSilog from '../restaurant/FILIPINO-BREAKFAST-2/Cornsilog.png'
import bangSilog from '../restaurant/FILIPINO-BREAKFAST-2/Bangsilog.png'
import burgerSilog from '../restaurant/FILIPINO-BREAKFAST-2/Burgersilog.png'
import danggitSilog from '../restaurant/FILIPINO-BREAKFAST-2/Danggitsilog.png'
import longSilog from '../restaurant/FILIPINO-BREAKFAST-2/Longsilog.png'
import lumpiaSilog from '../restaurant/FILIPINO-BREAKFAST-2/Lumpiasilog.png'
import sisigSilog from '../restaurant/FILIPINO-BREAKFAST-2/Sisigsilog.png'
import tapSilog from '../restaurant/FILIPINO-BREAKFAST-2/Tapsilog.png'
import toCilog from '../restaurant/FILIPINO-BREAKFAST-2/Tocilog.png'


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
      imageUrl: classicPancakes
    },
    {
      name: 'Classic Pancakes with Fruits',
      type: 'All-Day Breakfast',
      price: 100,
      imageUrl: classicPancakesWdFruits
    },
    {
      name: 'Pancakes with Chocolate',
      type: 'All-Day Breakfast',
      price: 100,
      imageUrl: pancakesWdChoco
    },
    {
      name: 'Burger Pancake with Egg',
      type: 'All-Day Breakfast',
      price: 100,
      imageUrl: burgerPancakeWdEgg

    },
    {
      name: 'Cheesy Bacon Burger Pancake',
      type: 'All-Day Breakfast',
      price: 100,
      imageUrl: cheesyBaconBurgerPancake
    },
    {
      name: 'Ham, Egg, & Cheese Burrito',
      type: 'All-Day Breakfast',
      price: 100,
      imageUrl: hamEggCheeseBurrito
    },
    {
      name: 'Ham & Cheese Omelet',
      type: 'All-Day Breakfast',
      price: 100,
      imageUrl: hamCheeseOme
    },
    {
      name: 'Chicken Fillet Sandwhich',
      type: 'All-Day Breakfast',
      price: 100,
      imageUrl: chickenFillSandwich
    },
    {
      name: 'Bacon, Egg, Sausage & Toasts',
      type: 'All-Day Breakfast',
      price: 100,
      imageUrl: baconEggSausageToast
    },
    {
      name: 'Bacsilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: bacSilog
    },
    {
      name: 'Chix-silog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: chixSilog
    },
    {
      name: 'Cornsilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: cornSilog
    },
    {
      name: 'Bangsilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: bangSilog
    },
    {
      name: 'Burgersilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: burgerSilog
    },
    {
      name: 'Danggitsilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: danggitSilog
    },
    {
      name: 'Longsilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: longSilog
    },
    {
      name: 'Lumpiasilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: lumpiaSilog
    },
    {
      name: 'Sisigsilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: sisigSilog
    },
    {
      name: 'Tapsilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: tapSilog
    },
    {
      name: 'Tocilog',
      type: 'Filipino Breakfast',
      price: 100,
      imageUrl: toCilog
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
