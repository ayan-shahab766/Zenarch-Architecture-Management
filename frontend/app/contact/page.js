"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [settings, setSettings] = useState({
    email: 'Loading...',
    whatsapp: 'Loading...',
    address: 'Loading...'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/settings');
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('http://localhost:5000/api/messages', formData);
      setStatus('Message sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16 border-b border-white/10 pb-16">
          <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">Contact Us</h1>
          <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed text-lg">
            Whether you're ready to start a project or simply inquiring, we invite you to connect with our studio.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <h3 className="text-2xl font-playfair text-white mb-4">Headquarters</h3>
              <p className="text-gray-400 font-light mb-2 whitespace-pre-wrap">{settings.address}</p>
              <p className="text-gray-400 font-light text-sm uppercase tracking-widest mt-4">Global</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-playfair text-white mb-4">Direct Lines</h3>
              <p className="text-gray-400 font-light mb-2 hover:text-gold transition-colors block">
                <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">WhatsApp: {settings.whatsapp}</a>
              </p>
              <p className="text-gray-400 font-light mb-2 hover:text-gold transition-colors block">
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="glass-card p-8 md:p-12">
              <h3 className="text-2xl font-playfair text-white mb-8">Send an Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Phone Number (Optional)</label>
                  <input 
                    type="text" 
                    className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Project Details</label>
                  <textarea 
                    rows="5"
                    required
                    className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full md:w-auto">
                  Submit Request
                </button>
                {status && <p className={`mt-4 text-sm ${status.includes('success') ? 'text-green-400' : 'text-gold'}`}>{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
