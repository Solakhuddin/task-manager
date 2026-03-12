import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal, periksa email dan password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="auth-glass-card shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-5 fw-bold">Login</h2>
          
          {error && <Alert variant="danger" className="border-0 rounded-3">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="fw-light mb-0">Email</Form.Label>
              <Form.Control 
                type="email" 
                className="custom-input"
                value={email}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-auth mb-4" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Log in'}
            </Button>

            <div className="text-center" style={{ fontSize: '0.9rem' }}>
              Don't have an account? <Link to="/register" className="auth-link">Register</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;