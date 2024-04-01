import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Row, Form, Modal, Button } from 'react-bootstrap';
import '../index.css';
import banner from '../assets/parkavenue_banner.png';

const RegistrationScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Add your registration logic here
            setModalMessage('User successfully registered');
        } catch (error) {
            console.error('Error during registration:', error.message);
            setModalMessage(`Error during registration: ${error.message}`);
        }
        setShowRegisterModal(true);
    };

    return (
        <div style={{ background: '#F2EFEB', color: '#665651', minHeight: '100vh', overflowX: 'hidden' }}>
            <Row className="pt-5">
                <img src={banner} style={{ width: '100%', height: 'auto', opacity: '1' }} alt="Banner" />
            </Row>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '40px' }}>
                <div style={{ width: '500px', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <h2>Create an Account</h2>
                    <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

                    <Button variant="primary" onClick={() => setShowRegisterModal(true)}>
                        Register
                    </Button>

                    <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
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
                            <div className="text-center mt-4">
                                <Button variant="primary" onClick={handleRegister}>
                                    Register
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{modalMessage}</p>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default RegistrationScreen;
