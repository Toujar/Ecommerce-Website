import React from 'react';
import { Smartphone, Laptop, Headphones, Camera, Watch, Gamepad2 } from 'lucide-react';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    color: 'bg-blue-500',
    count: '1,200+ items'
  },
  {
    id: 'computers',
    name: 'Computers',
    icon: Laptop,
    color: 'bg-emerald-500',
    count: '850+ items'
  },
  {
    id: 'audio',
    name: 'Audio & Music',
    icon: Headphones,
    color: 'bg-purple-500',
    count: '650+ items'
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Camera,
    color: 'bg-orange-500',
    count: '420+ items'
  },
  {
    id: 'wearables',
    name: 'Wearables',
    icon: Watch,
    color: 'bg-pink-500',
    count: '380+ items'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    color: 'bg-red-500',
    count: '750+ items'
  }
];

export function Categories() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group cursor-pointer"
              >
                <div className="text-center">
                  <div className={`${category.color} w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}