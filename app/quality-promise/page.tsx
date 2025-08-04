import Navigation from '@/components/Navigation';
import { ShieldCheckIcon, StarIcon, HeartIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function QualityPromisePage() {
  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShieldCheckIcon className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Quality Promise
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We're committed to ensuring every handcrafted item meets the highest standards 
              of quality, authenticity, and craftsmanship.
            </p>
          </div>
        </div>
      </div>

      {/* Promise Overview */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Promise</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              When you shop at Handcrafted Haven, you can trust that every purchase is backed 
              by our comprehensive quality guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentic Handmade</h3>
              <p className="text-gray-600">
                Every item is genuinely handcrafted by skilled artisans, not mass-produced.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Materials</h3>
              <p className="text-gray-600">
                Our artisans use only high-quality materials and sustainable practices.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Made with Care</h3>
              <p className="text-gray-600">
                Each piece is crafted with attention to detail and genuine passion.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Checked</h3>
              <p className="text-gray-600">
                Every item is reviewed to ensure it meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Promises */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Detailed Commitments</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Authenticity Guarantee</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What We Verify:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Each artisan's credentials and craft expertise
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Product creation process and techniques used
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Materials sourcing and quality standards
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Promise:</h4>
                  <p className="text-gray-600">
                    If any item is found to be mass-produced or not genuinely handmade, 
                    we'll provide a full refund and remove the seller from our platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quality Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Material Quality:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Premium, durable materials only
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Sustainable and ethically sourced when possible
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Safe, non-toxic materials for all products
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Craftsmanship:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Attention to detail in every aspect
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Proper finishing and quality control
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Functional and aesthetically pleasing design
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">30-Day Return Policy</h4>
                  <p className="text-gray-600">
                    Not completely satisfied? Return any item within 30 days for a full refund.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Damage Protection</h4>
                  <p className="text-gray-600">
                    Items damaged during shipping are replaced at no cost to you.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Direct Support</h4>
                  <p className="text-gray-600">
                    Connect directly with artisans for custom requests and questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How We Ensure Quality */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How We Ensure Quality</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Artisan Vetting</h3>
              <p className="text-gray-600">
                We carefully review each artisan's portfolio, techniques, and commitment to quality
                before approving them to sell on our platform.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Review</h3>
              <p className="text-gray-600">
                Every product listing is reviewed for accuracy, quality claims, and adherence
                to our handmade standards before going live.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Feedback</h3>
              <p className="text-gray-600">
                We monitor customer reviews and feedback to ensure artisans maintain
                high standards and address any quality concerns promptly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Questions About Our Quality Promise?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            We're here to help. Contact our support team if you have any concerns about product quality.
          </p>
          <a
            href="/contact"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
