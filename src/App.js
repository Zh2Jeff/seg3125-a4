import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 命名导入 CartProvider
import { CartProvider } from './context/CartContext.js';

import Navbar       from './components/Navbar';
import Home         from './components/Home';
import Shop         from './components/Shop';
import Cart          from './components/Cart';
import Checkout     from './components/Checkout';
import Confirmation from './components/Confirmation';

export default function App() {
  return (
    
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/shop"         element={<Shop />} />
          <Route path="/cart"         element={<Cart />} />
          <Route path="/checkout"     element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
