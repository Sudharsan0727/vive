import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BESTSELLERS, FEATURED_PRODUCTS } from '../constants/BrandAssets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const getProductTabsData = (name) => {
  if (!name) return { ingredients: [], howToUse: [], rituals: '' };
  const n = name.toLowerCase();
  if (n.includes('kumkumadi')) {
    return {
      ingredients: [
        { name: 'Kashmiri Saffron', role: 'Brightens skin tone & adds golden radiance' },
        { name: 'Sandalwood', role: 'Soothes redness & fights irritation' },
        { name: 'Licorice Extract', role: 'Reduces dark spots & hyperpigmentation' },
        { name: 'Vetiver', role: 'Cooling agent & skin rejuvenator' }
      ],
      howToUse: [
        'Cleanse your face thoroughly with a mild natural wash.',
        'Take 3-4 drops of Kumkumadi Oil onto your palm.',
        'Gently dab and massage the oil in upward circular motions.',
        'Leave it overnight for best results. Use daily as a nighttime ritual.'
      ],
      rituals: 'Saffron Rejuvenation Night Ritual'
    };
  } else if (n.includes('nalugumavu')) {
    return {
      ingredients: [
        { name: 'Green Gram', role: 'Gentle organic exfoliator & cleanser' },
        { name: 'Wild Turmeric', role: 'Antibacterial, brightens & purifies skin' },
        { name: 'Rose Petals', role: 'Tones, hydrates & imparts natural fragrance' },
        { name: 'Neem & Tulsi', role: 'Combats body odor & skin breakouts' }
      ],
      howToUse: [
        'Mix 2-3 tablespoons of Nalugumavu powder with water (or rose water for extra hydration).',
        'Make a smooth, paste-like consistency.',
        'Apply evenly all over your face and body.',
        'Scrub gently in circular motions and rinse thoroughly with water.'
      ],
      rituals: 'Traditional Herbal Cleansing Ritual'
    };
  } else if (n.includes('hair oil') || n.includes('hair strength') || n.includes('serum')) {
    return {
      ingredients: [
        { name: 'Bhringraj', role: 'Known as the "King of Hair" for growth' },
        { name: 'Amla (Gooseberry)', role: 'Rich in Vitamin C, prevents premature graying' },
        { name: 'Hibiscus', role: 'Conditions hair, prevents dryness & split ends' },
        { name: 'Coconut & Sesame Oil', role: 'Deeply nourishes hair roots & scalp' }
      ],
      howToUse: [
        'Section your hair and apply a few drops directly to the scalp.',
        'Massage gently using fingertips in circular motions for 5-10 minutes.',
        'Apply the oil along the length of your hair to the tips.',
        'Leave it on for at least 1 hour or overnight before washing.'
      ],
      rituals: 'Root-to-Tip Strength Ritual'
    };
  } else if (n.includes('conditioner') || n.includes('shampoo')) {
    return {
      ingredients: [
        { name: 'Coconut Milk', role: 'Deeply conditions, smoothens frizz & adds shine' },
        { name: 'Shikakai', role: 'Natural mild cleanser that retains scalp oils' },
        { name: 'Aloe Vera', role: 'Hydrates scalp & leaves hair silky smooth' },
        { name: 'Argan Oil', role: 'Restores elasticity & tames stubborn flyaways' }
      ],
      howToUse: [
        'Wet your hair thoroughly and apply an adequate amount of shampoo.',
        'Massage into a rich, natural lather and rinse thoroughly.',
        'Apply the Coconut Conditioner from mid-lengths to the ends.',
        'Leave it on for 2-3 minutes, then rinse with cool water to lock in shine.'
      ],
      rituals: 'Satin Smooth Hair Care Ritual'
    };
  }
  return {
    ingredients: [
      { name: 'Pure Botanicals', role: '100% natural, active therapeutic ingredients' },
      { name: 'Essential Oils', role: 'Natural aromatic extracts for holistic wellness' },
      { name: 'Vitamin E', role: 'Powerful antioxidant to protect and hydrate skin' }
    ],
    howToUse: [
      'Take a small amount of product in your clean hands.',
      'Massage gently onto the target area.',
      'Allow it to absorb fully into the skin.',
      'Use consistently twice daily for the best botanical results.'
    ],
    rituals: 'Standard Daily Wellness Ritual'
  };
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist, triggerFlyAnimation } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('Most Recent');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, title: '', content: '' });
  const [reviewsList, setReviewsList] = useState([
    { name: "Ananya Sharma", rating: 5, date: "11/02/2026", title: "The Ritual That Transformed My Skin", content: "I’ve tried countless serums, but Vive’s Kumkumadi Oil is the only one that truly worked. My skin feels like silk and has a natural radiance I haven't seen in years." },
    { name: "Kavya Iyer", rating: 5, date: "11/02/2026", title: "Golden Glow in a Bottle", content: "The Vive Vitamin C serum is simply transformative. It cleared my stubborn spots in just two weeks. A staple in my morning ritual now." },
    { name: "Rohan Deshmukh", rating: 5, date: "11/02/2026", title: "Purity Meets Deep Hydration", content: "Finally a cleanser that respects my skin barrier. Vive's botanical blend leaves me feeling refreshed and deeply hydrated, not stripped. Pure magic." },
    { name: "Meera Nair", rating: 5, date: "10/02/2026", title: "Ancient Wisdom, Modern Results", content: "The Nalugumavu powder is a revelation. It reminds me of my grandmother's rituals but with a much finer, more luxurious texture. My skin is glowing." },
    { name: "Arjun Varma", rating: 4, date: "09/02/2026", title: "Best Beard & Face Care", content: "I use the face wash and the hair oil for my beard. The scent is incredibly grounding and masculine in a natural way." },
    { name: "Sanya Malhotra", rating: 5, date: "08/02/2026", title: "Zero Breakouts Since Vive", content: "I have very sensitive skin and used to break out every time I tried a new product. With Vive, my skin is calm, clear, and finally happy." },
    { name: "Deepak Gupta", rating: 5, date: "07/02/2026", title: "Quality You Can Feel", content: "The packaging, the texture, and the results—everything about Vive screams quality." },
    { name: "Ishani Bose", rating: 5, date: "06/02/2026", title: "The Perfect Gift", content: "I bought the gift combo for my mother and she hasn't stopped talking about it. The Kumkumadi oil has significantly reduced her fine lines." },
    { name: "Vikram Seth", rating: 5, date: "05/02/2026", title: "Scalp Health Improved", content: "The Herbal Hair Oil fixed my dry scalp issues in just three uses. It's lightweight and smells like a spa. Best hair investment I've made." },
    { name: "Tara D'Souza", rating: 5, date: "04/02/2026", title: "My Skin is Addicted", content: "Vive products have become the highlight of my morning. They make me feel pampered and the results are undeniable. 5 stars all the way!" },
    { name: "Sneha Reddy", rating: 5, date: "03/02/2026", title: "Glow Serum is my HG", content: "This serum changed my life. My hyperpigmentation is almost gone and my skin looks so healthy." },
    { name: "Aman Khan", rating: 4, date: "02/02/2026", title: "Natural soap that actually works", content: "The charcoal soap is great for my oily skin. It cleanses deeply without any irritation." },
    { name: "Pooja Hegde", rating: 5, date: "01/02/2026", title: "The hair serum is life-changing", content: "I've tried many luxury brands, but Vive's hair serum is the best. It's not greasy at all and provides a fresh look throughout the day." },
    { name: "Rahul Dravid", rating: 5, date: "31/01/2026", title: "Consistency is key, Vive delivers", content: "I've been using the entire range for 3 months now. The quality is consistent and the results are visible. My face feels fresh and looks healthy after washing." },
    { name: "Aditi Rao", rating: 5, date: "30/01/2026", title: "Smells like a garden", content: "Opening the Kumkumadi oil is an experience. It smells so fresh and natural, unlike chemical perfumes." },
    { name: "Karthik Aryan", rating: 4, date: "29/01/2026", title: "Gentle for daily use", content: "Finally found a face wash that I can use twice a day without my skin feeling tight. Works well regularly." },
    { name: "Dia Mirza", rating: 5, date: "28/01/2026", title: "Eco-friendly and effective", content: "I love that Vive focuses on sustainability without compromising on product efficacy." },
    { name: "Ranbir Kapoor", rating: 5, date: "27/01/2026", title: "Premium feel, great results", content: "The glass bottles and the textures feel very high-end. My skin definitely feels more hydrated and bright." },
    { name: "Alia Bhatt", rating: 5, date: "26/01/2026", title: "My skin has never been clearer", content: "Vive's acne-prone skin routine is a savior. No more redness or unexpected breakouts. Pigmentation konjam reduce aachu." },
    { name: "Vijay Sethupathi", rating: 5, date: "25/01/2026", title: "Authentic Ayurveda", content: "You can tell these products are made with real ingredients. It's the real deal for natural care." }
  ]);

  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y });
  };

  // Combine product lists to find the current product
  const allProducts = [...BESTSELLERS, ...FEATURED_PRODUCTS];
  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];

  // Get related products (same category first)
  const getRelatedProducts = () => {
    const isHair = product.name.toLowerCase().includes('hair') || product.name.toLowerCase().includes('shampoo') || product.name.toLowerCase().includes('conditioner');
    let related = allProducts.filter(p => p.id !== product.id);
    related.sort((a, b) => {
      const aIsSameType = (a.name.toLowerCase().includes('hair') || a.name.toLowerCase().includes('shampoo') || a.name.toLowerCase().includes('conditioner')) === isHair;
      const bIsSameType = (b.name.toLowerCase().includes('hair') || b.name.toLowerCase().includes('shampoo') || b.name.toLowerCase().includes('conditioner')) === isHair;
      if (aIsSameType && !bIsSameType) return -1;
      if (!aIsSameType && bIsSameType) return 1;
      return 0;
    });
    return related.slice(0, 4);
  };

  // Dynamic Variants Configuration
  const unit = (product.netQuantity || '100 ml').toLowerCase().includes('g') ? 'G' : 'ML';
  const baseQty = parseInt(product.netQuantity) || 100;
  const basePrice = parseInt(product.price.replace(/[^\d]/g, ''));

  const variants = [
    { id: 0, size: `${baseQty} ${unit}`, price: product.price, numericPrice: basePrice },
    { id: 1, size: `${Math.round(baseQty * 1.5)} ${unit}`, price: `₹${Math.round(basePrice * 1.4)}`, numericPrice: Math.round(basePrice * 1.4), badge: 'BEST DEAL' },
    { id: 2, size: `${baseQty * 2} ${unit}`, price: `₹${Math.round(basePrice * 1.8)}`, numericPrice: Math.round(basePrice * 1.8) }
  ];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const [mainImage, setMainImage] = useState(product?.image);

  // Sync main image when product changes (e.g. from related products)
  useEffect(() => {
    setMainImage(product?.image);
  }, [product]);

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    addToCart({
      ...product,
      price: selectedVariant.price,
      netQuantity: selectedVariant.size,
      quantity
    });
    triggerFlyAnimation(e, product.image);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Scroll handling for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past the main buy box (roughly 800px)
      if (window.scrollY > 800) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Click outside / dropdown auto-close
  useEffect(() => {
    if (!isFilterOpen) return;
    const handleOutsideClick = () => {
      setIsFilterOpen(false);
    };
    const timer = setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isFilterOpen]);

  const getSortedReviews = () => {
    let list = [...reviewsList];
    if (reviewFilter === 'Highest Rated') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (reviewFilter === 'Lowest Rated') {
      list.sort((a, b) => a.rating - b.rating);
    }
    return list;
  };

  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-8 pb-20 bg-[#F8F9FA]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] text-gray-500 mb-6 border-b border-gray-200 pb-4">
            <Link to="/" className="hover:text-brand-magenta hover:underline transition-colors">Home</Link>
            <span>›</span>
            <span className="hover:text-brand-magenta hover:underline transition-colors cursor-pointer">
              {product.name.toLowerCase().includes('shampoo') || product.name.toLowerCase().includes('hair') || product.name.toLowerCase().includes('conditioner') ? 'Hair Care' : 'Face Care'}
            </span>
            <span>›</span>
            <span className="text-gray-400">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Column 1: Image Gallery */}
            <div className="w-full lg:w-[45%] flex flex-col md:flex-row gap-4 lg:sticky lg:top-35">
              {/* Thumbnails (Horizontal on mobile, Vertical on desktop) */}
              <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide">
                {(product.gallery || [product.image]).map((img, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setMainImage(img)}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-16 h-16 md:w-14 md:h-14 rounded border overflow-hidden cursor-pointer transition-all p-1 bg-white ${mainImage === img ? 'border-brand-magenta shadow-md ring-1 ring-brand-magenta' : 'border-gray-300 hover:border-brand-magenta'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div
                className="w-full order-1 md:order-2 relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={mainImage}
                  alt={product.name}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)'
                  }}
                  className="w-full h-auto object-cover aspect-square transition-transform duration-200 ease-out"
                />

                {!isZoomed && (
                  <div className="absolute bottom-4 right-4 text-gray-400 text-[10px] italic bg-white/80 px-2 py-1 rounded md:block hidden">
                    Roll over image to zoom in
                  </div>
                )}

                {/* Wishlist Button Overlay */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full backdrop-blur-md transition-all shadow-xl z-10 ${isInWishlist ? 'bg-brand-magenta text-white' : 'bg-white/80 text-gray-400 hover:text-brand-magenta'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.94-8.94 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Column 2: Center Info (Amazon Style) */}
            <div className="w-full lg:w-[32%] space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <Link to="/" className="text-brand-magenta hover:underline font-bold text-xs uppercase tracking-widest">Visit the Vive Beauty Store</Link>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0F1111] mt-1 mb-2">{product.name}</h1>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-yellow-500 text-sm">
                    {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                  </div>
                  <span className="text-brand-magenta hover:text-orange-700 hover:underline cursor-pointer text-xs font-bold">42 ratings</span>
                  <div className="h-4 w-[1px] bg-gray-300"></div>
                  <span className="text-brand-magenta hover:text-orange-700 hover:underline cursor-pointer text-xs font-bold">12 answered questions</span>
                </div>
              </div>

              {/* Size/Quantity Selector - Logic Driven */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-3 font-bold uppercase tracking-wider">Select Net Quantity</p>
                <div className="flex flex-wrap gap-4">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative min-w-[120px] p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${selectedVariant.id === variant.id
                        ? 'border-brand-magenta bg-brand-magenta/[0.03] shadow-md'
                        : 'border-gray-200 hover:border-brand-magenta/30 bg-white'
                        }`}
                    >
                      {variant.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-[8px] font-bold px-3 py-1 rounded-full shadow-sm tracking-tighter whitespace-nowrap">
                          {variant.badge}
                        </div>
                      )}
                      <img src={product.image} className="w-12 h-12 object-contain mb-2" alt="" />
                      <span className={`text-sm font-medium font-sans ${selectedVariant.id === variant.id ? 'text-brand-magenta' : 'text-brand-dark'}`}>
                        {variant.size}
                      </span>
                      <span className={`text-lg font-semibold font-sans ${selectedVariant.id === variant.id ? 'text-brand-magenta' : 'text-gray-900'}`}>
                        {variant.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-2">
                <span className="text-2xl font-light font-sans text-red-700">-15%</span>
                <span className="text-4xl font-display font-semibold text-[#0F1111] tracking-tighter">{selectedVariant.price}</span>
              </div>

              <div className="text-xs text-gray-500 font-display mb-4">M.R.P.: <span className="line-through">₹{Math.round(selectedVariant.numericPrice * 1.2)}</span></div>
              <div className="flex gap-2 items-center flex-wrap mb-4">
                <div className="bg-brand-cream/10 border border-brand-gold/20 rounded px-2 py-1 inline-block text-[10px] font-semibold text-brand-dark font-sans tracking-wider uppercase">Inclusive of all taxes</div>
                <div className="bg-brand-magenta/5 border border-brand-magenta/20 rounded px-2 py-1 inline-block text-[10px] font-semibold text-brand-magenta font-sans tracking-wider uppercase">
                  🎁 +{Math.round((parseInt(selectedVariant.price.replace(/[^\d]/g, ''), 10) || 0) * 0.1)} Loyalty Points
                </div>
              </div>

              {/* Premium Quality Badges */}
              <div className="flex gap-2 py-4 border-y border-gray-100 my-4 justify-between bg-white px-2 rounded-xl">
                <div className="flex flex-col items-center gap-1.5 text-center flex-1">
                  <span className="text-lg">🌿</span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">100% Organic</span>
                </div>
                <div className="w-[1px] bg-gray-100"></div>
                <div className="flex flex-col items-center gap-1.5 text-center flex-1">
                  <span className="text-lg">🐰</span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">Cruelty Free</span>
                </div>
                <div className="w-[1px] bg-gray-100"></div>
                <div className="flex flex-col items-center gap-1.5 text-center flex-1">
                  <span className="text-lg">🚫</span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">No Parabens</span>
                </div>
                <div className="w-[1px] bg-gray-100"></div>
                <div className="flex flex-col items-center gap-1.5 text-center flex-1">
                  <span className="text-lg">✨</span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">Artisanal</span>
                </div>
              </div>

              {/* About this item (Bullets) */}
              <div className="pt-2">
                <h3 className="font-bold text-sm mb-2 text-[#0F1111]">About this item</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed font-medium italic border-l-2 border-brand-magenta/40 pl-3">
                  {product.description || "Premium organic ritual crafted to enhance your natural beauty."}
                </p>
                <ul className="list-disc ml-5 space-y-2 text-sm text-[#0F1111]">
                  <li>Handcrafted with <span className="font-bold">100% Pure Botanical Extracts</span> for maximum potency.</li>
                  <li>Free from parabens, sulfates, and synthetic fragrances.</li>
                  <li>Energized with traditional Ayurvedic mantras during extraction.</li>
                  <li>Suitable for all skin types, including sensitive skin.</li>
                  <li>Sustainable glass packaging to preserve essential oil vitality.</li>
                </ul>
              </div>
            </div>

            {/* Column 3: Buy Box (Sticky) */}
            <div className="w-full lg:w-[23%] sticky top-40">
              <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm space-y-4">
                <div className="text-3xl font-display font-semibold text-brand-dark tracking-tighter">{selectedVariant.price}</div>

                {/* Loyalty Reward Points Badge */}
                <div className="bg-brand-cream/40 border border-brand-gold/30 rounded-lg p-3 text-xs text-brand-dark flex items-start gap-2.5 shadow-sm mt-1">
                  <span className="text-base text-brand-gold">✨</span>
                  <div>
                    <p className="font-bold text-brand-magenta text-[10px] uppercase tracking-wider">Vive Loyalty Club</p>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-normal">
                      Earn <span className="font-bold text-brand-dark">{Math.round((parseInt(selectedVariant.price.replace(/[^\d]/g, ''), 10) || 0) * 0.1)} Reward Points</span> on this purchase. Redeem for future wellness rituals!
                    </p>
                  </div>
                </div>

                <div className="text-sm space-y-1 hidden">
                  <div className="flex items-center gap-1 text-brand-magenta font-bold">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    Vive Prime Delivery
                  </div>
                  <p className="text-[#0F1111] font-bold">FREE delivery <span className="font-bold">Tomorrow, 9 May</span></p>
                  <p className="text-gray-500">Order within <span className="text-green-700">12 hrs 34 mins</span>. <span className="text-brand-magenta hover:underline cursor-pointer">Details</span></p>
                </div>

                <div className="text-xl font-serif font-bold text-green-700">In Stock</div>

                <div className="space-y-3">
                  <div className="relative border border-gray-300 rounded-lg bg-[#F0F2F2] shadow-sm hover:bg-[#E3E6E6] transition-colors">
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full appearance-none bg-transparent py-2 px-3 text-xs font-bold cursor-pointer focus:outline-none pr-8"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>Qty: {n}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-brand-magenta hover:bg-brand-dark text-white text-xs font-bold rounded-full shadow-lg transition-all active:scale-95 tracking-widest uppercase"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-full py-3 bg-brand-dark hover:bg-brand-magenta text-white text-xs font-bold rounded-full shadow-lg transition-all active:scale-95 tracking-widest uppercase"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="pt-4 flex items-center justify-center gap-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    <svg className="w-3.5 h-3.5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    100% Secure
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Authentic
                  </div>
                </div>


                <button
                  onClick={() => toggleWishlist(product)}
                  className="w-full py-2 border border-gray-300 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F0F2F2] hover:bg-[#E3E6E6] shadow-sm text-gray-600 transition-all"
                >
                  {isInWishlist ? 'Remove from Wish List' : 'Add to Wish List'}
                </button>
              </div>
            </div>
          </div>

          {/* Tabbed Wisdom Panel (Description, Ingredients, How to Use) */}
          <section className="mt-16 bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm max-w-[1600px] mx-auto mb-16">
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
              {[
                { id: 'description', label: 'Sacred Ritual' },
                { id: 'ingredients', label: 'Key Ingredients' },
                { id: 'how-to-use', label: 'How To Use (Ritual)' },
                { id: 'policies', label: 'Shipping & Wellness Guarantee' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 font-serif text-lg font-bold tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                    ? 'border-brand-magenta text-brand-magenta'
                    : 'border-transparent text-gray-400 hover:text-brand-dark'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-[250px]">
              {activeTab === 'description' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-brand-magenta uppercase">Formulated for Wellness</span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">{product.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{product.description || "Indulge in our carefully selected organic blends, specifically formulated to maintain natural radiance and organic purity."}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-magenta/5 flex items-center justify-center text-brand-magenta">
                          🌱
                        </div>
                        <span className="text-xs font-bold text-gray-700">100% Organic Extracts</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-magenta/5 flex items-center justify-center text-brand-magenta">
                          ✨
                        </div>
                        <span className="text-xs font-bold text-gray-700">Dermatologically Safe</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
                    <h4 className="font-serif font-bold text-brand-dark mb-4">Why It's Part of the {getProductTabsData(product.name).rituals}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      Our ancestors believed beauty rituals were sacred. We take that wisdom and modernize it, preserving the absolute integrity of every botanical cell.
                    </p>
                    <div className="border-t border-gray-200 pt-4 flex justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
                      <span>Net Weight: {selectedVariant.size}</span>
                      <span>MRP: {selectedVariant.price}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-brand-magenta uppercase">Pure Active Botanicals</span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mt-1">What's Inside</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {getProductTabsData(product.name).ingredients.map((ing, i) => (
                      <div key={i} className="bg-brand-magenta/[0.02] border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-all">
                        <div className="w-8 h-8 rounded-full bg-brand-magenta/10 text-brand-magenta flex items-center justify-center font-bold text-sm mb-4">
                          0{i + 1}
                        </div>
                        <h4 className="font-serif font-bold text-brand-dark text-lg mb-2">{ing.name}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{ing.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'how-to-use' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.3em] text-brand-magenta uppercase">Step-by-Step Guidance</span>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mt-1">The Application Ritual</h3>
                    </div>
                    <div className="space-y-4">
                      {getProductTabsData(product.name).howToUse.map((step, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-magenta text-white flex items-center justify-center text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                    <img
                      src={product.gallery && product.gallery[2] ? product.gallery[2] : product.image}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="How to use ritual illustration"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent flex items-end p-6">
                      <span className="text-white font-serif font-bold text-lg">{getProductTabsData(product.name).rituals}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'policies' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-3">
                    <div className="text-3xl">📦</div>
                    <h4 className="font-serif font-bold text-brand-dark text-lg">Fast & Secure Shipping</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      We dispatch all orders within 24 hours. Free express shipping on orders over ₹499. Delivers in 2-4 business days.
                    </p>
                  </div>
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-3">
                    <div className="text-3xl">♻️</div>
                    <h4 className="font-serif font-bold text-brand-dark text-lg">Eco-Conscious Promise</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Packaged exclusively in recyclable dark-amber glass to shield delicate organic oils from UV degradation. No plastics used.
                    </p>
                  </div>
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-3">
                    <div className="text-3xl">🤝</div>
                    <h4 className="font-serif font-bold text-brand-dark text-lg">100% Satisfaction Promise</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Love the organic glow, or let us help you find the perfect ritual match. Contact our concierge support anytime.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Related Products Section */}
          {/* Frequently Bought Together - Multi Combo Grid */}
          <section className="mt-20 pt-16 border-t border-gray-200">
            <div className="text-left mb-20">
              <span className="text-brand-magenta font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Complete Your Ritual</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
                Frequently <span className="text-brand-magenta italic relative">
                  Bought Together
                  <svg className="absolute -bottom-2 left-0 w-[100%] h-5 text-brand-gold/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { p1: product, p2: BESTSELLERS[0] },
                { p1: product, p2: BESTSELLERS[1] },
                { p1: product, p2: BESTSELLERS[2] }
              ].map((combo, idx) => {
                const totalPrice = parseInt(combo.p1.price.replace(/[^\d]/g, '')) + parseInt(combo.p2.price.replace(/[^\d]/g, ''));
                return (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <div className="relative">
                        <img src={combo.p1.image} className="w-20 h-20 object-contain rounded-lg border border-gray-50" alt="" />
                      </div>
                      <span className="text-xl font-light text-gray-300">+</span>
                      <div className="relative">
                        <img src={combo.p2.image} className="w-20 h-20 object-contain rounded-lg border border-gray-50" alt="" />
                      </div>
                    </div>

                    <div className="space-y-3 w-full">
                      <div className="text-xs text-gray-500 font-medium line-clamp-1">
                        {combo.p1.name} + {combo.p2.name}
                      </div>
                      <div className="text-sm font-semibold text-brand-dark">
                        Combo Price: <span className="font-display font-bold text-brand-magenta text-lg">₹{totalPrice}</span>
                      </div>

                      <button
                        onClick={() => {
                          addToCart({ ...combo.p1, quantity: 1 });
                          addToCart({ ...combo.p2, quantity: 1 });
                          setAdded(true);
                          setTimeout(() => setAdded(false), 2000);
                        }}
                        className="w-full py-3 bg-brand-magenta/5 hover:bg-brand-magenta text-brand-magenta hover:text-white border border-brand-magenta/20 text-[10px] font-bold rounded-xl transition-all tracking-widest uppercase"
                      >
                        Add Bundle to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>


          {/* FAQ Section */}
          {/* FAQ Section - Re-imagined Split Layout */}
          <section className="mt-32 pt-20 border-t border-gray-100 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Left Side: Sticky Header */}
              <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
                <span className="text-brand-magenta font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Ritual Wisdom</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight mb-6 relative inline-block">
                  Sacred Ritual <br />
                  <span className="text-brand-magenta italic relative">
                    Support
                    <svg className="absolute -bottom-2 left-0 w-full h-5 text-brand-gold/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                  Our experts have curated these responses to help you master your organic beauty journey.
                </p>
                <button className="flex items-center gap-2 text-brand-magenta font-bold text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">
                  Ask your own question
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Right Side: Accordions */}
              <div className="lg:w-2/3 space-y-4">
                {[
                  { q: "How long does it take to see visible results?", a: "Most customers notice a natural glow within 7-10 days of consistent use. For deeper skin transformation, we recommend following the ritual for at least 4 weeks." },
                  { q: "Is this product suitable for very sensitive skin?", a: "Yes, our products are formulated with 100% natural, pH-balanced botanicals. However, we always recommend a patch test before full application." },
                  { q: "Are your products truly 100% chemical-free?", a: "Absolutely. We use traditional extraction methods and natural preservatives like Vitamin E. No parabens, sulfates, or synthetic fragrances." },
                  { q: "What is the best way to store these organic oils?", a: "Store in a cool, dry place away from direct sunlight. Our amber glass packaging helps preserve the potency of the essential oils." },
                  { q: "Can I use this product during pregnancy?", a: "While our ingredients are 100% natural, we recommend consulting with your physician before introducing new skincare rituals during pregnancy." }
                ].map((faq, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div
                      key={i}
                      className={`border-b border-gray-100 transition-all duration-500 overflow-hidden ${isOpen ? 'pb-8 pt-4' : 'py-8'}`}
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : i)}
                        className="w-full flex justify-between items-center text-left group"
                      >
                        <span className={`text-xl font-serif font-bold transition-all duration-300 ${isOpen ? 'text-brand-magenta' : 'text-brand-dark group-hover:text-brand-magenta'}`}>
                          {faq.q}
                        </span>
                        <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-135 text-brand-magenta' : 'text-gray-300'}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                        </div>
                      </button>
                      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[300px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl border-l-2 border-brand-magenta/20 pl-6">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Customer Reviews Section - High Fidelity Model */}
          <section className="mt-20 pt-16 border-t border-gray-100 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 mb-10">
              <h2 className="text-3xl font-serif font-bold text-center text-brand-dark mb-12">Customer Reviews</h2>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-gray-100 items-center">
                {/* Overall Rating */}
                <div className="flex flex-col items-center text-center py-8 lg:py-0 lg:px-6">
                  <div className="flex items-center gap-1 text-yellow-400 text-lg mb-2">
                    {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                  </div>
                  <p className="text-xl font-bold text-brand-dark mb-1 font-display">4.78 out of 5</p>
                  <p className="text-sm text-gray-500 font-medium">Based on 312 reviews</p>
                </div>

                {/* Progress Bars */}
                <div className="space-y-2 py-8 lg:py-0 lg:px-12 w-full">
                  {[
                    { s: 5, p: 85, c: 244 },
                    { s: 4, p: 12, c: 67 },
                    { s: 3, p: 2, c: 1 },
                    { s: 2, p: 0, c: 0 },
                    { s: 1, p: 0, c: 0 }
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs font-medium">
                      <div className="flex items-center gap-1 text-yellow-400 w-24">
                        {[1, 2, 3, 4, 5].map(s => (
                          <span key={s} className={`text-lg ${s <= row.s ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                        ))}
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4A611C] rounded-full transition-all duration-1000"
                          style={{ width: `${row.p}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 w-8 text-right font-display">{row.c}</span>
                    </div>
                  ))}
                </div>

                {/* Write Review Button */}
                <div className="py-8 lg:py-0 lg:pl-12 flex items-center justify-center">
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="w-full lg:w-64 py-4 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-brand-dark transition-all active:scale-95"
                  >
                    Write a review
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="relative mb-16 z-10">
              <div
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sort By:</span>
                  <span className="text-sm font-bold text-brand-dark">{reviewFilter}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ${isFilterOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                {['Most Recent', 'Highest Rated', 'Lowest Rated'].map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setReviewFilter(option);
                      setIsFilterOpen(false);
                    }}
                    className={`px-6 py-4 text-sm font-medium cursor-pointer transition-colors hover:bg-gray-50 ${reviewFilter === option ? 'text-brand-magenta bg-brand-magenta/5' : 'text-gray-600'}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Masonry Grid */}
            <div className="mt-16 mb-20">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {getSortedReviews().slice(0, visibleReviews).map((review, i) => (
                  <div
                    key={i}
                    className="break-inside-avoid bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all mb-6"
                  >
                    {/* Top Row: Stars and Date */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-0.5 text-yellow-400 text-sm">
                        {[1, 2, 3, 4, 5].map(s => (
                          <span key={s} className={s <= (review.rating || 5) ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">{review.date}</span>
                    </div>

                    {/* User Info Row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border-2 border-brand-dark/10 group-hover:border-brand-magenta/30 transition-colors">
                        <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-brand-dark">{review.name}</span>
                    </div>

                    {/* Title and Content */}
                    <h4 className="text-[15px] font-bold text-brand-dark mb-3 leading-snug">{review.title}</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* View More Button */}
            {visibleReviews < 20 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleReviews(prev => prev + 10)}
                  className="flex items-center gap-3 px-10 py-4 border-2 border-brand-magenta text-brand-magenta rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-magenta hover:text-white transition-all shadow-lg active:scale-95 group"
                >
                  View More Reviews
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-y-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            )}
          </section>

          {/* Related Products Section */}
          <section className="mt-20 border-t border-gray-200 pt-16">
            <div className="text-center mb-14">
              <span className="text-brand-magenta font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Complete the Ritual</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
                Sacred <span className="text-brand-magenta italic relative">
                  Pairings
                  <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getRelatedProducts().map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/product/${relProduct.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-[0_20px_40px_rgba(138,27,94,0.06)] hover:border-brand-magenta/20 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-4 mb-4">
                      <img
                        src={relProduct.image}
                        alt={relProduct.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Dynamic Badge */}
                      <span className="absolute top-4 left-4 bg-brand-magenta text-white text-[9px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase shadow-sm">
                        {relProduct.name.toLowerCase().includes('oil') || relProduct.name.toLowerCase().includes('kumkumadi') ? 'Best Seller' : 'Organic'}
                      </span>
                    </div>

                    {/* Meta */}
                    <span className="text-[9px] font-bold tracking-widest text-brand-magenta uppercase block mb-1">
                      {relProduct.name.toLowerCase().includes('hair') || relProduct.name.toLowerCase().includes('shampoo') || relProduct.name.toLowerCase().includes('conditioner') ? 'Hair Care' : 'Face Care'}
                    </span>
                    <h3 className="text-[15px] font-serif font-bold text-brand-dark group-hover:text-brand-magenta transition-colors line-clamp-2 leading-snug mb-2">
                      {relProduct.name}
                    </h3>
                  </div>

                  <div>
                    {/* Price and Action */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <div>
                        <span className="text-xs text-gray-400 block line-through">
                          ₹{Math.round((parseInt(relProduct.price.replace(/[^\d]/g, ''), 10) || 0) * 1.2)}
                        </span>
                        <span className="text-base font-semibold text-brand-dark">
                          {relProduct.price}
                        </span>
                      </div>

                      <span className="bg-brand-magenta/5 group-hover:bg-brand-magenta text-brand-magenta group-hover:text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all">
                        View Ritual
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* Sticky Buy Bar (Bottom Left) - Realigned to bottom-left */}
      <div
        className={`fixed bottom-6 left-6 w-[calc(100%-3rem)] sm:w-[440px] bg-white border border-gray-150 shadow-[0_15px_50px_rgba(138,27,94,0.15)] z-[100] transition-all duration-500 transform rounded-2xl overflow-hidden ${showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-28 opacity-0 invisible'
          }`}
      >
        <div className="p-5 flex items-center justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-14 h-14 bg-white rounded-xl flex-shrink-0 overflow-hidden border border-gray-100 p-1 flex items-center justify-center">
              <img src={product.image} className="max-h-full max-w-full object-contain" alt="" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[17px] font-serif font-bold text-brand-dark truncate leading-snug mb-0.5">{product.name}</h4>
              <div className="flex items-center gap-1.5">
                <span className="text-brand-magenta font-display font-semibold text-[15px]">Rs. {selectedVariant.numericPrice}.00</span>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-shrink-0">
            <button
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${added
                ? 'bg-green-700 text-white'
                : 'bg-brand-magenta text-white hover:bg-brand-dark active:scale-95'
                }`}
            >
              {added ? "Added!" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-gray-100 shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark text-xl"
            >
              ✕
            </button>
            <span className="text-[10px] font-bold tracking-[0.3em] text-brand-magenta uppercase block mb-2">Share your wisdom</span>
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Write a Review</h3>

            <form onSubmit={(e) => {
              e.preventDefault();
              const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
              setReviewsList([
                {
                  name: newReview.name || "Anonymous",
                  rating: newReview.rating,
                  date,
                  title: newReview.title || "Loved it!",
                  content: newReview.content || "Very organic and nourishing."
                },
                ...reviewsList
              ]);
              setNewReview({ name: '', rating: 5, title: '', content: '' });
              setShowReviewModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Priyasree Nair"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-magenta text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="text-2xl text-yellow-400"
                    >
                      {star <= newReview.rating ? '★' : '☆'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Review Title</label>
                <input
                  type="text"
                  required
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="e.g. Life-changing kumkumadi oil!"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-magenta text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Your Review</label>
                <textarea
                  rows="4"
                  required
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="Describe your organic beauty experience..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-magenta text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-magenta hover:bg-brand-dark text-white text-xs font-bold rounded-full shadow-lg transition-all active:scale-95 tracking-widest uppercase"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
