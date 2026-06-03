import React from 'react';
import { Outlet } from 'react-router-dom';
import CartSidebar from '../components/CartSidebar';
import WishlistSidebar from '../components/WishlistSidebar';
import WelcomePopup from '../components/WelcomePopup';
import WhatsAppWidget from '../components/WhatsAppWidget';

const StorefrontLayout = () => {
  return (
    <>
      <WelcomePopup />
      <WhatsAppWidget />
      <CartSidebar />
      <WishlistSidebar />
      <Outlet />
    </>
  );
};

export default StorefrontLayout;
