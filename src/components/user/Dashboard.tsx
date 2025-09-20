import React, { useState } from 'react';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 149.99,
      status: 'Delivered',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 149.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: 89.99,
      status: 'Shipped',
      items: [
        { name: 'Laptop Stand', quantity: 1, price: 89.99 }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome back, {user.full_name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and track your orders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
              
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              
              <button
                onClick={signOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={user.full_name}
                    readOnly
                  />
                  <Input
                    label="Email"
                    value={user.email}
                    readOnly
                  />
                  <Input
                    label="Account Type"
                    value={user.role}
                    readOnly
                  />
                  <div className="pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Member since: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Order History
                </h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            Order {order.id}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            ${order.total.toFixed(2)}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="text-gray-900 dark:text-gray-100">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Wishlist
                </h2>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Your wishlist is empty. Start adding products you love!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Saved Addresses
                </h2>
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No saved addresses yet.
                  </p>
                  <Button>Add New Address</Button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Account Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Order updates
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Promotional emails
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Privacy
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Allow data collection for better recommendations
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}