import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function ArtisansPage() {

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meet Our Artisans
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Discover the talented creators behind our beautiful handcrafted products. 
              Each artisan brings their unique skills, passion, and story to our marketplace.
            </p>
          </div>
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 mb-4">Our Artisan Community</div>
            <p className="text-gray-500">We're building a community of talented creators. Check back soon as more artisans join our platform!</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-600 font-medium text-xl">A</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Artisan Profiles</h3>
                <p className="text-gray-600 text-sm">Detailed profiles showcasing each creator's unique skills and story</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-600 font-medium text-xl">C</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Craft Specialties</h3>
                <p className="text-gray-600 text-sm">Browse artisans by their specialized crafts and techniques</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-600 font-medium text-xl">R</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews & Ratings</h3>
                <p className="text-gray-600 text-sm">Customer reviews and ratings to help you find quality creators</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Become an Artisan CTA */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Artisan Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Are you a talented creator? Share your craft with the world and build a sustainable business 
            with customers who appreciate handmade quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Become an Artisan
            </Link>
            <Link
              href="/products"
              className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Handcrafted Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
