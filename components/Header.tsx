
import React from 'react';
import { UserRole } from '../types';
import { ShoppingCartIcon } from './Icons';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userRole, onRoleChange, cartItemCount, onCartClick }) => {
  const isRetail = userRole === UserRole.RETAIL;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-blue-600">Cherengani</span> Dairy
            </h1>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex items-center p-1 bg-gray-100 rounded-full">
              <button
                onClick={() => onRoleChange(UserRole.RETAIL)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${isRetail ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}
              >
                Retail
              </button>
              <button
                onClick={() => onRoleChange(UserRole.WHOLESALE)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${!isRetail ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}
              >
                Wholesale
              </button>
            </div>

            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCartIcon className="h-7 w-7" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
