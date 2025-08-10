'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingBagIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  seller: {
    _id: string;
    name: string;
    businessName?: string;
  };
  inventory?: {
    quantity: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
  };
}

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  showQuantitySelector?: boolean;
}

export default function AddToCartButton({ 
  product, 
  quantity = 1, 
  className = '',
  showQuantitySelector = false 
}: AddToCartButtonProps) {
  const { addItem, isInCart, getItemQuantity } = useCart();
  const { user } = useAuth();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const currentQuantityInCart = getItemQuantity(product._id);
  const maxQuantity = product.inventory?.trackQuantity
    ? Math.max(0, (product.inventory?.quantity || 0) - currentQuantityInCart)
    : 999;

  const canAddToCart = maxQuantity > 0 || product.inventory?.allowBackorder;
  const isOwnProduct = user?.id === product.seller._id;

  const handleAddToCart = async () => {
    if (!canAddToCart || isOwnProduct) return;

    setIsAdding(true);
    
    try {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/placeholder-image.jpg',
        seller: {
          id: product.seller._id,
          name: product.seller.businessName || product.seller.name
        },
        maxQuantity: product.inventory?.trackQuantity ? product.inventory?.quantity : undefined
      };

      addItem(cartItem, selectedQuantity);
      
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isOwnProduct) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-sm text-gray-500">This is your own product</p>
      </div>
    );
  }

  if (!canAddToCart && !product.inventory?.allowBackorder) {
    return (
      <div className={`text-center ${className}`}>
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-md cursor-not-allowed"
        >
          Out of Stock
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {showQuantitySelector && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <select
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isAdding}
          >
            {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {product.inventory?.trackQuantity && (
            <p className="text-sm text-gray-500 mt-1">
              {maxQuantity} available
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={isAdding || (!canAddToCart && !product.inventory?.allowBackorder)}
        className={`
          w-full flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors
          ${justAdded 
            ? 'bg-green-600 text-white' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Adding...
          </>
        ) : justAdded ? (
          <>
            <CheckIcon className="h-5 w-5 mr-2" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingBagIcon className="h-5 w-5 mr-2" />
            Add to Cart
          </>
        )}
      </button>

      {isInCart(product._id) && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          {currentQuantityInCart} in cart
        </p>
      )}
    </div>
  );
}
