import skincareImg from '../assets/VIVE Product/kumkumadi/single.jpg';
import haircareImg from '../assets/VIVE Product/Hair oil/2.jpeg';
import bodycareImg from '../assets/VIVE Product/Cocunut milk conditioner/single.jpg';
import traditionalImg from '../assets/VIVE Product/Nalugumavu/single.jpg';

import kumkumadiOil from '../assets/VIVE Product/kumkumadi/oil.jpg';
import nalugumavuPowder from '../assets/VIVE Product/Nalugumavu/single.jpg';
import organicHairOil from '../assets/VIVE Product/Hair oil/1.jpeg';
import coconutConditioner from '../assets/VIVE Product/Cocunut milk conditioner/single.jpg';
import herbalShampoo from '../assets/VIVE Product/Hair shampoo/1.jpeg';
import hairSerum from '../assets/VIVE Product/Hair strength/single.jpg';

import hairColor from '../assets/VIVE Product/Hair color/single.jpg';

// Kumkumadi Gallery
import kumkumadi_howtouse from '../assets/VIVE Product/kumkumadi/howtouse.jpg';
import kumkumadi_review from '../assets/VIVE Product/kumkumadi/Review.jpg';
import kumkumadi_single from '../assets/VIVE Product/kumkumadi/single.jpg';

// Nalugumavu Gallery
import nalugumavu_howtouse from '../assets/VIVE Product/Nalugumavu/HowToUse.jpg';
import nalugumavu_review from '../assets/VIVE Product/Nalugumavu/review.jpg';

// Hair Oil Gallery
import organicHairOil2 from '../assets/VIVE Product/Hair oil/2.jpeg';
import organicHairOil3 from '../assets/VIVE Product/Hair oil/3.jpeg';
import organicHairOil4 from '../assets/VIVE Product/Hair oil/4.jpeg';

// Shampoo Gallery
import herbalShampoo2 from '../assets/VIVE Product/Hair shampoo/2.jpeg';
import herbalShampoo3 from '../assets/VIVE Product/Hair shampoo/3.jpeg';
import herbalShampoo4 from '../assets/VIVE Product/Hair shampoo/4.jpeg';

// Hair Strength Gallery
import hairSerum_benefits from '../assets/VIVE Product/Hair strength/benefits.jpg';
import hairSerum_howtouse from '../assets/VIVE Product/Hair strength/howtouse.jpg';
import hairSerum_review from '../assets/VIVE Product/Hair strength/review.jpg';

export const BRAND_COLORS = {
  primary: '#8A1B5E', // Magenta/Purple from Instagram
  secondary: '#D4AF37', // Gold for accents
  accent: '#F3E8EE', // Soft Pink/Cream
  dark: '#2D1B24', // Deep wine/dark magenta
  text: '#333333',
  lightText: '#FFFFFF',
};

export const BRAND_INFO = {
  name: 'Vive Beauty Care',
  tagline: 'Your Glow Is Our Success',
  description: 'Natural, Organic, and Result-based skincare and haircare solutions.',
};
export const CATEGORIES = [
  { id: 1, name: 'Face Care', image: skincareImg },
  { id: 2, name: 'Hair Care', image: haircareImg },
  { id: 3, name: 'Body Care', image: bodycareImg },
  { id: 4, name: 'Lip Care', image: traditionalImg },
  { id: 5, name: 'Foot Care', image: nalugumavuPowder },
  { id: 6, name: 'Soap', image: herbalShampoo },
  { id: 7, name: 'Eye Care', image: hairSerum },
  { id: 8, name: 'Gift Combos', image: kumkumadiOil },
];

export const BESTSELLERS = [
  {
    id: 1,
    name: 'Kumkumadi Oil',
    price: '₹1,299',
    netQuantity: '15 ml',
    description: 'The ancient secret to a radiant, golden glow.',
    image: kumkumadiOil,
    gallery: [kumkumadiOil, kumkumadi_single, kumkumadi_howtouse, kumkumadi_review]
  },
  {
    id: 2,
    name: 'Nalugumavu Powder',
    price: '₹349',
    netQuantity: '100 g',
    description: 'Traditional herbal bath powder for glowing skin.',
    image: nalugumavuPowder,
    gallery: [nalugumavuPowder, nalugumavu_howtouse, nalugumavu_review, skincareImg]
  },
  {
    id: 3,
    name: 'Organic Hair Oil',
    price: '₹599',
    netQuantity: '100 ml',
    description: 'Nourishing blend for healthy, long hair.',
    image: organicHairOil,
    gallery: [organicHairOil, organicHairOil2, organicHairOil3, organicHairOil4]
  },
  {
    id: 4,
    name: 'Coconut Conditioner',
    price: '₹649',
    netQuantity: '200 ml',
    description: 'Deep conditioning with pure coconut milk.',
    image: coconutConditioner,
    gallery: [coconutConditioner, haircareImg, traditionalImg, bodycareImg]
  },
  {
    id: 5,
    name: 'Herbal Shampoo',
    price: '₹450',
    netQuantity: '200 ml',
    description: 'Gentle cleansing with natural ingredients.',
    image: herbalShampoo,
    gallery: [herbalShampoo, herbalShampoo2, herbalShampoo3, herbalShampoo4]
  },
  {
    id: 6,
    name: 'Hair Strength Serum',
    price: '₹749',
    netQuantity: '30 ml',
    description: 'Botanical complex for root strengthening.',
    image: hairSerum,
    gallery: [hairSerum, hairSerum_benefits, hairSerum_howtouse, hairSerum_review]
  },
];

export const FEATURED_PRODUCTS = [
  {
    id: 101,
    name: 'Herbal Shampoo',
    price: '₹450',
    netQuantity: '200 ml',
    description: 'Gentle cleansing with natural ingredients.',
    image: herbalShampoo,
    badge: 'Trending',
    gallery: [herbalShampoo, herbalShampoo2, herbalShampoo3, herbalShampoo4]
  },
  {
    id: 102,
    name: 'Kumkumadi Tailam',
    price: '₹1,499',
    netQuantity: '30 ml',
    description: 'Pure saffron oil for overnight skin rejuvenation.',
    image: skincareImg,
    badge: 'Pure Organic',
    gallery: [skincareImg, kumkumadiOil, kumkumadi_single, kumkumadi_howtouse]
  },
  {
    id: 103,
    name: 'Natural Hair Color',
    price: '₹399',
    netQuantity: '100 g',
    description: 'Chemical-free coloring with herbal extracts.',
    image: hairColor,
    badge: 'New Launch',
    gallery: [hairColor, organicHairOil, organicHairOil2, organicHairOil3]
  },
  {
    id: 104,
    name: 'Hair Strength Serum',
    price: '₹749',
    netQuantity: '30 ml',
    description: 'Strengthens roots and prevents hair fall.',
    image: hairSerum,
    badge: 'Bestseller',
    gallery: [hairSerum, hairSerum_benefits, hairSerum_howtouse, hairSerum_review]
  }
];
