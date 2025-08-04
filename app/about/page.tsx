import Navigation from '@/components/Navigation';
import { HeartIcon, UserGroupIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Handcrafted Haven
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We're passionate about connecting talented artisans with customers who appreciate 
              the beauty and quality of handmade products.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To create a thriving marketplace where artisans can showcase their craft, 
              tell their stories, and build sustainable businesses while providing customers 
              with unique, high-quality handmade products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unique Craftsmanship</h3>
              <p className="text-gray-600">
                Every product is carefully handcrafted with attention to detail and passion.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600">
                We believe in building strong relationships between artisans and customers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Made with Love</h3>
              <p className="text-gray-600">
                Each piece carries the heart and soul of its creator, making it truly special.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                We maintain high standards to ensure every purchase exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Handcrafted Haven was born from a simple belief: that handmade products carry 
                  a special magic that mass-produced items simply cannot match. Every stitch, 
                  every brushstroke, every carved detail tells a story of dedication, skill, 
                  and passion.
                </p>
                <p>
                  We started this platform to bridge the gap between talented artisans and 
                  customers who value authenticity and quality. In a world increasingly dominated 
                  by fast fashion and disposable goods, we champion the timeless appeal of 
                  handcrafted excellence.
                </p>
                <p>
                  Today, we're proud to support hundreds of artisans from around the world, 
                  helping them turn their passion into sustainable businesses while providing 
                  customers with unique, meaningful products that last a lifetime.
                </p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-gray-300">Active Artisans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-gray-300">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">25K+</div>
                  <div className="text-gray-300">Products Sold</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-gray-300">Countries Reached</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide everything we do at Handcrafted Haven
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-600">
                We celebrate genuine craftsmanship and the unique stories behind every handmade piece.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We promote sustainable practices and support artisans who care about their environmental impact.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We foster meaningful connections between creators and customers, building a supportive community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're an artisan looking to share your craft or a customer seeking unique handmade items, 
            you belong here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Selling
            </a>
            <a
              href="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
