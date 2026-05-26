import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS } from '../constants/BrandAssets';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white" id="featured">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-magenta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Seasonal Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
              Featured <span className="text-brand-magenta italic relative">
                Collections
                <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            Discover our handpicked selection of organic treatments designed to restore your natural radiance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default FeaturedProducts;
