'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ImageUpload from '@/components/ImageUpload';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function NewProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    comparePrice: '',
    images: [] as string[],
    category: '',
    inventory: {
      quantity: '',
      trackQuantity: true,
      allowBackorder: false
    },
    dimensions: {
      length: '',
      width: '',
      height: '',
      weight: ''
    },
    materials: [''],
    tags: ['']
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Product description is required');
      setLoading(false);
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      setLoading(false);
      return;
    }

    if (formData.images.length === 0) {
      setError('At least one product image is required');
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError('Product category is required');
      setLoading(false);
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim() || undefined,
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
        images: formData.images,
        category: formData.category,
        inventory: {
          quantity: formData.inventory.trackQuantity ? parseInt(formData.inventory.quantity) || 0 : 0,
          trackQuantity: formData.inventory.trackQuantity,
          allowBackorder: formData.inventory.allowBackorder
        },
        dimensions: {
          length: formData.dimensions.length ? parseFloat(formData.dimensions.length) : undefined,
          width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : undefined,
          height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : undefined,
          weight: formData.dimensions.weight ? parseFloat(formData.dimensions.weight) : undefined
        },
        materials: formData.materials.filter(m => m.trim()).map(m => m.trim()),
        tags: formData.tags.filter(t => t.trim()).map(t => t.trim())
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create product');
      }

      const data = await response.json();
      router.push('/seller/products');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materials: [...prev.materials, '']
    }));
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const updateMaterial = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.map((m, i) => i === index ? value : m)
    }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((t, i) => i === index ? value : t)
    }));
  };

  if (user?.role !== 'seller') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You need to be a seller to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/seller/products"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Create a new product listing for your handcrafted items</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Brief description for product listings"
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description *
              </label>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Detailed description of your product..."
                required
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
              maxImages={5}
            />
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price * ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compare Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.comparePrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, comparePrice: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
                <p className="text-sm text-gray-500 mt-1">Optional: Show original price for sales</p>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Inventory</h2>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.inventory.trackQuantity}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    inventory: { ...prev.inventory, trackQuantity: e.target.checked }
                  }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Track inventory quantity</span>
              </label>
            </div>

            {formData.inventory.trackQuantity && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity in Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.inventory.quantity}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      inventory: { ...prev.inventory, quantity: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.inventory.allowBackorder}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        inventory: { ...prev.inventory, allowBackorder: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow backorders when out of stock</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Dimensions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Dimensions (Optional)</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.dimensions.length}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dimensions: { ...prev.dimensions, length: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.dimensions.width}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dimensions: { ...prev.dimensions, width: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.dimensions.height}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dimensions: { ...prev.dimensions, height: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.dimensions.weight}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dimensions: { ...prev.dimensions, weight: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Materials</h2>

            {formData.materials.map((material, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={material}
                  onChange={(e) => updateMaterial(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Wood, Cotton, Silver"
                />
                <button
                  type="button"
                  onClick={() => removeMaterial(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addMaterial}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Add Material
            </button>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
            <p className="text-sm text-gray-600">Add tags to help customers find your product</p>

            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., handmade, vintage, eco-friendly"
                />
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Add Tag
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/seller/products"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
