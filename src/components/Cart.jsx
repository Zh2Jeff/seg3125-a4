import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';

export default function Cart() {
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <h2>Your Cart</h2>
        <p className="text-muted">Your cart is currently empty.</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Your Cart</h2>
      <ListGroup variant="flush" className="mb-4">
        {cartItems.map(item => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{item.name}</h5>
              <small className="text-muted">Qty: {item.qty}</small>
            </div>
            <div>
              <strong>${(item.price * item.qty).toFixed(2)}</strong>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Row className="align-items-center mb-4">
        <Col><h5>Subtotal:</h5></Col>
        <Col className="text-end"><h5>${subtotal}</h5></Col>
      </Row>

      <Row className="g-3">
        <Col>
          <Button variant="outline-danger" onClick={clearCart} className="w-100">
            Clear Cart
          </Button>
        </Col>
        <Col>
          <Link to="/checkout" className="btn btn-primary w-100">
            Proceed to Checkout
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
