
import React from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../constants';
import { XIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

interface CartViewProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartRow: React.FC<{
    item: CartItem;
    product?: Product;
    onUpdateQuantity: (productId: string, newQuantity: number) => void;
    onRemoveItem: (productId: string) => void;
}> = ({ item, product, onUpdateQuantity, onRemoveItem }) => {
    if (!product) return null;

    const totalPrice = item.quantity * product.price_unit;

    return (
        <div className="flex items-center py-4 border-b border-gray-200">
            <img src={product.imageUrl} alt={product.name} className="h-20 w-20 object-cover rounded-lg" />
            <div className="ml-4 flex-grow">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">${product.price_unit.toFixed(2)} / unit</p>
                <div className="flex items-center mt-2">
                    <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200"><MinusIcon className="h-4 w-4" /></button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200"><PlusIcon className="h-4 w-4" /></button>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold text-lg">${totalPrice.toFixed(2)}</p>
                <button onClick={() => onRemoveItem(item.productId)} className="text-red-500 hover:text-red-700 mt-1"><TrashIcon className="h-5 w-5"/></button>
            </div>
        </div>
    );
};

export const CartView: React.FC<CartViewProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  if (!isOpen) return null;

  const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
  
  const subtotal = cartItems.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product ? product.price_unit * item.quantity : 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={onClose}>
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col justify-center items-center text-center p-5">
            <h3 className="text-xl font-semibold text-gray-700">Your cart is empty</h3>
            <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
            <button onClick={onClose} className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto px-5">
              {cartItems.map(item => (
                <CartRow 
                    key={item.productId} 
                    item={item} 
                    product={getProductById(item.productId)}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                />
              ))}
            </div>
            <div className="p-5 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-600">Subtotal</span>
                    <span className="text-2xl font-bold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors text-lg">
                    Proceed to Checkout
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
