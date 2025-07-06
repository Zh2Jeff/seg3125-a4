import React, { useState } from 'react';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

export default function Shop() {
  const { addToCart } = useCart();
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All Categories');

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === 'All Categories' || p.category === category);

  return (
    <Container className="py-4">
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Tops</option>
            <option>Bottoms</option>
            <option>Outerwear</option>
            <option>Footwear</option>
            <option>Accessories</option>
          </Form.Select>
        </Col>
        <Col md={3}>
            <Alert variant="info" className="mb-0 text-center">
                🎁 Use code <strong>DISCOUNT10</strong> for 10% off!
            </Alert>
        </Col>
      </Row>

      <Row className="gy-4">
        {filtered.map(item => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={item.image}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className="text-muted">{item.category}</Card.Text>
                <div className="mt-auto">
                  <h5 className="mb-3">${item.price.toFixed(2)}</h5>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}