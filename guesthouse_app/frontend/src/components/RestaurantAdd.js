import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, CardBody, Card, Table, Modal, Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import supabase from "../config/supabaseClient";

const RestaurantAdd = ({ onSubmit, onClose }) => {
    const [foodList, setFoodList] = useState([]); // State for the food list
    const [newItem, setNewItem] = useState({}); // State for the new item being added
    const [showModal, setShowModal] = useState(false); // State for showing/hiding modal
    const [showRestaurantAdd, setShowRestaurantAdd] = useState(false);

    const [formData, setFormData] = useState({
            ItemName: '',
            ItemPrice: '',
            MealType: '',
            imgURL: '',
        });
        
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
            }
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                // Insert restaurant item data
                const { data: restaurantItemData, error: restaurantItemError } = await supabase
                    .from('food_items')
                    .insert([
                        {
                            Name: formData.ItemName,
                            Price: formData.ItemPrice,
                            Category: formData.MealType,
                            ImageURL: formData.imgURL,
                        },
                    ])
                    .select();
        
                    if (restaurantItemError) {
                        console.error('Error inserting restaurant item data:', restaurantItemError);
                        // Handle error appropriately
                        return;
                    }
            
                    console.log('Restaurant item data inserted:', restaurantItemData);
                    // Clear the form data after successful insertion
                    setFormData({
                        ItemName: '',
                        ItemPrice: '',
                        MealType: '',
                        imgURL: '',
                    });
            
                    // Optional: If you need to do something after successful insertion, you can add it here
             // Call onSubmit function passed from props
             onSubmit(formData);
             // Call onClose function passed from props to close the form
             onClose();
                } catch (error) {
                    console.error('Error inserting restaurant item:', error);
                    // Handle error appropriately
                }
        };

        return (
            <>
                {/* Form for adding new item */}
                <Card>
                    <CardBody>
                        <Form>
                            <Form.Group controlId="itemName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter item name"
                                    name="ItemName"
                                    value={newItem.ItemName || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="itemPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter item price"
                                    name="ItemPrice"
                                    value={newItem.ItemPrice || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="itemCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                             as="select"
                             name="MealType"
                             value={newItem.MealType || ''}
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
                             name="imgURL"
                             value={newItem.imgURL || ''}
                             onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleAddItem} style={{ marginBottom: '10px' }}>
                                Add Item
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
    
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {foodList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.ItemName}</td>
                                            <td>{item.ItemPrice}</td>
                                            <td>{item.MealType}</td>
                                             <td>{item.imgURL}</td>
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
 export default RestaurantAdd;  
