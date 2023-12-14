import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:2410/userdata');
      const users = response.data;
      const user = users.find(u => u.email === email);

      if (user && user.password === password) {
        console.log('Login successful');
        alert('Login successful');
        navigate('/allUser');
      } else {
        console.log('Invalid email or password');
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleResetPassword = async (users) => {
    let  obj ={
      email: resetEmail,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    }
    console.log(obj);
    try {
      const response = await axios.put('http://localhost:2410/resetpassword',obj );
  
    console.log("line 51",response.data);

      if (response.data.success) {
        console.log("line 54",response.data);
        setResetSuccess(true);
      } 
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  
    setShowResetModal(true);
    setResetSuccess(true);
  };
  

  const handleCloseResetModal = () => {
    setShowResetModal(false);
    setResetSuccess(false);
  };

  const handleSignUpClick = () => {
    navigate('/registration');
  };

  return (
    <div className="App">
      <Form onSubmit={handleLogin}>
        <h2 className="text-center">Login Form</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ display: 'flex' }}>
          <Button variant="link" onClick={() => setShowResetModal(true)}>
            Forgot Password
          </Button>

          <Button variant="link" onClick={handleSignUpClick}>
            Sign Up
          </Button>
        </div>
        <br />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <Modal show={showResetModal} onHide={handleCloseResetModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!resetSuccess ? (
            <Form>
            {/* New email field in the modal */}
            <Form.Group controlId="formResetEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

              <Button variant="primary" onClick={handleResetPassword}>
                Reset
              </Button>
            </Form>
          ) : (
            <p>Password Reset Successfully!</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
