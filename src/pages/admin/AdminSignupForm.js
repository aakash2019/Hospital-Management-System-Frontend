// AdminSignupForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initializeHospitals, signupAdmin } from '../../redux/actions/adminActions';
import { Card, Form, Button } from 'react-bootstrap';

const AdminSignupForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.admin);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Trigger admin signup
      const success = await dispatch(signupAdmin(formData));

      if (success) {
        // Initialize hospitals after successful signup
        
        const hospitalsInitialized = await dispatch(initializeHospitals());
        console.log(hospitalsInitialized);
        
        if (hospitalsInitialized) {
          console.log("Hospitals successfully initialized.");
          navigate('/admin/homepage');
        } else {
          console.error("Failed to initialize hospitals.");
        }
      } else {
        console.error("Signup failed.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
    }
  };
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: '25rem', marginTop: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Card.Body>
          <Card.Title>Admin Signup</Card.Title>
          {loading && <p>Signing up...</p>}
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminSignupForm;
