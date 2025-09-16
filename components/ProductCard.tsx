
import React from 'react';
import { Product, UserRole } from '../types';

interface ProductCardProps {
  product: Product;
  userRole: UserRole;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, userRole, onAddToCart }) => {
  const isWholesale = userRole === UserRole.WHOLESALE;
  const price = isWholesale ? product.price_carton : product.price_unit;
  const unitLabel = isWholesale ? `/ carton (${product.carton_size} units)` : '/ unit';

  const handleAddToCart = () => {
    onAddToCart(product, isWholesale ? product.carton_size : 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description}</p>
        <div className="mt-4">
          <div className="text-2xl font-bold text-gray-900">
            ${price.toFixed(2)}
            <span className="text-sm font-normal text-gray-500 ml-1">{unitLabel}</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isWholesale ? 'Add Carton to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};
