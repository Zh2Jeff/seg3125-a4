import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  const { cartItems } = useCart();
  const totalQty = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">Goodwear Store</Link>
        <ul className="nav">
          <li className="nav-item"><Link to="/"      className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/shop"  className="nav-link">Shop</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link">About Us</Link></li>
        </ul>
        <Link to="/cart" className="position-relative text-dark">
          <FaShoppingCart size={24}/>
          {totalQty > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalQty}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}