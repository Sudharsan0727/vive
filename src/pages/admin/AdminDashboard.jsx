import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const stats = [
    { name: 'Total Revenue', value: '$24,562.00', change: '+14.5%', trend: 'up' },
    { name: 'Total Orders', value: '1,245', change: '+8.2%', trend: 'up' },
    { name: 'New Customers', value: '342', change: '+12.4%', trend: 'up' },
    { name: 'Conversion Rate', value: '3.4%', change: '-1.2%', trend: 'down' },
  ];

  const recentOrders = [
    { id: '#ORD-7352', customer: 'Emma Watson', date: 'Today, 10:24 AM', status: 'Processing', amount: '$124.50' },
    { id: '#ORD-7351', customer: 'Liam Smith', date: 'Today, 09:12 AM', status: 'Shipped', amount: '$85.00' },
    { id: '#ORD-7350', customer: 'Sophia Davis', date: 'Yesterday', status: 'Delivered', amount: '$210.00' },
    { id: '#ORD-7349', customer: 'James Wilson', date: 'Yesterday', status: 'Delivered', amount: '$45.00' },
  ];

  const pieData = {
    labels: [
      'Face Care', 
      'Hair Care', 
      'Body Care', 
      'Lip Care', 
      'Foot Care', 
      'Hand made soap', 
      'Eye Care'
    ],
    datasets: [
      {
        data: [35, 25, 15, 10, 8, 5, 2],
        backgroundColor: [
          '#D81B60', // Face Care
          '#8E24AA', // Hair Care
          '#5E35B1', // Body Care
          '#3949AB', // Lip Care
          '#1E88E5', // Foot Care
          '#00ACC1', // Hand made soap
          '#00897B'  // Eye Care
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#475569', font: { size: 12 }, padding: 20, usePointStyle: true }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        displayColors: true,
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-magenta font-serif">Dashboard Overview</h1>
          <p className="text-sm text-slate-600 mt-1">Welcome back, here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/80 text-slate-700 rounded-xl text-sm font-medium hover:bg-white/80 transition-colors shadow-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-brand-magenta text-white rounded-xl text-sm font-medium hover:bg-brand-magenta/90 transition-colors shadow-[0_4px_14px_rgba(216,27,96,0.3)]">
            New Campaign
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</p>
              </div>
              <div className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                stat.trend === 'up' ? 'bg-green-100/60 text-green-800' : 'bg-red-100/60 text-red-800'
              }`}>
                {stat.trend === 'up' ? (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                ) : (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                )}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-white/60 flex justify-between items-center bg-white/30">
            <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm font-medium text-brand-magenta hover:text-brand-magenta/80 transition-colors">View all</a>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/40 text-slate-600 text-xs uppercase tracking-wider border-b border-white/60">
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100/60 text-green-800' : 
                        order.status === 'Shipped' ? 'bg-blue-100/60 text-blue-800' : 
                        'bg-orange-100/60 text-orange-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col">
          <div className="px-6 py-5 border-b border-white/60 bg-white/30">
            <h2 className="text-lg font-bold text-slate-800">Sales by Category</h2>
          </div>
          <div className="p-4 flex-1 min-h-[300px] flex items-center justify-center">
            <div className="w-full h-full relative p-4">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
