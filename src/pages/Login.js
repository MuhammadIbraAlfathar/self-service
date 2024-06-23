import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Login() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="text-center mb-4">
          <img
              // src={require('./logoUnindra.png').default}
              height="50"
              alt="Unindra Food Court Logo"
            />
            <h2 className="mt-3">Welcome To Unindra Food Court</h2>
          </div>

          <Form className="mx-auto" style={{ maxWidth: '300px' }}>
            <Form.Group controlId="formBasicEmail" className="mt-2">
              <Form.Control type="email" placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button border="2" variant="primary" type="submit" className="w-100 mt-3 ">
              Log In
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account?</span>
            <a href="/register" className="ml-1">
              Sign Up
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
