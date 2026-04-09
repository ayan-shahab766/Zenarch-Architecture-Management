import Link from 'next/link';

export default function AdminSidebar({ mobileOpen, onClose }) {
  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-dark-light border-r border-white/10 p-6 transform transition-transform duration-300 md:static md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:block`}>
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-playfair font-bold text-gold tracking-widest leading-none">
              ZENARCH
            </h2>
            <span className="text-[9px] uppercase font-poppins tracking-[0.3em] text-white/50 block mt-1">
              Admin Portal
            </span>
          </div>
          {mobileOpen && (
            <button onClick={onClose} className="text-white hover:text-gold md:hidden" aria-label="Close admin menu">
              ✕
            </button>
          )}
        </div>

        <nav className="space-y-2">
          <Link href="/admin" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors" onClick={onClose}>
            Dashboard Overview
          </Link>
          <Link href="/admin/projects" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors" onClick={onClose}>
            Manage Projects
          </Link>
          <Link href="/admin/categories" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors" onClick={onClose}>
            Categories
          </Link>
          <Link href="/admin/messages" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors" onClick={onClose}>
            Inquiries / Messages
          </Link>
          <Link href="/admin/users" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors" onClick={onClose}>
            Users
          </Link>
          <Link href="/admin/gallery" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors" onClick={onClose}>
            Media Gallery
          </Link>
          <Link href="/admin/settings" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors" onClick={onClose}>
            Site Settings
          </Link>
        </nav>

        <div className="mt-24 pt-8 border-t border-white/10">
          <Link href="/" className="block px-4 py-3 text-sm text-gold hover:text-white transition-colors" onClick={onClose}>
            &larr; Back to Website
          </Link>
        </div>
      </div>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={onClose} />}
    </>
  );
}
