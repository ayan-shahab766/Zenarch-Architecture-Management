export default function TermsAndConditions() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Header */}
      <div className="container mx-auto px-6 py-16 text-center border-b border-white/10">
        <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">Legal</span>
        <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">Terms & Conditions</h1>
        <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed text-lg">
          Please read these terms carefully before using our services. By accessing our website, you agree to be bound by these terms.
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Acceptance of Terms</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              By accessing and using Zenarch Studio's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Services</h2>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Zenarch Studio provides architectural design, consultation, and related services. All services are subject to availability and our standard terms.
            </p>
            <ul className="space-y-4 text-gray-400 font-light leading-relaxed">
              <li>• Architectural design and planning</li>
              <li>• Interior design consultation</li>
              <li>• Project management services</li>
              <li>• Construction supervision</li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Intellectual Property</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              All content, features, and functionality of our website and services, including but not limited to text, graphics, logos, and software, are owned by Zenarch Studio and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Limitation of Liability</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              In no event shall Zenarch Studio be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services. Our total liability shall not exceed the amount paid for the specific service in question.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-playfair text-white mb-6">Contact Information</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              For questions about these Terms & Conditions, please contact us at legal@zenarch.com or through our contact form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}