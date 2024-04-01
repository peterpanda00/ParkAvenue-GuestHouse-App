import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
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
        if (newItem.name && newItem.price && newItem.description && newItem.imageUrl) {
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
                    <Modal.Title>Add New Food Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="itemName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter food item name"
                                name="name"
                                value={newItem.name || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="itemPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter food item price"
                                name="price"
                                value={newItem.price || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="itemCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={newItem.category || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">Select category...</option>
                                <option value="Appetizer">All-Day Breakfast</option>
                                <option value="Main Course">Filipino Breakfast</option>
                                <option value="Dessert">Chips</option>
                                <option value="Dessert">Special Menu</option>
                                <option value="Dessert">Beverages</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="itemImageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter food image URL"
                                name="imageUrl"
                                value={newItem.imageUrl || ''}
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
                                    <th>Category</th>
                                    <th>Image URL</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodList.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.category}</td>
                                        <td>{item.imageUrl}</td>
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
