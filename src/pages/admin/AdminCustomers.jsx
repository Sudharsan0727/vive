import React from 'react';

const AdminCustomers = () => {
  const customers = [
    { id: 'CUS-001', name: 'Arun Kumar', email: 'arun@example.com', orders: 12, spent: '₹14,500', joined: 'Jan 2023' },
    { id: 'CUS-002', name: 'Priya Sharma', email: 'priya.s@example.com', orders: 4, spent: '₹3,200', joined: 'Mar 2023' },
    { id: 'CUS-003', name: 'Rajesh Singh', email: 'rajesh1985@email.com', orders: 1, spent: '₹2,400', joined: 'Oct 2023' },
    { id: 'CUS-004', name: 'Meera Reddy', email: 'meera.reddy@example.com', orders: 8, spent: '₹9,100', joined: 'Feb 2023' },
    { id: 'CUS-005', name: 'Vijay Patel', email: 'v.patel@example.com', orders: 2, spent: '₹1,550', joined: 'Sep 2023' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-magenta font-serif">Customers</h1>
          <p className="text-sm text-brand-dark/70 mt-1">Manage your customer base and view their history.</p>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-4 border-b border-white/60 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/30">
          <div className="relative w-full sm:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input type="text" className="w-full bg-white/60 border border-white/60 text-sm rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-magenta/50 focus:bg-white transition-all shadow-inner placeholder-slate-400" placeholder="Search by name, email..." />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/40 text-slate-600 text-xs uppercase tracking-wider border-b border-white/60">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white border border-brand-magenta/20 text-brand-magenta flex items-center justify-center font-bold mr-3 text-xs shadow-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{customer.spent}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{customer.joined}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-brand-magenta hover:text-brand-magenta/80 px-3 py-1.5 bg-white/60 rounded-lg hover:bg-white/80 transition-colors shadow-sm">View Profile</button>
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

export default AdminCustomers;
