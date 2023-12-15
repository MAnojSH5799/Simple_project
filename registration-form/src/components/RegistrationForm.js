import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    dob: '',
    country: '',
    state: '',
    city: '',
    zip: '',
  //  interests: [],
  //  profilePicture: null,
    password: '',
  });

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'Australia',
    'France',
    'Japan',
    'India',
    'Brazil',
    'South Africa',
  ];

  const states = [
    'California',
    'New York',
    'Ontario',
    'Bavaria',
    'New South Wales',
    'Île-de-France',
    'Tokyo',
    'Maharashtra',
    'São Paulo',
    'Gauteng',
  ];

  const interestOptions = ['Reading', 'Writing', 'Traveling', 'Playing'];

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormData((prevData) => {
      if (type === 'checkbox') {
        const currentInterests = prevData.interests || [];
        return {
          ...prevData,
          interests: checked ? [...currentInterests, value] : currentInterests.filter((interest) => interest !== value),
        };
      } else {
        return {
          ...prevData,
          [name]: type === 'file' ? files[0] : value,
        };
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  // console.log(formData)
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      gender: event.target.gender.value,
      dob: event.target.dob.value,
      city: event.target.city.value,
      country: event.target.country.value,
      zip: event.target.zip.value,
      password: event.target.password.value,
      state: event.target.state.value,
    };
    
    console.log('Form Data:', formData);
  
  
    try {
      const response = await axios.post(`https://simple-app-ari4.onrender.com/postusers`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Server Response:', response.data);
      alert('Registration successful');
      navigate('/allUser');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };
  
  

  return (

    <div className="App">
    <Form onSubmit={handleSubmit}>
    <h2 className="text-center">Registration Form</h2>
      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </Col>
        <Col xs={12}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>

          </Form.Control>
        </Col>
        <Col xs={12}>
          <Form.Label>DOB</Form.Label>
          <Form.Control type="date" placeholder="DOB" name="dob" value={formData.dob} onChange={handleChange} required />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Country</Form.Label>
          <Form.Control as="select" name="country" value={formData.country} onChange={handleChange} required>
          <option value="" disabled>
              Select Country
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col xs={12}>
          <Form.Label>State</Form.Label>
          <Form.Control as="select" name="state" value={formData.state} onChange={handleChange} required>
          <option value="" disabled>
              Select State
            </option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>City</Form.Label>
          <Form.Control placeholder="City" name="city" value={formData.city} onChange={handleChange} />
        </Col>
        <Col xs={12}>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control placeholder="Zip Code" name="zip" value={formData.zip} onChange={handleChange} required />
        </Col>
      </Row>

      {/* <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Area of Interest</Form.Label>
          <Form.Check
            type="checkbox"
            label="Reading"
            name="interests"
            value="Reading"
            checked={formData.interests.includes('Reading')}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Writing"
            name="interests"
            value="Writing"
            checked={formData.interests.includes('Writing')}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Traveling"
            name="interests"
            value="Traveling"
            checked={formData.interests.includes('Traveling')}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Playing"
            name="interests"
            value="Playing"
            checked={formData.interests.includes('Playing')}
            onChange={handleChange}
          />
        </Col>
      </Row> */}

      <Row className="mb-3">
        {/* <Col xs={12}>
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control type="file" name="profilePicture" onChange={handleChange} />
        </Col> */}
        <Col xs={12}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>

  );
};

export default RegistrationForm;
