import AdminSidebar from '@/components/admin/AdminSidebar';
import { Routes, Route } from 'react-router-dom';
import AdminVacancies from './AdminVacancies';
import AdminNotices from './AdminNotices';
import AdminContacts from './AdminContacts';
import AdminGallery from './AdminGallery';

const DashboardOverview = () => (
  <div className="p-8">
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="text-slate-500">Welcome to the Himalayan Energy CMS.</p>
    </header>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Total Vacancies</h3>
        <p className="text-4xl font-bold text-slate-900">2</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Public Notices</h3>
        <p className="text-4xl font-bold text-slate-900">2</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Inquiries</h3>
        <p className="text-4xl font-bold text-blue-600">1</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/vacancies" element={<AdminVacancies />} />
          <Route path="/notices" element={<AdminNotices />} />
          <Route path="/contacts" element={<AdminContacts />} />
          <Route path="/gallery" element={<AdminGallery />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
