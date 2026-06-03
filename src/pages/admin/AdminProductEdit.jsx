import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BESTSELLERS, FEATURED_PRODUCTS, CATEGORIES } from '../../constants/BrandAssets';

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Combine all products to find the one we're editing
  const allProducts = [...BESTSELLERS, ...FEATURED_PRODUCTS].reduce((acc, current) => {
    if (!acc.find(item => item.id === current.id)) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  const product = allProducts.find(p => p.id === parseInt(id));
  
  // Define fallback if product not found (for dev/demo)
  const editingProduct = product ? {
    ...product,
    category: product.name.toLowerCase().includes('hair') || product.name.toLowerCase().includes('shampoo') ? 'Hair Care' : 
              (product.name.toLowerCase().includes('kumkumadi') || product.name.toLowerCase().includes('nalugumavu') ? 'Face Care' : 'Body Care'),
    stock: Math.floor(Math.random() * 100) + 20,
    status: 'Active'
  } : null;

  const [activeTab, setActiveTab] = useState('details');
  const [activeWisdomTab, setActiveWisdomTab] = useState('sacred-ritual');

  if (!editingProduct) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-bold text-slate-700">Product Not Found</h2>
        <button onClick={() => navigate('/admin/products')} className="mt-4 px-4 py-2 bg-brand-magenta text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/products')} className="p-2 bg-white/60 hover:bg-white rounded-xl shadow-sm text-slate-500 hover:text-brand-magenta transition-colors border border-white/60">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-brand-magenta font-serif">Edit Product</h1>
            <p className="text-sm text-slate-600 mt-1">PRD-{editingProduct.id.toString().padStart(3, '0')} • {editingProduct.name}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/products')} className="px-5 py-2.5 bg-white/60 border border-white/60 text-slate-600 rounded-xl text-sm font-bold hover:bg-white transition-colors shadow-sm">Discard Changes</button>
          <button className="px-5 py-2.5 bg-brand-magenta text-white rounded-xl text-sm font-bold hover:bg-brand-magenta/90 transition-all shadow-[0_4px_14px_rgba(216,27,96,0.3)]">Save Product</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
        
        {/* Tabs */}
        <div className="flex border-b border-white/60 bg-white/30 overflow-x-auto scrollbar-hide px-6">
          {[
            { id: 'details', label: 'Basic Details' },
            { id: 'tabbed-wisdom', label: 'Tabbed Wisdom Panel' },
            { id: 'testimonials', label: 'Testimonials' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-5 text-sm font-bold tracking-wide border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-brand-magenta text-brand-magenta' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Image Section */}
              <div className="col-span-1 space-y-4">
                <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group shadow-sm">
                  <img src={editingProduct.image} alt={editingProduct.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="px-4 py-2 bg-white text-brand-dark text-sm font-bold rounded-full shadow-sm hover:bg-brand-magenta hover:text-white transition-colors">Change Primary Image</button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square rounded-lg border border-dashed border-slate-300 bg-white/50 flex items-center justify-center hover:bg-white hover:border-brand-magenta/50 cursor-pointer transition-colors">
                      <span className="text-slate-400 text-lg">+</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Section */}
              <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Product Name</label>
                    <input type="text" defaultValue={editingProduct.name} className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-slate-900 shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
                    <select defaultValue={editingProduct.category} className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-slate-900 shadow-inner appearance-none cursor-pointer">
                      {CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Stock Count</label>
                    <input type="number" defaultValue={editingProduct.stock} className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-slate-900 shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status</label>
                    <select defaultValue={editingProduct.status} className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-slate-900 shadow-inner appearance-none cursor-pointer">
                      <option>Active</option>
                      <option>Low Stock</option>
                      <option>Out of Stock</option>
                      <option>Draft</option>
                    </select>
                  </div>
                </div>

                {/* Variants Section */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Product Variants (Sizes & Pricing)</label>
                      <p className="text-[10px] text-slate-500 mt-1">Manage different sizes (e.g. 15 ML, 30 ML, 50g) and their specific prices.</p>
                    </div>
                    <button className="text-xs bg-brand-magenta text-white px-3 py-1.5 rounded-lg font-bold hover:bg-brand-magenta/90 shadow-sm transition-colors">+ Add Variant</button>
                  </div>
                  
                  <div className="bg-white/50 rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          <th className="p-3 font-bold text-center w-16">Image</th>
                          <th className="p-3 font-bold">Size / Quantity</th>
                          <th className="p-3 font-bold">Price (₹)</th>
                          <th className="p-3 font-bold text-center">Points</th>
                          <th className="p-3 font-bold">Badge (Optional)</th>
                          <th className="p-3 font-bold text-center w-12">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {/* Variant 1 */}
                        <tr className="group hover:bg-white/60 transition-colors">
                          <td className="p-2 pl-3">
                            <div className="w-10 h-10 mx-auto bg-slate-100 border border-dashed border-slate-300 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:border-brand-magenta/50 transition-colors relative shadow-sm">
                               <img src={editingProduct.image} alt="Variant" className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">Edit</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-brand-magenta/40 shadow-inner w-32">
                              <input type="text" defaultValue="15" className="w-full px-2 py-1.5 text-sm font-bold text-slate-800 focus:outline-none" />
                              <select className="bg-slate-50 border-l border-slate-200 px-2 py-1.5 text-xs text-slate-600 font-bold focus:outline-none cursor-pointer">
                                <option>ML</option>
                                <option>g</option>
                                <option>L</option>
                                <option>kg</option>
                              </select>
                            </div>
                          </td>
                          <td className="p-2">
                            <input type="text" defaultValue="1299" className="w-24 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-brand-magenta focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2 text-center">
                            <input type="text" defaultValue="130" className="w-16 text-center bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2">
                            <input type="text" placeholder="e.g. Best Deal" className="w-full max-w-[150px] bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2 pr-3 text-center">
                            <button className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors" title="Remove Variant">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </td>
                        </tr>

                        {/* Variant 2 */}
                        <tr className="group hover:bg-white/60 transition-colors">
                          <td className="p-2 pl-3">
                            <div className="w-10 h-10 mx-auto bg-slate-100 border border-dashed border-slate-300 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:border-brand-magenta/50 transition-colors relative shadow-sm">
                               <img src={editingProduct.image} alt="Variant" className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">Edit</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-brand-magenta/40 shadow-inner w-32">
                              <input type="text" defaultValue="23" className="w-full px-2 py-1.5 text-sm font-bold text-slate-800 focus:outline-none" />
                              <select className="bg-slate-50 border-l border-slate-200 px-2 py-1.5 text-xs text-slate-600 font-bold focus:outline-none cursor-pointer">
                                <option>ML</option>
                                <option>g</option>
                                <option>L</option>
                                <option>kg</option>
                              </select>
                            </div>
                          </td>
                          <td className="p-2">
                            <input type="text" defaultValue="1819" className="w-24 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-brand-magenta focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2 text-center">
                            <input type="text" defaultValue="182" className="w-16 text-center bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2">
                            <input type="text" defaultValue="Best Deal" className="w-full max-w-[150px] bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2 pr-3 text-center">
                            <button className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors" title="Remove Variant">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </td>
                        </tr>

                        {/* Variant 3 */}
                        <tr className="group hover:bg-white/60 transition-colors">
                          <td className="p-2 pl-3">
                            <div className="w-10 h-10 mx-auto bg-slate-100 border border-dashed border-slate-300 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:border-brand-magenta/50 transition-colors relative shadow-sm">
                               <img src={editingProduct.image} alt="Variant" className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">Edit</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-brand-magenta/40 shadow-inner w-32">
                              <input type="text" defaultValue="30" className="w-full px-2 py-1.5 text-sm font-bold text-slate-800 focus:outline-none" />
                              <select className="bg-slate-50 border-l border-slate-200 px-2 py-1.5 text-xs text-slate-600 font-bold focus:outline-none cursor-pointer">
                                <option>ML</option>
                                <option>g</option>
                                <option>L</option>
                                <option>kg</option>
                              </select>
                            </div>
                          </td>
                          <td className="p-2">
                            <input type="text" defaultValue="2338" className="w-24 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-brand-magenta focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2 text-center">
                            <input type="text" defaultValue="234" className="w-16 text-center bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2">
                            <input type="text" placeholder="e.g. Best Deal" className="w-full max-w-[150px] bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </td>
                          <td className="p-2 pr-3 text-center">
                            <button className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors" title="Remove Variant">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Short Description (Sacred Ritual)</label>
                  <textarea defaultValue={editingProduct.description} rows="4" className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-slate-900 shadow-inner resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tabbed-wisdom' && (
            <div className="space-y-8 max-w-5xl">
              <div className="flex justify-between items-center bg-white/30 p-4 rounded-xl border border-white/60">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Tabbed Wisdom Panel Configuration</h3>
                  <p className="text-xs text-slate-500 mt-1">Manage the content for the Sacred Ritual, Key Ingredients, How to Use, and Policies tabs shown on the product page.</p>
                </div>
              </div>

              {/* Sub-tabs for the Wisdom Panel itself */}
              <div className="flex gap-4 border-b border-slate-200 pb-2">
                {[
                  { id: 'sacred-ritual', label: 'Sacred Ritual' },
                  { id: 'key-ingredients', label: 'Key Ingredients' },
                  { id: 'how-to-use', label: 'How To Use (Ritual)' },
                  { id: 'shipping', label: 'Shipping & Guarantees' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWisdomTab(tab.id)}
                    className={`text-sm font-bold pb-2 px-2 transition-colors ${
                      activeWisdomTab === tab.id
                        ? 'text-brand-magenta border-b-2 border-brand-magenta'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeWisdomTab === 'sacred-ritual' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtitle</label>
                      <input type="text" defaultValue="FORMULATED FOR WELLNESS" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-brand-magenta font-bold shadow-inner" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Title</label>
                      <input type="text" defaultValue={editingProduct.name} className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-serif text-slate-900 shadow-inner" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Short Description</label>
                      <textarea rows="2" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-slate-600 shadow-inner resize-none" defaultValue="Botanical complex for root strengthening."></textarea>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Feature Highlights</label>
                        <button className="text-xs text-brand-magenta font-bold hover:underline">+ Add Feature</button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-slate-200">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">🌱</div>
                          <input type="text" defaultValue="100% Organic Extracts" className="flex-1 bg-transparent text-sm font-bold text-slate-800 focus:outline-none" />
                        </div>
                        <div className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-slate-200">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-lg">✨</div>
                          <input type="text" defaultValue="Dermatologically Safe" className="flex-1 bg-transparent text-sm font-bold text-slate-800 focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Info Card) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Info Card (Right Side)</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Card Title</label>
                        <input type="text" defaultValue="Why It's Part of the Root-to-Tip Strength Ritual" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-serif focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 shadow-inner" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Card Description</label>
                        <textarea rows="4" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-slate-600 shadow-inner resize-none" defaultValue="Our ancestors believed beauty rituals were sacred. We take that wisdom and modernize it, preserving the absolute integrity of every botanical cell."></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Net Weight / Volume</label>
                          <input type="text" defaultValue={editingProduct.netQuantity || "30 ML"} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 shadow-inner" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">MRP</label>
                          <input type="text" defaultValue={`₹${editingProduct.price}`} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 shadow-inner" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeWisdomTab === 'key-ingredients' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtitle</label>
                      <input type="text" defaultValue="PURE ACTIVE BOTANICALS" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-brand-magenta font-bold shadow-inner" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Title</label>
                      <input type="text" defaultValue="What's Inside" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-serif text-slate-900 shadow-inner" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ingredients List</label>
                      <button className="text-xs bg-brand-magenta text-white px-3 py-1.5 rounded-lg font-bold hover:bg-brand-magenta/90 shadow-sm transition-colors">+ Add Ingredient</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { num: '01', name: 'Kashmiri Saffron', desc: 'Brightens skin tone & adds golden radiance' },
                        { num: '02', name: 'Sandalwood', desc: 'Soothes redness & fights irritation' },
                        { num: '03', name: 'Licorice Extract', desc: 'Reduces dark spots & hyperpigmentation' },
                        { num: '04', name: 'Vetiver', desc: 'Cooling agent & skin rejuvenator' }
                      ].map((ing, idx) => (
                        <div key={idx} className="bg-white/60 p-4 rounded-xl border border-slate-200 relative group">
                          <button className="absolute top-2 right-2 text-slate-400 hover:text-red-500 bg-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-magenta/10 text-brand-magenta flex items-center justify-center font-bold text-sm shrink-0">{ing.num}</div>
                            <div className="space-y-3 flex-1">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ingredient Name</label>
                                <input type="text" defaultValue={ing.name} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Benefit / Description</label>
                                <textarea rows="2" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner resize-none" defaultValue={ing.desc}></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeWisdomTab === 'how-to-use' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtitle</label>
                      <input type="text" defaultValue="STEP-BY-STEP GUIDANCE" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta/40 text-brand-magenta font-bold shadow-inner" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Title</label>
                      <input type="text" defaultValue="The Application Ritual" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-serif text-slate-900 shadow-inner" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4 border-t border-slate-200">
                    {/* Text Steps */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Text Steps</label>
                        <button className="text-xs bg-brand-magenta text-white px-3 py-1.5 rounded-lg font-bold hover:bg-brand-magenta/90 shadow-sm transition-colors">+ Add Step</button>
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          { num: '1', text: 'Cleanse your face thoroughly with a mild natural wash.' },
                          { num: '2', text: 'Take 3-4 drops of Kumkumadi Oil onto your palm.' },
                          { num: '3', text: 'Gently dab and massage the oil in upward circular motions.' },
                          { num: '4', text: 'Leave it overnight for best results. Use daily as a nighttime ritual.' }
                        ].map((step, idx) => (
                          <div key={idx} className="flex gap-3 items-center bg-white/60 p-3 rounded-xl border border-slate-200 group relative">
                             <button className="absolute -right-2 -top-2 text-slate-400 hover:text-red-500 bg-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                             <div className="w-8 h-8 rounded-full bg-brand-magenta text-white flex items-center justify-center font-bold text-xs shrink-0">{step.num}</div>
                             <input type="text" defaultValue={step.text} className="flex-1 bg-transparent text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 rounded px-2 py-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Visual Guide Image */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Visual Guide Image</label>
                      </div>
                      
                      <div className="bg-white/60 p-4 rounded-xl border border-slate-200 relative group h-full min-h-[300px] flex flex-col">
                        <div className="flex-1 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-colors bg-slate-50">
                           <span className="text-3xl text-slate-400 mb-3">+</span>
                           <span className="text-sm font-bold text-slate-600">Upload Visual Guide</span>
                           <span className="text-xs text-slate-400 mt-2">Recommended: Single combined image containing all visual steps</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeWisdomTab === 'shipping' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Shipping & Guarantee Features</label>
                    <button className="text-xs bg-brand-magenta text-white px-3 py-1.5 rounded-lg font-bold hover:bg-brand-magenta/90 shadow-sm transition-colors">+ Add Guarantee</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
                    {[
                      { icon: '📦', title: 'Fast & Secure Shipping', desc: 'We dispatch all orders within 24 hours. Free express shipping on orders over ₹499. Delivers in 2-4 business days.' },
                      { icon: '♻️', title: 'Eco-Conscious Promise', desc: 'Packaged exclusively in recyclable dark-amber glass to shield delicate organic oils from UV degradation. No plastics used.' },
                      { icon: '🤝', title: '100% Satisfaction Promise', desc: 'Love the organic glow, or let us help you find the perfect ritual match. Contact our concierge support anytime.' }
                    ].map((feature, idx) => (
                      <div key={idx} className="bg-white/60 p-5 rounded-2xl border border-slate-200 relative group flex flex-col gap-3 shadow-sm hover:shadow-md transition-all">
                        <button className="absolute right-3 top-3 text-slate-400 hover:text-red-500 bg-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        
                        <div className="flex items-center gap-3">
                          <input type="text" defaultValue={feature.icon} className="w-10 h-10 text-center bg-white border border-slate-200 rounded-xl text-xl focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          <div className="flex-1 space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Feature Title</label>
                            <input type="text" defaultValue={feature.title} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 shadow-inner" />
                          </div>
                        </div>
                        
                        <div className="space-y-1 mt-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                          <textarea rows="4" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-magenta/40 resize-none leading-relaxed shadow-inner" defaultValue={feature.desc}></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white/30 p-4 rounded-xl border border-white/60">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Product Reviews & Testimonials</h3>
                  <p className="text-xs text-slate-500 mt-1">Manage what customers are saying specifically about this product.</p>
                </div>
                <button className="px-4 py-2 bg-brand-magenta text-white text-xs font-bold rounded-lg hover:bg-brand-magenta/90 transition-colors shadow-sm">+ Add New Review</button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  { name: "Ananya Sharma", rating: 5, date: "11/02/2026", title: "The Ritual That Transformed My Skin", content: "I’ve tried countless serums, but Vive’s Kumkumadi Oil is the only one that truly worked." },
                  { name: "Kavya Iyer", rating: 5, date: "11/02/2026", title: "Golden Glow in a Bottle", content: "The Vive Vitamin C serum is simply transformative. It cleared my stubborn spots in just two weeks." },
                  { name: "Rohan Deshmukh", rating: 4, date: "10/02/2026", title: "Purity Meets Deep Hydration", content: "Finally a cleanser that respects my skin barrier. Leaves me feeling refreshed and hydrated." }
                ].map((review, idx) => (
                  <div key={idx} className="p-5 border border-slate-200 rounded-2xl bg-white/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex text-yellow-400 text-sm mb-1.5">
                            {[...Array(5)].map((_, i) => <span key={i} className={i < review.rating ? "" : "text-slate-300"}>★</span>)}
                          </div>
                          <h4 className="font-bold text-slate-800">{review.title}</h4>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 bg-white text-slate-400 hover:text-brand-magenta rounded-lg shadow-sm border border-slate-100 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                          <button className="p-1.5 bg-white text-slate-400 hover:text-red-500 rounded-lg shadow-sm border border-slate-100 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">"{review.content}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-magenta/10 text-brand-magenta flex items-center justify-center text-[10px] font-bold uppercase">{review.name.charAt(0)}</div>
                        <span className="text-xs font-bold text-slate-700">{review.name}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-400">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductEdit;
