import React from 'react';

const AdminOrders = () => {
  const orders = [
    { id: '#ORD-1045', customer: 'Arun Kumar', items: 3, date: 'Oct 24, 2023', total: '₹1,250', status: 'Processing' },
    { id: '#ORD-1044', customer: 'Priya Sharma', items: 1, date: 'Oct 24, 2023', total: '₹850', status: 'Shipped' },
    { id: '#ORD-1043', customer: 'Rajesh Singh', items: 5, date: 'Oct 23, 2023', total: '₹2,400', status: 'Delivered' },
    { id: '#ORD-1042', customer: 'Meera Reddy', items: 2, date: 'Oct 23, 2023', total: '₹1,100', status: 'Processing' },
    { id: '#ORD-1041', customer: 'Vijay Patel', items: 1, date: 'Oct 22, 2023', total: '₹650', status: 'Delivered' },
    { id: '#ORD-1040', customer: 'Neha Gupta', items: 4, date: 'Oct 21, 2023', total: '₹3,200', status: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-magenta font-serif">Orders</h1>
          <p className="text-sm text-brand-dark/70 mt-1">Manage and track customer orders.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export CSV
        </button>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-4 border-b border-white/60 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/30">
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="px-4 py-2 bg-brand-magenta text-white text-sm rounded-xl font-medium shadow-[0_4px_14px_rgba(216,27,96,0.3)]">All Orders</button>
            <button className="px-4 py-2 bg-white/60 text-slate-700 hover:bg-white/80 border border-white/60 text-sm rounded-xl font-medium transition-colors shadow-sm">Pending</button>
            <button className="px-4 py-2 bg-white/60 text-slate-700 hover:bg-white/80 border border-white/60 text-sm rounded-xl font-medium transition-colors shadow-sm">Completed</button>
          </div>
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input type="text" className="w-full bg-white/60 border border-white/60 text-sm rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-magenta/50 focus:bg-white transition-all shadow-inner placeholder-slate-400" placeholder="Search orders..." />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/40 text-slate-600 text-xs uppercase tracking-wider border-b border-white/60">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-brand-magenta">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.items} items</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100/80 text-green-800' : 
                      order.status === 'Shipped' ? 'bg-blue-100/80 text-blue-800' : 
                      order.status === 'Processing' ? 'bg-orange-100/80 text-orange-800' :
                      'bg-red-100/80 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-slate-500 hover:text-brand-magenta transition-colors bg-white/60 p-2 rounded-lg hover:bg-white/80 shadow-sm">
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
