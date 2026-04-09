export default function PrivacyPolicy() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Header */}
      <div className="container mx-auto px-6 py-16 text-center border-b border-white/10">
        <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">Legal</span>
        <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">Privacy Policy</h1>
        <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed text-lg">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Information We Collect</h2>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              We collect information you provide directly to us, such as when you contact us, subscribe to our newsletter, or engage with our services. This may include your name, email address, phone number, and any other information you choose to provide.
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              We also automatically collect certain information about your device and how you interact with our website, including IP address, browser type, and usage data.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">How We Use Your Information</h2>
            <ul className="space-y-4 text-gray-400 font-light leading-relaxed">
              <li>• To provide and improve our architectural services</li>
              <li>• To communicate with you about our projects and services</li>
              <li>• To respond to your inquiries and requests</li>
              <li>• To send you updates and marketing materials (with your consent)</li>
              <li>• To comply with legal obligations</li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Information Sharing</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or required by law. We may share your information with trusted service providers who assist us in operating our website and conducting our business.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Data Security</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Contact Us</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@zenarch.com or through our contact form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}