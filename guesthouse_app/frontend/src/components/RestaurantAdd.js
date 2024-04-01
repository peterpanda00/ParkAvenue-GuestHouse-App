import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, CardBody, Card, Table, Modal, Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

const Restaurant = () => {
    const [foodList, setFoodList] = useState([]); // State for the food list
    const [newItem, setNewItem] = useState({}); // State for the new item being added
    const [showModal, setShowModal] = useState(false); // State for showing/hiding modal
    const [showRestaurantAdd, setShowRestaurantAdd] = useState(false);

    // Function to handle input change for the new item
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    // Function to handle adding the new item to the food list
    const handleAddItem = () => {
        if (newItem.name && newItem.price && newItem.description) {
            setFoodList([...foodList, newItem]);
            setNewItem({}); // Clear the new item state
            handleCloseModal(); // Close the modal after adding the item
        }
    };

    // Function to show the modal
    const handleShowModal = () => {
        setShowModal(true);
    };

    // Function to hide the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {/* Button to show modal for adding new item */}
            {!showModal && (
                <div className="text-right mb-3">
                    <Button variant="primary" onClick={handleShowModal}>
                        Add Item
                    </Button>
                </div>
            )}

            {/* Modal for adding new item */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="itemName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                name="name"
                                value={newItem.name || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="itemPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter item price"
                                name="price"
                                value={newItem.price || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="itemDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter item description"
                                name="description"
                                value={newItem.description || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddItem}>
                        Add Item
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Display food list */}
            {foodList.length > 0 && (
                <Card>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodList.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            )}
        </>
    );
};

export default Restaurant;
