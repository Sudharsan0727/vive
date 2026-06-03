import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductFinder from '../components/ProductFinder';
import FeaturedCategories from '../components/FeaturedCategories';
import Bestsellers from '../components/Bestsellers';
import CustomerTestimonials from '../components/CustomerTestimonials';
import TrustBadges from '../components/TrustBadges';
import BrandStory from '../components/BrandStory';
import WhyVive from '../components/WhyVive';
import WorkshopBanner from '../components/WorkshopBanner';
import InstagramReels from '../components/InstagramReels';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-magenta selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ProductFinder />
        <Bestsellers />
        <FeaturedCategories />
        <BrandStory />
        <WhyVive />
        <WorkshopBanner />
        <InstagramReels />
        <CustomerTestimonials />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
