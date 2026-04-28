import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X } from 'lucide-react';

interface Vacancy {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

const AdminVacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchVacancies = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/vacancies')
      .then(res => res.json())
      .then(data => { setVacancies(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  };

  useEffect(() => { fetchVacancies(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingVacancy(null);
    setFormData({ title: '', description: '', deadline: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setFormData({
      title: vacancy.title,
      description: vacancy.description,
      deadline: new Date(vacancy.deadline).toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingVacancy
        ? `http://localhost:5000/api/vacancies/${editingVacancy.id}`
        : 'http://localhost:5000/api/vacancies';
      const method = editingVacancy ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', deadline: '' });
        fetchVacancies();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Failed to save vacancy:', error);
      alert('Failed to save vacancy.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this vacancy?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/vacancies/${id}`, { method: 'DELETE' });
      if (response.ok) fetchVacancies();
      else alert('Failed to delete vacancy.');
    } catch (error) {
      console.error('Failed to delete vacancy:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Vacancies</h1>
          <p className="text-slate-500">Manage career opportunities at Himalayan Energy.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
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
            ) : vacancies.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">No vacancies found.</td></tr>
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
                    <button onClick={() => openEditModal(vacancy)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(vacancy.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Vacancy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">{editingVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Civil Engineer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Job details and requirements..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {submitting ? 'Saving...' : editingVacancy ? 'Update Vacancy' : 'Create Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVacancies;
