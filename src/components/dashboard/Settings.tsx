import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Settings as SettingsIcon, User, Save, Loader } from 'lucide-react';

export default function Settings() {
  const { user, updateUserProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      setMessage({ type: 'error', text: 'Full name cannot be empty' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await updateUserProfile({ full_name: fullName.trim() });
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
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
            <SettingsIcon className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Account Settings</h2>
            <p className="text-slate-400">
              Manage your account preferences and profile information
            </p>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success'
              ? 'bg-green-600/10 border-green-600/30 text-green-400'
              : 'bg-red-600/10 border-red-600/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <User className="text-blue-400" size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">Profile Information</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-2">Email cannot be changed</p>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={loading || fullName === user?.full_name}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-slate-700">
            <span className="text-slate-400">User ID</span>
            <span className="text-white font-mono text-sm">{user?.id}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-700">
            <span className="text-slate-400">Account Created</span>
            <span className="text-white">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-700">
            <span className="text-slate-400">Last Updated</span>
            <span className="text-white">
              {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Unknown'}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-slate-400">API Key Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              user?.api_key
                ? 'bg-green-600/20 text-green-400'
                : 'bg-yellow-600/20 text-yellow-400'
            }`}>
              {user?.api_key ? 'Configured' : 'Not Configured'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
