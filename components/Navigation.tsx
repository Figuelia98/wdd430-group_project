'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import ShoppingCart from './ShoppingCart';
import SearchAutocomplete from './SearchAutocomplete';
import { ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const { user, logout, loading } = useAuth();
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query.trim())}`;
    }
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Handcrafted Haven
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">Loading...</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Handcrafted Haven
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/products" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Browse Products
              </Link>
              <Link href="/products?featured=true" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Featured
              </Link>
              {user?.role === 'seller' && (
                <>
                  <Link href="/seller/products" className="text-gray-700 hover:text-indigo-600 transition-colors">
                    My Products
                  </Link>
                  <Link href="/seller/orders" className="text-gray-700 hover:text-indigo-600 transition-colors">
                    My Orders
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                const searchInput = document.getElementById('mobile-search');
                if (searchInput) {
                  searchInput.focus();
                }
              }}
              className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block">
              <SearchAutocomplete
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={handleSearch}
                placeholder="Search products..."
                className="w-64"
              />
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:block">
                  Welcome, {user.name}
                </span>
                {user.role === 'seller' && (
                  <Link
                    href="/seller/profile"
                    className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
                  >
                    Seller Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-4">
          <SearchAutocomplete
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            placeholder="Search products..."
            className="w-full"
          />
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
