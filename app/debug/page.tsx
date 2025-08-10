'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DebugPage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchDebugInfo();
    }
  }, [user]);

  const fetchDebugInfo = async () => {
    try {
      // Get user info
      const userResponse = await fetch('/api/user/me', { credentials: 'include' });
      const userData = await userResponse.json();
      setUserInfo(userData);

      // Get products if user is seller
      if (userData.user?.role === 'seller') {
        const productsResponse = await fetch(`/api/products?seller=${userData.user.id}`, { 
          credentials: 'include' 
        });
        const productsData = await productsResponse.json();
        setProducts(productsData.products || []);
      }
    } catch (error) {
      console.error('Debug fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fixProducts = async () => {
    try {
      const response = await fetch('/api/admin/fix-products', { 
        method: 'POST', 
        credentials: 'include' 
      });
      const data = await response.json();
      alert(`Fixed ${data.fixedProducts} products`);
      fetchDebugInfo(); // Refresh data
    } catch (error) {
      console.error('Fix products error:', error);
      alert('Error fixing products');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
          <p>Please log in to see debug information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">User Information</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(userInfo, null, 2)}
              </pre>
            </div>

            {/* Products Info */}
            {userInfo?.user?.role === 'seller' && (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Products ({products.length})</h2>
                  <button
                    onClick={fixProducts}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Fix Products
                  </button>
                </div>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(products, null, 2)}
                </pre>
              </div>
            )}

            {/* Role Check */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Role Check</h2>
              <div className="space-y-2">
                <p><strong>Current Role:</strong> {userInfo?.user?.role || 'Not set'}</p>
                <p><strong>Is Seller:</strong> {userInfo?.user?.role === 'seller' ? '✅ Yes' : '❌ No'}</p>
                <p><strong>Can Access Seller Pages:</strong> {userInfo?.user?.role === 'seller' ? '✅ Yes' : '❌ No'}</p>
              </div>
              
              {userInfo?.user?.role !== 'seller' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Your account is not set as a seller. 
                    You need to either:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-yellow-700">
                    <li>Register a new account and select "Seller" role</li>
                    <li>Or update your current account role in the database</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
