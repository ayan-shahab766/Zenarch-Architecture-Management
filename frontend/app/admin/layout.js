import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-dark min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden pt-20 pb-10">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
