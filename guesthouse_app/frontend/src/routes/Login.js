import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useHistory
import { Row, Form } from 'react-bootstrap';
import '../index.css';
import banner from '../assets/parkavenue_banner.png';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        // Perform authentication logic here
        // For simplicity, let's just log the username and password for now
        console.log('Username:', username);
        console.log('Password:', password);

        // Check credentials (replace with your authentication logic)
        if (username === '1' && password === '123') {
            // Use Link to navigate to /home route
            navigate('/home');
        }
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
        </div>
    );
};

export default LoginScreen;
