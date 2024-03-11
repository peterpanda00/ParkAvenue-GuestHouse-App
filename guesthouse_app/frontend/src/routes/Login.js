import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useHistory
import { Row, Form, Modal, Button } from 'react-bootstrap';
import '../index.css';
import banner from '../assets/parkavenue_banner.png';
import supabase from "../config/supabaseClient";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
        // Refresh the page after closing the modal
        window.location.reload();
      };
    

  

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          // Sign in using Supabase authentication
          const { user, error } = await supabase.auth.signInWithPassword({
            email: username, // Assuming the email is used as a username
            password,
          });
    
          if (error) {
            console.error(error.message);
            setModalMessage(`Error during login: ${error.message}`);
          } else {
            console.log('User successfully logged in:', user);
            setModalMessage('User successfully logged in');
            navigate('/home');
          }
        } catch (error) {
          console.error('Error during login:', error.message);
          setModalMessage(`Error during login: ${error.message}`);
        }
        setShowModal(true);
      };
    

    return (
        <div style={{ background: '#F2EFEB', color: '#665651', minHeight: '100vh', overflowX: 'hidden' }}>
            <Row className="pt-5">
                <img src={banner} style={{ width: '100%', height: 'auto', opacity: '1' }} alt="Banner" />
            </Row>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '40px' }}>
                <div style={{ width: '500px', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <h2>Log in to Your Account</h2>
                    <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="text-center mt-4">
                            <button style={{ width: '300px', padding: '4px', borderRadius: '10px', background: '#665651', color: 'white' }} onClick={handleLogin}>
                                Sign In
                            </button>
                        </div>
                    </Form>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{modalMessage}</p>
            </Modal.Body>
            </Modal>
    
        </div>
    );
};

export default LoginScreen;
