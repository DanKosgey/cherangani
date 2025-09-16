
import React, { useState, useCallback } from 'react';
import { UserRole, Product, CartItem } from './types';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { CartView } from './components/CartView';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.RETAIL);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    // Optional: Clear cart on role change if business logic requires it
    // setCartItems([]);
  };

  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { productId: product.id, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateCartQuantity = useCallback((productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
        handleRemoveFromCart(productId);
        return;
    }
    setCartItems(prevItems =>
        prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
    );
  }, []);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  }, []);
  
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        userRole={userRole}
        onRoleChange={handleRoleChange}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main>
        <ProductList
          userRole={userRole}
          onAddToCart={handleAddToCart}
        />
      </main>
      <CartView
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
      <AiAssistant />
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Cherengani Dairy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
