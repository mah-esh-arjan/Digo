import { useState, useEffect } from 'react';
import { Mail, Phone, User, Calendar } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Inquiries</h1>
        <p className="text-slate-500">View and respond to messages from the contact form.</p>
      </header>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading inquiries...</div>
        ) : contacts.map((contact) => (
          <div key={contact.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full">
                  <User size={14} className="text-blue-500" />
                  <span className="font-medium">{contact.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full">
                  <Mail size={14} className="text-blue-500" />
                  <span>{contact.email}</span>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full">
                    <Phone size={14} className="text-blue-500" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full">
                  <Calendar size={14} className="text-blue-500" />
                  <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed bg-blue-50/30 p-4 rounded-xl border border-blue-50">
                {contact.message}
              </p>
            </div>
            <div className="flex md:flex-col justify-end gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Reply
              </button>
              <button className="text-slate-400 hover:text-red-600 transition-colors text-sm font-medium p-2">
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;
