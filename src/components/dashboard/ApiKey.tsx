import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Key, Copy, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function ApiKey() {
  const { user, updateUserProfile, refreshUser } = useAuth();
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveApiKey = async () => {
    if (!newApiKey.trim()) {
      setMessage({ type: 'error', text: 'Please enter an API key' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await updateUserProfile({ api_key: newApiKey.trim() });
      await refreshUser();
      setMessage({ type: 'success', text: 'API key updated successfully' });
      setNewApiKey('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update API key' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Key className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">API Key Management</h2>
            <p className="text-slate-400">
              Your API key is used to authenticate requests to the backend API
            </p>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg border flex items-start space-x-3 ${
            message.type === 'success'
              ? 'bg-green-600/10 border-green-600/30'
              : 'bg-red-600/10 border-red-600/30'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
            ) : (
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
            )}
            <p className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
              {message.text}
            </p>
          </div>
        )}

        {user?.api_key ? (
          <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Current API Key</h3>
              <button
                onClick={() => setShowKey(!showKey)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {showKey ? (
                  <EyeOff className="text-slate-400" size={20} />
                ) : (
                  <Eye className="text-slate-400" size={20} />
                )}
              </button>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 mb-4">
              <code className="text-slate-300 font-mono text-sm break-all">
                {showKey ? user.api_key : '••••••••••••••••••••••••••••••••'}
              </code>
            </div>

            <button
              onClick={() => copyToClipboard(user.api_key || '')}
              className="w-full px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Copy size={16} />
              <span>{copied ? 'Copied!' : 'Copy API Key'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="text-white font-semibold mb-2">No API Key Configured</h3>
                <p className="text-slate-400 text-sm">
                  Contact the administrator to receive your API key, then add it below to start using the dashboard features.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            {user?.api_key ? 'Update API Key' : 'Add API Key'}
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300 mb-2">
                API Key
              </label>
              <input
                id="apiKey"
                type="text"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>

            <button
              onClick={handleSaveApiKey}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : user?.api_key ? 'Update API Key' : 'Save API Key'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">API Documentation</h3>
        <p className="text-slate-400 mb-4">
          Use your API key to interact with the backend API programmatically.
        </p>

        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
          <code className="text-sm text-slate-300 font-mono">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>

        <a
          href="https://petstore.swagger.io/?url=https://backend.panel.gamestates.de/v1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
        >
          View Full API Documentation
        </a>
      </div>
    </div>
  );
}
