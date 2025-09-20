import React, { useState } from 'react';
import { Package, Users, BarChart3, Settings, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

export function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct] = useState<Product | null>(null);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Access denied. Admin privileges required.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  // Mock data
  const mockProducts = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 199.99,
      discount_price: 149.99,
      stock_quantity: 15,
      category: 'Electronics',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 299.99,
      discount_price: 249.99,
      stock_quantity: 8,
      category: 'Electronics',
      status: 'Active'
    }
  ];

  const mockOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      date: '2024-01-15',
      total: 149.99,
      status: 'Shipped',
      items: 1
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      date: '2024-01-14',
      total: 89.99,
      status: 'Processing',
      items: 1
    }
  ];

  const stats = [
    { label: 'Total Products', value: '1,247', change: '+12%', color: 'bg-blue-500' },
    { label: 'Total Orders', value: '3,891', change: '+18%', color: 'bg-emerald-500' },
    { label: 'Total Revenue', value: '$52,847', change: '+24%', color: 'bg-purple-500' },
    { label: 'Active Users', value: '12,847', change: '+8%', color: 'bg-orange-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your store and monitor performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </p>
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
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
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Products Management
                  </h2>
                  <Button onClick={() => setShowProductModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Product
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Price
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Stock
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Status
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {product.category}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                ${product.discount_price || product.price}
                              </p>
                              {product.discount_price && (
                                <p className="text-sm text-gray-500 line-through">
                                  ${product.price}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              product.stock_quantity > 10
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : product.stock_quantity > 0
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            }`}>
                              {product.stock_quantity}
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded text-sm font-medium">
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Orders Management
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Order ID
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Customer
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Date
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Total
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Status
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-gray-100">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-4 px-2 font-medium text-gray-900 dark:text-gray-100">
                            {order.id}
                          </td>
                          <td className="py-4 px-2 text-gray-600 dark:text-gray-400">
                            {order.customer}
                          </td>
                          <td className="py-4 px-2 text-gray-600 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-2 font-medium text-gray-900 dark:text-gray-100">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="py-4 px-2">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              order.status === 'Shipped' 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Users Management
                </h2>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    User management features coming soon...
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Store Settings
                </h2>
                <div className="space-y-6">
                  <Input label="Store Name" value="ShopHub" />
                  <Input label="Store Description" value="Your one-stop shop for everything" />
                  <Input label="Contact Email" value="support@shophub.com" />
                  <Input label="Phone Number" value="+1 (555) 123-4567" />
                  <div className="pt-4">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        maxWidth="lg"
      >
        <form className="space-y-4">
          <Input label="Product Name" placeholder="Enter product name" />
          <Input label="Description" placeholder="Enter product description" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price" type="number" placeholder="0.00" />
            <Input label="Discount Price" type="number" placeholder="0.00" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Category" placeholder="Electronics" />
            <Input label="Brand" placeholder="Brand name" />
          </div>
          <Input label="Stock Quantity" type="number" placeholder="0" />
          <Input label="Image URL" placeholder="https://..." />
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowProductModal(false)}>
              Cancel
            </Button>
            <Button>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}