import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    couponInput: ''
  });
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const isValid = form.couponInput.trim().toUpperCase() === 'DISCOUNT10';
  const discount = isValid ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    clearCart();
    navigate('/confirmation');
  };

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Checkout</h2>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="checkoutName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="checkoutAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="checkoutEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="checkoutPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="checkoutCoupon">
          <Form.Label>Coupon Code</Form.Label>
          <Form.Control
            type="text"
            name="couponInput"
            placeholder="Enter coupon code"
            value={form.couponInput}
            onChange={handleChange}
          />
          {isValid && (
            <Form.Text className="text-success">
              Coupon applied! You got 10% off.
            </Form.Text>
          )}
        </Form.Group>

        <hr />

        <Row className="mb-3">
          <Col>Subtotal:</Col>
          <Col className="text-end">${subtotal.toFixed(2)}</Col>
        </Row>
        {isValid && (
          <Row className="mb-3">
            <Col>Discount:</Col>
            <Col className="text-end">- ${discount.toFixed(2)}</Col>
          </Row>
        )}
        <Row className="mb-4">
          <Col><strong>Total:</strong></Col>
          <Col className="text-end"><strong>${total.toFixed(2)}</strong></Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Place Order
        </Button>
      </Form>
    </Container>
  );
}
