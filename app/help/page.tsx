import Navigation from '@/components/Navigation';
import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function HelpPage() {

  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <QuestionMarkCircleIcon className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Help Center
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Find answers to common questions or get in touch with our support team. 
              We're here to help make your Handcrafted Haven experience amazing.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Help Options */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How Can We Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QuestionMarkCircleIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse FAQs</h3>
              <p className="text-gray-600 mb-4">
                Find quick answers to the most common questions about buying, selling, and using our platform.
              </p>
              <a href="#faqs" className="text-gray-900 hover:text-gray-700 font-medium">
                View FAQs →
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Chat with our support team in real-time for immediate assistance with your questions.
              </p>
              <button className="text-gray-900 hover:text-gray-700 font-medium">
                Start Chat →
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Send us a detailed message and we'll get back to you within 24 hours.
              </p>
              <a href="/contact" className="text-gray-900 hover:text-gray-700 font-medium">
                Contact Us →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faqs" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>

          {/* Static FAQ List */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4">
                <h3 className="font-medium text-gray-900 mb-2">What is Handcrafted Haven?</h3>
                <p className="text-gray-600">Handcrafted Haven is a marketplace that connects talented artisans with customers who appreciate unique, handmade products. We focus exclusively on authentic, handcrafted items made by skilled creators around the world.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4">
                <h3 className="font-medium text-gray-900 mb-2">How do I know products are genuinely handmade?</h3>
                <p className="text-gray-600">We carefully vet all our artisans and their products. Each seller must provide proof of their handmaking process, and we regularly review listings to ensure authenticity. All products come with our handmade guarantee.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4">
                <h3 className="font-medium text-gray-900 mb-2">How do I place an order?</h3>
                <p className="text-gray-600">Simply browse our products, click on items you like, and add them to your cart. When ready, proceed to checkout, enter your shipping and payment information, and complete your purchase.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4">
                <h3 className="font-medium text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and other secure payment methods through our certified payment processors.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4">
                <h3 className="font-medium text-gray-900 mb-2">What is your return policy?</h3>
                <p className="text-gray-600">We offer a 30-day return policy for most items. Products must be returned in their original condition. Custom or personalized items may have different return policies as specified by the seller.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4">
                <h3 className="font-medium text-gray-900 mb-2">How do I become a seller?</h3>
                <p className="text-gray-600">Click "Join as Seller" on our homepage, create an account, and complete your seller profile with information about your craft and business. Once approved, you can start listing your handmade products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our friendly support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/returns"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Returns & Exchanges
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
