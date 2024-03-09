import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup } from 'react-bootstrap';
import BookingForm from "./BookingForm"
import '../index.css';

const RestaurantFoodList = ({ foodList, onOfferSubmission }) => {
    const [itemList, setItemList] = useState([]);
    const [itemListTotals, setItemListTotals] = useState([]);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            onOfferSubmission();
        }

        setValidated(true);
    };

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

    const handleAddToItemList = (room) => {
        const newItem = {
            ...room,
            quantity: 1,
            discPrice: room.price // Set discPrice to be the same as price initially
        };
        setItemList(prevItemList => [...prevItemList, newItem]);
    };

    const calculateTotals = () => {
        let subtotal = 0;
        let total = 0;
        let totalDisc = 0;

        itemList.forEach(item => {
            subtotal += parseFloat(item.price) * item.quantity;
            total += parseFloat(item.discPrice) * item.quantity;
        });

        totalDisc = total - subtotal;

        setItemListTotals({
            subtotal: subtotal,
            total: total,
            totalDisc: totalDisc
        });
    };

    useEffect(() => {
        calculateTotals();
    }, [itemList]);

    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <>
            <Row className="justify-content-center">
                {foodList.slice(0, 3).map((room, index) => (
                    <Col className="mt-3" lg="4" key={index}>
                        <Card style={{ height: '200px', width: '200px', cursor: 'pointer', padding: '10px', background: '#665651', color: 'white' }} onClick={() => handleAddToItemList(room)}>
                            <div style={{ width: '100%', height: '100%', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Card.Title style={{ textAlign: 'center', marginBottom: '10px', position: 'relative', zIndex: 2 }}>{room.name}</Card.Title>
                                <Card.Text style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>{room.type}</Card.Text>
                            </div>
                            {/* <img src={room.imageUrl} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} alt={room.name} /> */}
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default RestaurantFoodList;