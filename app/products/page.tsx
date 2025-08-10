'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: Category;
  seller: {
    _id: string;
    name: string;
    businessName?: string;
  };
  averageRating: number;
  totalReviews: number;
  isFeatured: boolean;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page') || '1')
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      params.append('page', filters.page.toString());

      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value // Reset to page 1 when changing filters
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {filters.search ? `Search Results for "${filters.search}"` : 'Handcrafted Products'}
          </h1>
          {pagination && (
            <p className="text-gray-600">
              {filters.search
                ? `Found ${pagination.totalProducts} ${pagination.totalProducts === 1 ? 'product' : 'products'} matching "${filters.search}"`
                : `Showing ${pagination.totalProducts} ${pagination.totalProducts === 1 ? 'product' : 'products'}`
              }
            </p>
          )}
          
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category._id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  {pagination && (
                    <span>
                      Showing {((pagination.currentPage - 1) * 12) + 1}-{Math.min(pagination.currentPage * 12, pagination.totalProducts)} of {pagination.totalProducts} products
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/products/${product.slug}`}>
                  <div className="aspect-square bg-gray-200">
                    {product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-indigo-600">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {product.shortDescription && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}

                  <div className="flex items-center mb-2">
                    {renderStars(product.averageRating)}
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.totalReviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.comparePrice && product.comparePrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.isFeatured && (
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    by {product.seller.businessName || product.seller.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Products */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 mb-4">No products found</div>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handleFilterChange('page', filters.page - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => handleFilterChange('page', filters.page + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
