import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import WishlistPage from './pages/WishlistPage';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import OrderSuccess from './pages/OrderSuccess';

import { StoreProvider } from './context/StoreContext';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import WelcomePopup from './components/WelcomePopup';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  return (
    <StoreProvider>
      <WelcomePopup />
      <WhatsAppWidget />
      <BrowserRouter>
        <CartSidebar />
        <WishlistSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
