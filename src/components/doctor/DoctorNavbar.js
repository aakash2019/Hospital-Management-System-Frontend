import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logoutDoctor } from '../../redux/actions/doctorActions';
import { Button } from 'react-bootstrap';

const DoctorNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const doctorData = useSelector(state => state.doctor.doctorData); // Get doctor data from Redux

    const handleLogout = async () => {
      const success = await dispatch(logoutDoctor());
      if (success) {
          navigate('/');
      } else {
          console.error("Logout failed");
      }
    };

    const goToHospital = async () => {
      navigate('/doctor/hospital', {state: { doctorData }});
    };

    const goToHomepage = async () => {
      navigate('/doctor/homepage', {state: { doctorData }});
    };

    const goToPatients = async () => {
      navigate('/doctor/patients', {state: { doctorData }});
    };

    const goToRequests = async () => {
      navigate('/doctor/request', {state: { doctorData }});
    };

    const goToProfile = async () => {
      navigate('/doctor/profile', {state: { doctorData }});
    };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={ goToHomepage }>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={ goToHomepage }>Home</Nav.Link>
              <Nav.Link onClick={ goToHospital }>My Hospital</Nav.Link>
              <Nav.Link onClick={ goToPatients }>Patients</Nav.Link>
              <Nav.Link onClick={ goToRequests }>Requests</Nav.Link>
              <Nav.Link onClick={ goToProfile }>Profile</Nav.Link>
            </Nav>
            <Button onClick={handleLogout} variant="outline-danger">Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default DoctorNavbar;