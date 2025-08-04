import Navigation from '@/components/Navigation';

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Name and contact information (email, phone, address)</li>
                <li>Payment information (processed securely by our payment partners)</li>
                <li>Profile information (business details for sellers)</li>
                <li>Communications with us and other users</li>
                <li>Reviews and ratings you provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4">
                When you use our service, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage information (pages visited, time spent, features used)</li>
                <li>Location information (general geographic location)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
                <li>Personalize your experience on our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">With Other Users</h3>
              <p className="text-gray-600 mb-4">
                When you make a purchase or leave a review, certain information (like your name and review) may be visible to other users.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">With Service Providers</h3>
              <p className="text-gray-600 mb-4">
                We share information with third-party service providers who help us operate our platform, such as payment processors, shipping companies, and analytics providers.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">For Legal Reasons</h3>
              <p className="text-gray-600 mb-4">
                We may disclose information if required by law or if we believe disclosure is necessary to protect our rights, property, or safety, or that of others.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure payment processing through certified partners</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Information</h3>
              <p className="text-gray-600 mb-4">
                You can update, correct, or delete your account information at any time by logging into your account settings.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Communications</h3>
              <p className="text-gray-600 mb-4">
                You can opt out of receiving promotional emails by following the unsubscribe instructions in those emails or by contacting us directly.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies</h3>
              <p className="text-gray-600 mb-4">
                Most web browsers are set to accept cookies by default. You can choose to set your browser to remove or reject cookies, but this may affect the functionality of our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Data Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  Email: privacy@handcraftedhaven.com<br />
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
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-600 mb-6">
                We're committed to protecting your privacy. Contact us if you have any concerns.
              </p>
              <a
                href="/contact"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
