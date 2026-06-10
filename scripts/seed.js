import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Manually load env variables from .env file
const envConfig = dotenv.parse(fs.readFileSync('.env'));

const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Seeding Database...');
  
  const allProducts = [
    {
      id: 1,
      name: 'Kumkumadi Oil',
      price: '1299',
      netQuantity: '15 ml',
      description: 'The ancient secret to a radiant, golden glow.',
      image: '/assets/VIVE Product/kumkumadi/oil.jpg'
    },
    {
      id: 2,
      name: 'Nalugumavu Powder',
      price: '349',
      netQuantity: '100 g',
      description: 'Traditional herbal bath powder for glowing skin.',
      image: '/assets/VIVE Product/Nalugumavu/single.jpg'
    },
    {
      id: 3,
      name: 'Organic Hair Oil',
      price: '599',
      netQuantity: '100 ml',
      description: 'Nourishing blend for healthy, long hair.',
      image: '/assets/VIVE Product/Hair oil/1.jpeg'
    },
    {
      id: 4,
      name: 'Coconut Conditioner',
      price: '649',
      netQuantity: '200 ml',
      description: 'Deep conditioning with pure coconut milk.',
      image: '/assets/VIVE Product/Cocunut milk conditioner/single.jpg'
    },
    {
      id: 5,
      name: 'Herbal Shampoo',
      price: '450',
      netQuantity: '200 ml',
      description: 'Gentle cleansing with natural ingredients.',
      image: '/assets/VIVE Product/Hair shampoo/1.jpeg'
    },
    {
      id: 6,
      name: 'Hair Strength Serum',
      price: '749',
      netQuantity: '30 ml',
      description: 'Botanical complex for root strengthening.',
      image: '/assets/VIVE Product/Hair strength/single.jpg'
    },
    {
      id: 103,
      name: 'Natural Hair Color',
      price: '399',
      netQuantity: '100 g',
      description: 'Chemical-free coloring with herbal extracts.',
      image: '/assets/VIVE Product/Hair color/single.jpg'
    }
  ];

  try {
    for (const p of allProducts) {
      // Determine category
      let category = 'Body Care';
      if (p.name.toLowerCase().includes('hair') || p.name.toLowerCase().includes('shampoo')) category = 'Hair Care';
      else if (p.name.toLowerCase().includes('kumkumadi') || p.name.toLowerCase().includes('nalugumavu')) category = 'Face Care';

      const { data: product, error } = await supabase
        .from('products')
        .insert({
          name: p.name,
          category: category,
          stock: Math.floor(Math.random() * 100) + 20,
          status: 'Active',
          image: p.image,
          price: parseFloat(p.price)
        })
        .select()
        .single();
        
      if (error) {
         console.log(`Error inserting ${p.name}:`, error.message);
         continue;
      }
      
      console.log(`Inserted product: ${product.name}`);

      // Insert default variants
      await supabase.from('product_variants').insert([
        { product_id: product.id, size: '15', unit: 'ML', price: parseFloat(p.price), points: Math.floor(p.price * 0.1), badge: '' },
        { product_id: product.id, size: '23', unit: 'ML', price: parseFloat(p.price) * 1.4, points: Math.floor(p.price * 0.14), badge: 'Best Deal' },
      ]);
    }

    // Insert mock orders
    const orders = [
      { id: '#ORD-1045', customer: 'Arun Kumar', items: 3, date: 'Oct 24, 2023', total: '₹1,250', status: 'Processing' },
      { id: '#ORD-1044', customer: 'Priya Sharma', items: 1, date: 'Oct 24, 2023', total: '₹850', status: 'Shipped' },
      { id: '#ORD-1043', customer: 'Rajesh Singh', items: 5, date: 'Oct 23, 2023', total: '₹2,400', status: 'Delivered' }
    ];
    await supabase.from('orders').insert(orders);

    // Insert mock coupons
    const coupons = [
      { code: 'VIVE15', type: 'percentage', discount_value: 15, min_order: 299, max_discount: 300, is_active: true },
      { code: 'FREESHIP', type: 'fixed', discount_value: 50, min_order: 499, max_discount: 50, is_active: true }
    ];
    await supabase.from('coupons').insert(coupons);

    console.log('Seeding Complete!');
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

seedDatabase();
