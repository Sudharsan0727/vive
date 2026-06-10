"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BESTSELLERS, FEATURED_PRODUCTS } from '@/constants/BrandAssets';

const allProducts = [...BESTSELLERS, ...FEATURED_PRODUCTS];

const getProductPriceForSize = (item, sizeName) => {
  const originalProduct = allProducts.find(p => p.id === item.id);
  if (!originalProduct) return item.price;
  
  const unit = (originalProduct.netQuantity || '100 ml').toLowerCase().includes('g') ? 'g' : 'ml';
  const baseQty = parseInt(originalProduct.netQuantity) || 100;
  const basePrice = parseInt(originalProduct.price.replace(/[^\d]/g, ''));

  const variant0 = `${baseQty} ${unit}`;
  const variant1 = `${Math.round(baseQty * 1.5)} ${unit}`;
  const variant2 = `${baseQty * 2} ${unit}`;

  const targetSizeLower = sizeName.toLowerCase().replace(/\s/g, '');

  if (targetSizeLower === variant1.toLowerCase().replace(/\s/g, '')) {
    return `₹${Math.round(basePrice * 1.4)}`;
  } else if (targetSizeLower === variant2.toLowerCase().replace(/\s/g, '')) {
    return `₹${Math.round(basePrice * 1.8)}`;
  } else {
    return originalProduct.price; // base price
  }
};

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = (typeof window !== "undefined" ? localStorage.getItem('vive_cart') : null);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      // Silently recover from corrupted data
      localStorage.removeItem('vive_cart');
      return [];
    }
  });

  // Wishlist State
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = (typeof window !== "undefined" ? localStorage.getItem('vive_wishlist') : null);
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (e) {
      // Silently recover from corrupted data
      localStorage.removeItem('vive_wishlist');
      return [];
    }
  });

  const isCartOpenRef = React.useRef(isCartOpen);
  const isWishlistOpenRef = React.useRef(isWishlistOpen);

  useEffect(() => {
    isCartOpenRef.current = isCartOpen;
  }, [isCartOpen]);

  useEffect(() => {
    isWishlistOpenRef.current = isWishlistOpen;
  }, [isWishlistOpen]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return total + price * item.quantity;
  }, 0);

  const wishlistCount = wishlist.length;

  // Promo / Coupon State
  const [appliedPromo, setAppliedPromo] = useState(() => {
    return (typeof window !== "undefined" ? localStorage.getItem('vive_applied_promo') : null) || '';
  });
  const [promoDiscount, setPromoDiscount] = useState(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem('vive_promo_discount') : null);
    return saved ? parseInt(saved) : 0;
  });
  const [promoError, setPromoError] = useState('');

  // Shipping Courier Cost State (₹40 or ₹60)
  const [shippingCost, setShippingCost] = useState(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem('vive_shipping_cost') : null);
    return saved ? parseInt(saved) : 40; // Default to ST Courier
  });

  useEffect(() => {
    if (typeof window !== "undefined") { localStorage.setItem('vive_applied_promo', appliedPromo); };
    if (typeof window !== "undefined") { localStorage.setItem('vive_promo_discount', promoDiscount.toString()); }
  }, [appliedPromo, promoDiscount]);

  useEffect(() => {
    if (typeof window !== "undefined") { localStorage.setItem('vive_shipping_cost', shippingCost.toString()); }
  }, [shippingCost]);

  useEffect(() => {
    if (!appliedPromo) {
      setPromoDiscount(0);
      return;
    }
    
    // Fetch coupons created in admin panel
    const savedCoupons = typeof window !== "undefined" ? localStorage.getItem('vive_admin_coupons') : null;
    const adminCoupons = savedCoupons ? JSON.parse(savedCoupons) : [];
    
    const activeCoupon = adminCoupons.find(c => c.code === appliedPromo && c.isActive);
    
    if (activeCoupon) {
      if (cartTotal < activeCoupon.minOrder) {
        setPromoDiscount(0); // Cart value dropped below minimum
      } else {
        let discount = 0;
        if (activeCoupon.type === 'percentage') {
          discount = Math.round(cartTotal * (activeCoupon.discountValue / 100));
          if (activeCoupon.maxDiscount && discount > activeCoupon.maxDiscount) {
            discount = activeCoupon.maxDiscount;
          }
        } else if (activeCoupon.type === 'flat') {
          discount = activeCoupon.discountValue;
        }
        setPromoDiscount(discount);
      }
    } else {
      setPromoDiscount(0);
    }
  }, [cart, appliedPromo, cartTotal]);

  const applyPromoCode = (code) => {
    const formattedCode = code.trim().toUpperCase();
    
    const savedCoupons = typeof window !== "undefined" ? localStorage.getItem('vive_admin_coupons') : null;
    const adminCoupons = savedCoupons ? JSON.parse(savedCoupons) : [];
    
    const activeCoupon = adminCoupons.find(c => c.code === formattedCode && c.isActive);

    if (activeCoupon) {
      if (cartTotal < activeCoupon.minOrder) {
        setPromoError(`Valid on order total above ₹${activeCoupon.minOrder}+`);
        return { success: false, error: `Valid on order total above ₹${activeCoupon.minOrder}+` };
      }
      setAppliedPromo(formattedCode);
      setPromoError('');
      return { success: true };
    } else {
      setPromoError('This coupon is invalid or expired.');
      return { success: false, error: 'This coupon is invalid or expired.' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    setPromoDiscount(0);
    setPromoError('');
  };

  useEffect(() => {
    if (typeof window !== "undefined") { localStorage.setItem('vive_cart', JSON.stringify(cart)); }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") { localStorage.setItem('vive_wishlist', JSON.stringify(wishlist)); }
  }, [wishlist]);

  // Cart Actions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const updateSize = (productId, selectedSize) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newPrice = getProductPriceForSize(item, selectedSize);
          return { ...item, selectedSize, price: newPrice };
        }
        return item;
      })
    );
  };

  // Wishlist Actions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
    setIsWishlistOpen(true);
    setIsCartOpen(false);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter(item => item.id !== productId));
  };



  const triggerFlyAnimation = (e, imageUrl) => {
    if (!e || !imageUrl) return;

    const cartIcon = document.getElementById('nav-cart-btn');
    if (!cartIcon) return;

    // Create a floating image flyer (enlarged for better visibility)
    const flyer = document.createElement('img');
    flyer.src = imageUrl;
    flyer.style.position = 'fixed';
    flyer.style.width = '85px';
    flyer.style.height = '85px';
    flyer.style.objectFit = 'contain';
    flyer.style.borderRadius = '50%';
    flyer.style.border = '2.5px solid #8A1B5E';
    flyer.style.backgroundColor = 'white';
    flyer.style.padding = '5px';
    flyer.style.boxShadow = '0 12px 30px rgba(138, 27, 94, 0.4)';
    flyer.style.zIndex = '9999';
    flyer.style.pointerEvents = 'none';
    flyer.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.40, 1)'; // slowed down for luxury feel

    const rect = e.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2 - 42.5;
    const startY = rect.top + rect.height / 2 - 42.5;

    flyer.style.left = `${startX}px`;
    flyer.style.top = `${startY}px`;
    flyer.style.transform = 'scale(1)';
    flyer.style.opacity = '1';

    document.body.appendChild(flyer);

    const cartRect = cartIcon.getBoundingClientRect();
    const targetX = cartRect.left + cartRect.width / 2 - 17.5;
    const targetY = cartRect.top + cartRect.height / 2 - 17.5;

    // Force reflow
    flyer.offsetWidth;

    // Slide/shrink flight path
    flyer.style.left = `${targetX}px`;
    flyer.style.top = `${targetY}px`;
    flyer.style.width = '35px';
    flyer.style.height = '35px';
    flyer.style.transform = 'scale(0.3) rotate(540deg)';
    flyer.style.opacity = '0.3';

    setTimeout(() => {
      // Wiggle feedback on Cart button
      cartIcon.classList.add('scale-125', 'text-brand-magenta');
      setTimeout(() => {
        cartIcon.classList.remove('scale-125', 'text-brand-magenta');
      }, 500);
      flyer.remove();

      // Dynamically create the custom 'Added to bag' dropdown toast matching the user's reference image
      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.zIndex = '105';
      toast.style.backgroundColor = '#1E2229'; // dark charcoal/navy blue matching uploaded design
      toast.style.borderRadius = '6px';
      toast.style.padding = '8px 16px';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '12px';
      toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      toast.style.border = '1px solid rgba(255,255,255,0.1)';
      toast.style.pointerEvents = 'none';
      toast.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      const updatePosition = (isInitial = false) => {
        if (!document.body.contains(toast)) return;
        const isSidebarActive = isCartOpenRef.current || isWishlistOpenRef.current;
        const cartLatestRect = cartIcon.getBoundingClientRect();
        
        if (isSidebarActive) {
          toast.style.left = 'auto';
          toast.style.top = '100px';
          toast.style.right = '420px';
          toast.style.transform = isInitial ? 'translateX(50px)' : 'translateX(0)';
        } else {
          toast.style.right = 'auto';
          toast.style.top = isInitial ? `${cartLatestRect.bottom - 10}px` : `${cartLatestRect.bottom + 12}px`;
          toast.style.left = `${cartLatestRect.left + cartLatestRect.width / 2 - 90}px`;
          toast.style.transform = 'none';
        }
      };

      // Initial start position for animation
      updatePosition(true);
      
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      // Inner Product Image Box
      const imgBox = document.createElement('div');
      imgBox.style.width = '32px';
      imgBox.style.height = '38px';
      imgBox.style.backgroundColor = 'white';
      imgBox.style.borderRadius = '3px';
      imgBox.style.display = 'flex';
      imgBox.style.alignItems = 'center';
      imgBox.style.justifyContent = 'center';
      imgBox.style.padding = '2px';
      imgBox.style.flexShrink = '0';

      const toastImg = document.createElement('img');
      toastImg.src = imageUrl;
      toastImg.style.maxHeight = '100%';
      toastImg.style.maxWidth = '100%';
      toastImg.style.objectFit = 'contain';
      imgBox.appendChild(toastImg);

      // Inner Text label
      const label = document.createElement('span');
      label.innerText = 'Added to bag';
      label.style.color = '#FFFFFF';
      label.style.fontWeight = '700';
      label.style.fontSize = '14px';
      label.style.whiteSpace = 'nowrap';

      toast.appendChild(imgBox);
      toast.appendChild(label);
      document.body.appendChild(toast);

      // Trigger enter transition
      toast.offsetHeight;
      updatePosition(false); // Move to final resting position
      toast.style.opacity = '1';

      // Continuously adjust position if sidebar state changes while visible
      const toastInterval = setInterval(() => updatePosition(false), 50);

      // Auto-remove after 2.5 seconds
      setTimeout(() => {
        clearInterval(toastInterval);
        toast.style.opacity = '0';
        const isSidebarActive = isCartOpenRef.current || isWishlistOpenRef.current;
        if (isSidebarActive) {
          toast.style.transform = 'translateX(50px)';
        } else {
          toast.style.top = `${cartIcon.getBoundingClientRect().bottom - 10}px`; // Slide back up
        }
        setTimeout(() => {
          toast.remove();
        }, 400);
      }, 2500);

    }, 1200); // Trigger when flight finishes
  };

  return (
    <StoreContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      updateSize,
      clearCart, 
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      wishlist,
      toggleWishlist,
      removeFromWishlist,
      isWishlistOpen,
      setIsWishlistOpen,
      wishlistCount,
      triggerFlyAnimation,
      appliedPromo,
      promoDiscount,
      promoError,
      setPromoError,
      applyPromoCode,
      removePromoCode,
      shippingCost,
      setShippingCost
    }}>
      {children}
    </StoreContext.Provider>
  );
};
