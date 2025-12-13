import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Package, Heart, ShoppingBag, MapPin, Mail, Camera, Edit3 } from 'lucide-react';

const Profile = () => {
  // Default tab 'orders' agar konten langsung terlihat
  const [activeTab, setActiveTab] = useState('orders');
  
  const userStats = {
    totalOrders: 12,
    totalSpent: 24500000,
    itemsSold: 3,
    wishlistItems: 8
  };

  const recentOrders = [
    { id: 1, title: "iPhone 13 Pro 256GB", price: 12500000, status: "Delivered", date: "2024-01-15" },
    { id: 2, title: "MacBook Air M1", price: 9800000, status: "Shipped", date: "2024-01-12" },
    { id: 3, title: "Sony WH-1000XM4", price: 2100000, status: "Processing", date: "2024-01-10" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-32 md:pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-tr from-primary to-slate-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                JD
              </div>
              <button className="absolute bottom-0 right-0 bg-accent text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-500">Member since January 2024</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Jakarta Selatan</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>john.doe@email.com</span>
                </div>
              </div>
            </div>
            
            <button className="text-primary hover:text-slate-800 p-2">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalOrders}</p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalSpent / 1000000}M</p>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userStats.itemsSold}</p>
                <p className="text-xs text-gray-500">Items Sold</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userStats.wishlistItems}</p>
                <p className="text-xs text-gray-500">Wishlist</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'orders' 
                  ? 'text-primary border-b-2 border-primary bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recent Orders
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'settings' 
                  ? 'text-primary border-b-2 border-primary bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Orders</h3>
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">{order.title}</h4>
                      <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">Rp {order.price.toLocaleString('id-ID')}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Link to="/cart" className="block text-center text-primary hover:text-slate-800 font-medium mt-4">
                  View All Orders
                </Link>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Personal Information</span>
                    </div>
                    <button className="text-primary hover:text-slate-800">Edit</button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Email & Notifications</span>
                    </div>
                    <button className="text-primary hover:text-slate-800">Manage</button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Shipping Addresses</span>
                    </div>
                    <button className="text-primary hover:text-slate-800">Edit</button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Privacy & Security</span>
                    </div>
                    <button className="text-primary hover:text-slate-800">Settings</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;