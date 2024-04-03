import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, CardBody, Card, Table, Modal, Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import supabase from "../config/supabaseClient";


const RestaurantAdd = ({ onSubmit, onClose }) => {
    const [foodList, setFoodList] = useState([]); // State for the food list
    const [newItem, setNewItem] = useState({}); // State for the new item being added
    const [showModal, setShowModal] = useState(false); // State for showing/hiding modal
    const [modalMessage, setModalMessage] = useState('');
    const [showRestaurantAdd, setShowRestaurantAdd] = useState(false);

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [meal, setMeal] = useState("")
    const [image, setImage] = useState("")

    const [formData, setFormData] = useState({
        ItemName: 'ItemName',
        ItemPrice: 'ItemPrice',
        MealType: 'MealType',
        imgURL: 'imgURL',
    });

    useEffect(() => {
        console.log(formData)
    }, [formData])

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Regular expression to match URL format
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        // If imgURL is not empty and does not match the URL format, assign a default URL
        let imageUrlToUse = image.trim();
        if (!urlRegex.test(imageUrlToUse)) {
            imageUrlToUse = 'https://scontent.fmnl4-1.fna.fbcdn.net/v/t1.6435-9/186591364_158613132938830_571077991002649223_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UzZsd28Rhb8AX8d79FI&_nc_ht=scontent.fmnl4-1.fna&oh=00_AfABp7VFz_BpKGGdM8Vqu8po9LNBzXbrF_y11YGFH6XfQg&oe=6633BC09';
        }

        const restaurantData = { ItemName: name, ItemPrice: price, MealType: meal, imgURL: imageUrlToUse }
        try {
            const { data: count, error: countError } = await supabase.from('food_items').select('ProductID', { count: "exact" })
            console.log(count)
            // Insert restaurant item data
            const { data: restaurantItemData, error: restaurantItemError } = await supabase
                .from('food_items')
                .insert(
                    restaurantData
                )
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

            setModalMessage('Ordered Successfully');
            setShowModal(true);

            // Optional: If you need to do something after successful insertion, you can add it here

        } catch (error) {
            console.error('Error inserting restaurant item:', error);
            // Handle error appropriately
        }
    };

    return (
        <>
            {/* Modal for successful order */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Food Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Added Food Menu Item Successfully</p>
                </Modal.Body>
            </Modal>
            {/* Form for adding new item */}
            <Form ></Form>
            <Card style={{ backgroundColor: '#665651', color: 'white', marginBottom: '20px', borderColor: '#665651', marginBottom: '10px' }}>
                <CardBody>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="itemName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                name="ItemName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="itemPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter item price"
                                name="ItemPrice"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="itemCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="MealType"
                                value={meal}
                                onChange={(e) => setMeal(e.target.value)}
                                required
                            >
                                <option value="">Select category...</option>
                                <option value="All-Day Breakfast">All-Day Breakfast</option>
                                <option value="Filipino Breakfast">Filipino Breakfast</option>
                                <option value="Chips">Chips</option>
                                <option value="Special Menu">Special Menu</option>
                                <option value="Beverages">Beverages</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="itemImageUrl" style={{ marginBottom: '25px' }}>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter food image URL"
                                name="imgURL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>
                        <button className="btn" style={{ color: "#665651", backgroundColor: "white" }}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Submit Item
                        </button>
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
