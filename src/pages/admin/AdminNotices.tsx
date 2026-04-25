import { useState, useEffect } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  content: string;
  fileUrl?: string;
  createdAt: string;
}

const AdminNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/notices')
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Public Notices</h1>
          <p className="text-slate-500">Manage official announcements and documents.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Post Notice
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading notices...</div>
        ) : notices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center hover:border-blue-200 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{notice.title}</h3>
                <p className="text-sm text-slate-500 mb-2">{new Date(notice.createdAt).toLocaleDateString()}</p>
                <p className="text-slate-600 text-sm line-clamp-2">{notice.content}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotices;
