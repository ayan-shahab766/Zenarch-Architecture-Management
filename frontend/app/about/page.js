import Image from 'next/image';

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Header */}
      <div className="container mx-auto px-6 py-16 text-center border-b border-white/10">
        <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">The Studio</span>
        <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">About Zenarch</h1>
        <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed text-lg">
          We are a luxury architectural studio dedicated to crafting spaces that elevate the human experience through meticulous design and uncompromised quality.
        </p>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-6 py-24 border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="h-[600px] w-full relative object-cover bg-center bg-cover" 
                 style={{backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&w=800&q=80")'}}>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold flex items-center justify-center p-8 hidden md:flex">
                <p className="font-playfair text-dark text-xl text-center leading-tight">15+ Years of Excellence</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-playfair text-white">Our Philosophy</h2>
            <div className="w-12 h-1 bg-gold"></div>
            <p className="text-gray-400 font-light leading-relaxed">
              At Zenarch, we believe that the spaces we inhabit shape our lives. Our approach marries the timeless principles of minimalism with opulent detailing, resulting in architecture that is both breathtaking and profoundly livable.
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              Founded in 2010 by visionary architects, our studio has grown into a globally recognized collective of designers, engineers, and creators who share a unified passion for transformative design.
            </p>
            <ul className="space-y-4 mt-8 pt-8 border-t border-white/10">
              <li className="flex items-start text-gray-300">
                <span className="text-gold mr-4">✓</span> Innovation in every line
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-gold mr-4">✓</span> Sustainable luxury practices
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-gold mr-4">✓</span> Bespoke client collaboration
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-24 bg-dark-layer">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-2 block">Leadership</span>
          <h2 className="text-4xl font-playfair text-white">Meet The Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Member 1 */}
          <div className="text-center group">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
              <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&w=400&q=80")'}}></div>
            </div>
            <h3 className="text-xl font-playfair text-white mb-1">Alexander Vance</h3>
            <p className="text-gold text-sm tracking-wider uppercase mb-4">Founder & Lead Architect</p>
            <p className="text-gray-400 text-sm font-light leading-relaxed">Visionary behind Zenarch's signature design language and global strategy.</p>
          </div>

          {/* Member 2 */}
          <div className="text-center group">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
              <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&w=400&q=80")'}}></div>
            </div>
            <h3 className="text-xl font-playfair text-white mb-1">Elena Rostova</h3>
            <p className="text-gold text-sm tracking-wider uppercase mb-4">Director of Interiors</p>
            <p className="text-gray-400 text-sm font-light leading-relaxed">Master of textures and spatial harmony, leading our interior design division.</p>
          </div>

          {/* Member 3 */}
          <div className="text-center group">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
              <div className="w-full h-full bg-cover bg-center top" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&w=400&q=80")'}}></div>
            </div>
            <h3 className="text-xl font-playfair text-white mb-1">Marcus Chen</h3>
            <p className="text-gold text-sm tracking-wider uppercase mb-4">Principal Landscape Designer</p>
            <p className="text-gray-400 text-sm font-light leading-relaxed">Integrating organic environments with structural brilliance seamlessly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
