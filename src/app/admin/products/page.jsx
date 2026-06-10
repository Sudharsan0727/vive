"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { BESTSELLERS, FEATURED_PRODUCTS, CATEGORIES } from '@/constants/BrandAssets';

const AdminProducts = () => {
  // Combine and deduplicate products from the constants
  const allProducts = [...BESTSELLERS, ...FEATURED_PRODUCTS].reduce((acc, current) => {
    if (!acc.find(item => item.id === current.id)) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  const [products] = useState(allProducts.map(p => {
    // Determine category heuristically for the admin view since it's not strictly in the data model
    let category = 'Body Care';
    if (p.name.toLowerCase().includes('hair') || p.name.toLowerCase().includes('shampoo')) category = 'Hair Care';
    else if (p.name.toLowerCase().includes('kumkumadi') || p.name.toLowerCase().includes('nalugumavu')) category = 'Face Care';

    return {
      ...p,
      category,
      stock: Math.floor(Math.random() * 100) + 20, // Mock stock since it's not in BrandAssets
      status: 'Active'
    };
  }));

  const [viewMode, setViewMode] = useState('grid'); // 'list' or 'grid'
  const navigate = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-magenta font-serif">Products</h1>
          <p className="text-sm text-slate-600 mt-1">Manage your store's inventory and product details.</p>
        </div>
        <button className="px-4 py-2 bg-brand-magenta text-white rounded-xl text-sm font-medium hover:bg-brand-magenta/90 transition-colors shadow-[0_4px_14px_rgba(216,27,96,0.3)] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Add Product
        </button>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-4 border-b border-white/60 flex flex-col lg:flex-row gap-4 justify-between items-center bg-white/30">
          <div className="relative w-full lg:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input type="text" className="w-full bg-white/50 border border-brand-magenta/30 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-magenta/50 focus:bg-white transition-all shadow-inner placeholder-slate-400" placeholder="Search products..." />
          </div>
          <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
            <select className="bg-white/60 border border-white/60 text-sm rounded-xl pl-5 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-magenta/50 text-slate-700 shadow-sm min-w-[180px] mx-1 sm:mx-2 cursor-pointer">
              <option>All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>

            {/* View Toggles */}
            <div className="flex bg-white/50 p-1 rounded-xl border border-white/60 shadow-sm ml-auto lg:ml-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-brand-magenta text-white shadow-sm' : 'text-slate-500 hover:text-brand-magenta'}`}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-brand-magenta text-white shadow-sm' : 'text-slate-500 hover:text-brand-magenta'}`}
                title="List View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/40 text-slate-600 text-xs uppercase tracking-wider border-b border-white/60">
                  <th className="px-6 py-4 font-medium">Product Name</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Stock</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-white overflow-hidden border border-slate-200 flex items-center justify-center mr-3 shadow-sm">
                          <img src={typeof (product.image) === 'object' ? (product.image)?.src : (product.image)} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{product.name}</div>
                          <div className="text-xs text-slate-500">PRD-{product.id.toString().padStart(3, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{product.price}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'Active' ? 'bg-green-100/80 text-green-800' : 
                        product.status === 'Low Stock' ? 'bg-orange-100/80 text-orange-800' : 
                        'bg-red-100/80 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button onClick={() => navigate(`/admin/products/edit/${product.id}`)} className="text-brand-magenta hover:text-brand-dark mr-3 transition-colors">Edit</button>
                      <button className="text-red-500 hover:text-red-700 transition-colors">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 bg-slate-50/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="aspect-square bg-slate-100 relative">
                    <img src={typeof (product.image) === 'object' ? (product.image)?.src : (product.image)} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-full shadow-sm border ${
                        product.status === 'Active' ? 'bg-green-500 text-white border-green-600' : 
                        product.status === 'Low Stock' ? 'bg-orange-500 text-white border-orange-600' : 
                        'bg-red-500 text-white border-red-600'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-brand-magenta font-semibold tracking-wider uppercase mb-1">{product.category}</div>
                    <h3 className="font-bold text-slate-900 mb-1 truncate" title={product.name}>{product.name}</h3>
                    <div className="text-xs text-slate-500 mb-3">PRD-{product.id.toString().padStart(3, '0')}</div>
                    
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{product.price}</div>
                        <div className="text-[10px] text-slate-500">{product.stock} in stock</div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => navigate(`/admin/products/edit/${product.id}`)} className="w-8 h-8 rounded-full bg-slate-50 text-brand-magenta flex items-center justify-center hover:bg-brand-magenta hover:text-white transition-colors border border-slate-200">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-slate-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors border border-slate-200">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 py-4 border-t border-white/60 flex items-center justify-between bg-white/20">
          <span className="text-sm text-slate-600">Showing 1 to {products.length} of {products.length} products</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white/40 border border-white/60 rounded-lg text-sm font-medium text-slate-500 hover:bg-white/60 disabled:opacity-50 transition-colors" disabled>Prev</button>
            <button className="px-3 py-1.5 bg-brand-magenta text-white rounded-lg text-sm font-medium shadow-sm">1</button>
            <button className="px-3 py-1.5 bg-white/40 border border-white/60 rounded-lg text-sm font-medium text-slate-500 hover:bg-white/60 disabled:opacity-50 transition-colors" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
