'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
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
                <Link href="/seller/products" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  My Products
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
      </div>
    </nav>
  );
}
