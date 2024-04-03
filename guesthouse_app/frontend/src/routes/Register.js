import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Modal, Button, Form } from 'react-bootstrap';
import supabase from "../config/supabaseClient";

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();



    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Sign in using Supabase authentication
            const { user, error } = await supabase.auth.signUp({
                email: username,
                password: password,
            })

            if (error) {
                console.error(error.message);
                setModalMessage(`Error during registration: ${error.message}`);
            } else {
                console.log('User successfully registered:', user);
                setModalMessage('User successfully registered');
                navigate('/');
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
            setModalMessage(`Error during registration: ${error.message}`);
        }
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        // Refresh the page after closing the modal
        window.location.reload();
      };
    
      
    
    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create an Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                </Form>
                </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    style={{
                        width: '100px',
                        padding: '4px',
                        borderRadius: '10px',
                        background: '#665651',
                        color: 'white'
                    }}
                    onClick={handleRegister}
                >
                    Register
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegistrationForm;
