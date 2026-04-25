import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Vacancy {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

const AdminVacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/vacancies')
      .then(res => res.json())
      .then(data => {
        setVacancies(data);
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
          <h1 className="text-3xl font-bold text-slate-900">Vacancies</h1>
          <p className="text-slate-500">Manage career opportunities at Himalayan Energy.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Add Vacancy
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">Deadline</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">Loading vacancies...</td></tr>
            ) : vacancies.map((vacancy) => (
              <tr key={vacancy.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{vacancy.title}</p>
                  <p className="text-sm text-slate-500 line-clamp-1">{vacancy.description}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(vacancy.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVacancies;
