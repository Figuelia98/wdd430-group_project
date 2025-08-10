'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AddToCartButton from '@/components/AddToCartButton';
import ReviewForm from '@/components/ReviewForm';
import ReviewsList from '@/components/ReviewsList';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeftIcon, StarIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  seller: {
    _id: string;
    name: string;
    businessName?: string;
    businessDescription?: string;
  };
  inventory: {
    quantity: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
  };
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
  };
  materials?: string[];
  tags?: string[];
  averageRating: number;
  totalReviews: number;
  createdAt: string;
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviewRefresh, setReviewRefresh] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      // First try to find by slug
      const response = await fetch(`/api/products?search=${params.slug}&limit=1`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();
      const foundProduct = data.products.find((p: Product) => p.slug === params.slug);
      
      if (!foundProduct) {
        throw new Error('Product not found');
      }

      setProduct(foundProduct);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      i < Math.floor(rating) ? (
        <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
      ) : (
        <StarIcon key={i} className="h-5 w-5 text-gray-300" />
      )
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <Link
              href="/products"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-indigo-600">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category.slug}`} className="hover:text-indigo-600">
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImageIndex] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-indigo-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(product.averageRating)}</div>
              <span className="ml-2 text-sm text-gray-600">
                {product.averageRating.toFixed(1)} ({product.totalReviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.comparePrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.comparePrice && product.comparePrice > product.price && (
                <p className="text-sm text-green-600 mt-1">
                  Save ${(product.comparePrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-lg text-gray-600 mb-6">{product.shortDescription}</p>
            )}

            {/* Seller Info */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Sold by</h3>
              <p className="text-lg font-medium text-gray-900">
                {product.seller.businessName || product.seller.name}
              </p>
              {product.seller.businessDescription && (
                <p className="text-sm text-gray-600 mt-1">{product.seller.businessDescription}</p>
              )}
            </div>

            {/* Stock Status */}
            {product.inventory.trackQuantity && (
              <div className="mb-6">
                {product.inventory.quantity > 0 ? (
                  <p className="text-green-600 font-medium">
                    ✓ In stock ({product.inventory.quantity} available)
                  </p>
                ) : product.inventory.allowBackorder ? (
                  <p className="text-yellow-600 font-medium">
                    ⚠ Available for backorder
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">
                    ✗ Out of stock
                  </p>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartButton 
              product={product} 
              showQuantitySelector={true}
              className="mb-6"
            />

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                <HeartIcon className="h-5 w-5 mr-2" />
                Add to Wishlist
              </button>
              <button className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                <ShareIcon className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Materials</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.dimensions && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Dimensions</h4>
                  <div className="text-sm text-gray-600">
                    {product.dimensions.length && (
                      <span>Length: {product.dimensions.length}cm </span>
                    )}
                    {product.dimensions.width && (
                      <span>Width: {product.dimensions.width}cm </span>
                    )}
                    {product.dimensions.height && (
                      <span>Height: {product.dimensions.height}cm </span>
                    )}
                    {product.dimensions.weight && (
                      <span>Weight: {product.dimensions.weight}g</span>
                    )}
                  </div>
                </div>
              )}

              {product.tags && product.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/products?search=${tag}`}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm hover:bg-indigo-200 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="prose max-w-none text-gray-600">
            {product.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          
          {/* Review Form */}
          {user && user.id !== product.seller._id && (
            <div className="mb-8">
              <ReviewForm 
                productId={product._id} 
                onReviewSubmitted={() => setReviewRefresh(prev => prev + 1)}
              />
            </div>
          )}

          {/* Reviews List */}
          <ReviewsList 
            productId={product._id} 
            refreshTrigger={reviewRefresh}
          />
        </div>
      </div>
    </div>
  );
}
