"use client";

import { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    site_name: '',
    site_description: '',
    contact_email: '',
    featured_content: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // For now, load default values
    // In production, fetch from /api/admin/settings
    setSettings({
      site_name: 'Literary Palace',
      site_description: 'A Gateway to the world of Literature',
      contact_email: 'official@literarypalace.com',
      featured_content: ''
    });
    setLoading(false);
  }, []);

  function handleChange(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    
    // Simulate save - in production, POST to /api/admin/settings
    setTimeout(() => {
      setMessage('Settings saved successfully!');
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07294e]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#07294e]">Site Settings</h1>
        <p className="text-gray-600 mt-1">Configure your website settings</p>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg">
          {message}
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#07294e] mb-4 flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2" />
            General Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => handleChange('site_name', e.target.value)}
           className="w-full border border-gray-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-[#07294e]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Description
              </label>
              <input
                type="text"
                value={settings.site_description}
                onChange={(e) => handleChange('site_description', e.target.value)}
           className="w-full border border-gray-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-[#07294e]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
           className="w-full border border-gray-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-[#07294e]"
              />
            </div>
          </div>
        </div>

        {/* Content Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#07294e] mb-4">
            Content Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Content IDs
              </label>
              <input
                type="text"
                value={settings.featured_content}
                onChange={(e) => handleChange('featured_content', e.target.value)}
                placeholder="e.g., 1,2,3 (comma-separated IDs)"
           className="w-full border border-gray-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-[#07294e]"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter content IDs to feature on the homepage (comma-separated)
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
       className="bg-[#07294e] text-white px-6 py-3 rounded-lg font-medium
              hover:bg-opacity-90 transition-opacity flex items-center space-x-2
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> These settings control site-wide configuration. Changes will be
          reflected across the entire website. The settings API endpoint will need to be implemented
          to persist changes to the database.
        </p>
      </div>
    </div>
  );
}
