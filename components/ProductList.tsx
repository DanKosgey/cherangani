
import React, { useState } from 'react';
import { Product, UserRole, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../constants';

interface ProductListProps {
  userRole: UserRole;
  onAddToCart: (product: Product, quantity: number) => void;
}

const CATEGORIES = [ProductCategory.MILK, ProductCategory.YOGURT, ProductCategory.CHEESE, ProductCategory.BUTTER];

export const ProductList: React.FC<ProductListProps> = ({ userRole, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h2>
        <p className="text-gray-600">Fresh from our farms to your family.</p>
      </div>

      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 font-medium rounded-full text-sm transition-colors ${activeCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          All
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 font-medium rounded-full text-sm transition-colors whitespace-nowrap ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            userRole={userRole}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
