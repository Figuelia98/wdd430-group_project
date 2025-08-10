'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircleIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  items: Array<{
    product: {
      _id: string;
      name: string;
      slug: string;
    };
    name: string;
    price: number;
    quantity: number;
    image: string;
    seller: {
      _id: string;
      name: string;
      businessName?: string;
    };
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  paymentInfo: {
    method: string;
    status: string;
    amount: number;
    currency: string;
  };
  createdAt: string;
  estimatedDelivery?: string;
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrder();
    }
  }, [user, resolvedParams.id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${resolvedParams.id}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }

      const data = await response.json();
      setOrder(data.order);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">Please log in to view your order.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The order you are looking for does not exist.'}</p>
            <Link
              href="/orders"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order #{order.orderNumber}</h2>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  order.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-6 py-4">
            <h3 className="font-medium text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      by {item.seller.businessName || item.seller.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping and Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <TruckIcon className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="font-medium text-gray-900">Shipping Address</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              {order.shippingAddress.phone && <p>Phone: {order.shippingAddress.phone}</p>}
            </div>
            {order.estimatedDelivery && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="font-medium text-gray-900">Payment Information</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900">
                {order.paymentInfo.method === 'credit_card' ? 'Credit Card' : 'PayPal'}
              </p>
              <p>Amount: ${order.paymentInfo.amount.toFixed(2)} {order.paymentInfo.currency}</p>
              <p className="capitalize">Status: {order.paymentInfo.status}</p>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-md">
              <p className="text-sm text-green-800">
                <strong>Payment Confirmed</strong> - Your payment has been successfully processed.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-medium text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                1
              </div>
              <p>We'll send you an email confirmation with your order details.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                2
              </div>
              <p>Our artisans will prepare your handcrafted items with care.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                3
              </div>
              <p>You'll receive tracking information once your order ships.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/orders"
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors text-center"
          >
            View All Orders
          </Link>
          <Link
            href="/products"
            className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
