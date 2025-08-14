import Navigation from '@/components/Navigation';

export default function TermsPage() {
  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Handcrafted Haven ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials on Handcrafted Haven for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Seller Accounts</h3>
              <p className="text-gray-600 mb-4">
                Sellers must provide accurate business information and ensure all products listed are genuinely handmade. Misrepresentation of products or business information may result in account suspension or termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Product Listings and Sales</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Seller Responsibilities</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Ensure all products are genuinely handmade</li>
                <li>Provide accurate product descriptions and images</li>
                <li>Honor pricing and availability as listed</li>
                <li>Ship products within stated timeframes</li>
                <li>Respond to customer inquiries promptly</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Buyer Responsibilities</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Provide accurate shipping and payment information</li>
                <li>Communicate respectfully with sellers</li>
                <li>Leave honest and fair reviews</li>
                <li>Report any issues promptly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment and Fees</h2>
              <p className="text-gray-600 mb-4">
                Handcrafted Haven facilitates transactions between buyers and sellers. We may charge transaction fees, listing fees, or other service fees as outlined in our fee schedule.
              </p>
              <p className="text-gray-600 mb-4">
                All payments are processed securely through our payment partners. We do not store credit card information on our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
              <p className="text-gray-600 mb-4">
                Our return policy allows for returns within 30 days of purchase for most items. Custom or personalized items may have different return policies as specified by the seller.
              </p>
              <p className="text-gray-600 mb-4">
                Refunds will be processed to the original payment method within 5-10 business days after we receive the returned item.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                The service and its original content, features, and functionality are and will remain the exclusive property of Handcrafted Haven and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-gray-600 mb-4">
                Sellers retain ownership of their product designs and intellectual property but grant us a license to display and market their products on our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-600 mb-4">You may not use our service:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimer</h2>
              <p className="text-gray-600 mb-4">
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms whether express or implied.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitations</h2>
              <p className="text-gray-600 mb-4">
                In no event shall Handcrafted Haven or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Accuracy of Materials</h2>
              <p className="text-gray-600 mb-4">
                The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Links</h2>
              <p className="text-gray-600 mb-4">
                We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Modifications</h2>
              <p className="text-gray-600 mb-4">
                We may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  Email: legal@handcraftedhaven.com<br />
                  Address: 123 Artisan Way, Craft City, CC 12345<br />
                  Phone: (555) 123-4567
                </p>
              </div>
            </section>

          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-indigo-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Have Questions About Our Terms?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help clarify any questions you may have.
              </p>
              <a
                href="/contact"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>

          </div>
        </div>
      </div>
  );
}
