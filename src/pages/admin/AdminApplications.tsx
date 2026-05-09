import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, FileText, Briefcase, MessageSquare } from 'lucide-react';
import API_BASE from '@/lib/api';

interface Application {
  id: number;
  vacancyId: number;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  cvUrl: string;
  createdAt: string;
}

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch(API_BASE + '/api/applications')
      .then(res => res.json())
      .then(data => { setApplications(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
        <p className="text-slate-500">CVs submitted through the vacancy apply form.</p>
      </header>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
          No applications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <User size={18} className="text-blue-600" />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                    {app.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full">
                    <Mail size={13} className="text-blue-500" /> {app.email}
                  </span>
                  {app.phone && (
                    <span className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full">
                      <Phone size={13} className="text-blue-500" /> {app.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full">
                    <Briefcase size={13} className="text-blue-500" /> Vacancy #{app.vacancyId}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full">
                    <Calendar size={13} /> {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {app.message && (
                    <button
                      onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <MessageSquare size={13} />
                      {expanded === app.id ? 'Hide' : 'Message'}
                    </button>
                  )}
                  <a
                    href={`${API_BASE}${app.cvUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <FileText size={13} /> View CV
                  </a>
                </div>
              </div>

              {/* Cover letter */}
              {expanded === app.id && app.message && (
                <div className="px-5 pb-5">
                  <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
                    {app.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
