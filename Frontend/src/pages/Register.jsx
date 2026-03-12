import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/auth/register', { name, email, password });
      
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal, silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="auth-glass-card shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4 fw-bold">Register</h2>
          
          {error && <Alert variant="danger" className="border-0 rounded-3">{error}</Alert>}

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-4" controlId="formBasicName">
              <Form.Label className="fw-light mb-0">Full Name</Form.Label>
              <Form.Control 
                type="text" 
                className="custom-input"
                value={name}
                placeholder="masukkan nama lengkap"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="fw-light mb-0">Email</Form.Label>
              <Form.Control 
                type="email" 
                className="custom-input"
                value={email}
                placeholder="masukkan email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label className="fw-light mb-0">Password</Form.Label>
              <Form.Control 
                type="password" 
                className="custom-input"
                value={password}
                placeholder="masukkan password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-auth mb-4" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign Up'}
            </Button>

            <div className="text-center" style={{ fontSize: '0.9rem' }}>
              Already have an account? <Link to="/login" className="auth-link">Log in</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;