import { useAuth } from '../../contexts/AuthContext';
import { Activity as ActivityIcon, Clock, User } from 'lucide-react';

export default function Activity() {
  const { user } = useAuth();

  const activities = [
    {
      type: 'account',
      icon: User,
      title: 'Account Created',
      description: 'Your account was created successfully',
      timestamp: user?.created_at || '',
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <ActivityIcon className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Activity Log</h2>
            <p className="text-slate-400">
              Track all actions and events related to your account
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className={`w-10 h-10 bg-${activity.color}-600/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`text-${activity.color}-400`} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{activity.title}</h3>
                  <p className="text-slate-400 text-sm mb-2">{activity.description}</p>
                  <div className="flex items-center space-x-2 text-slate-500 text-xs">
                    <Clock size={12} />
                    <span>{formatTimestamp(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ActivityIcon className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Activity Yet</h3>
            <p className="text-slate-400">
              Your activity log will appear here as you use the platform
            </p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Activity Statistics</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Total Events</p>
            <p className="text-2xl font-bold text-white">{activities.length}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Last 7 Days</p>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Last 30 Days</p>
            <p className="text-2xl font-bold text-white">{activities.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTimestamp(timestamp: string): string {
  if (!timestamp) return 'Unknown';

  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
    }
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }

  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString();
}
