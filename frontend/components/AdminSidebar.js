import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-dark-light border-r border-white/10 min-h-screen p-6 hidden md:block">
      <div className="mb-12">
        <h2 className="text-xl font-playfair font-bold text-gold tracking-widest leading-none">
          ZENARCH
        </h2>
        <span className="text-[9px] uppercase font-poppins tracking-[0.3em] text-white/50 block mt-1">
          Admin Portal
        </span>
      </div>

      <nav className="space-y-2">
        <Link href="/admin" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          Dashboard Overview
        </Link>
        <Link href="/admin/projects" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          Manage Projects
        </Link>
        <Link href="/admin/categories" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          Categories
        </Link>
        <Link href="/admin/messages" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          Inquiries / Messages
        </Link>
        <Link href="/admin/users" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          Users
        </Link>
        <Link href="/admin/gallery" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          Media Gallery
        </Link>
        <Link href="/admin/settings" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          Site Settings
        </Link>
      </nav>

      <div className="mt-24 pt-8 border-t border-white/10">
        <Link href="/" className="block px-4 py-3 text-sm text-gold hover:text-white transition-colors">
          &larr; Back to Website
        </Link>
        <button className="w-full text-left px-4 py-3 text-sm text-burgundy-light hover:text-burgundy transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  );
}
