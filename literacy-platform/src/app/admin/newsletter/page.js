"use client";

import { useState, useEffect } from 'react';
import { Mail, Download, UserPlus } from 'lucide-react';
import { useActionToast } from '@/components/sharedComponents/ActionToast';

export default function NewsletterPage() {
  const { Toast, showToast } = useActionToast();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    // For now, this will show empty until newsletter API is implemented
    setLoading(false);
    setSubscribers([]);
  }

  function exportToCSV() {
    if (subscribers.length === 0) {
      showToast('error', 'No subscribers to export');
      return;
    }

    const csv = [
      ['Email', 'First Name', 'Last Name', 'Subscribed At', 'Status'],
      ...subscribers.map(sub => [
        sub.email,
        sub.first_name || '',
        sub.last_name || '',
        new Date(sub.subscribed_at).toLocaleDateString(),
        sub.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07294e]"></div>
      </div>
    );
  }

  return (
    <>
      {Toast}
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#07294e]">Newsletter Subscribers</h1>
          <p className="text-gray-600 mt-1">Total: {subscribers.length} subscribers</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportToCSV}
            disabled={subscribers.length === 0}
       className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium
              hover:bg-green-700 transition-colors flex items-center space-x-2
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
              <p className="text-3xl font-bold text-[#07294e] mt-2">
                {subscribers.filter(s => s.status === 'active').length}
              </p>
            </div>
            <Mail className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unsubscribed</p>
              <p className="text-3xl font-bold text-[#07294e] mt-2">
                {subscribers.filter(s => s.status === 'unsubscribed').length}
              </p>
            </div>
            <UserPlus className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-[#07294e] mt-2">
                {subscribers.filter(s => {
                  const subDate = new Date(s.subscribed_at);
                  const now = new Date();
                  return subDate.getMonth() === now.getMonth() && 
                         subDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Subscribers List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No newsletter subscribers yet.</p>
            <p className="text-sm mt-2">Subscribers will appear here when users sign up via the website form.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Subscribed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{subscriber.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {subscriber.first_name} {subscriber.last_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        subscriber.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {subscriber.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Newsletter subscribers are automatically added when users submit
          the newsletter form on the website. The newsletter_subscribers table will store all submissions.
          You can export the list to CSV for use with email marketing tools.
        </p>
      </div>
      </div>
    </>
  );
}