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
import StorefrontLayout from './layouts/StorefrontLayout';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductEdit from './pages/admin/AdminProductEdit';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminBanner from './pages/admin/AdminBanner';
import AdminInstagram from './pages/admin/AdminInstagram';
import AdminTestimonials from './pages/admin/AdminTestimonials';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Storefront Routes */}
          <Route element={<StorefrontLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Route>

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/edit/:id" element={<AdminProductEdit />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="homepage/banner" element={<AdminBanner />} />
            <Route path="homepage/instagram" element={<AdminInstagram />} />
            <Route path="homepage/testimonials" element={<AdminTestimonials />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
