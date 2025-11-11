import { useAuth } from '../../contexts/AuthContext';
import { Server, Activity, Clock, TrendingUp } from 'lucide-react';

export default function Overview() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Services',
      value: '0',
      icon: Server,
      color: 'blue',
      description: 'Active services'
    },
    {
      title: 'API Requests',
      value: '0',
      icon: Activity,
      color: 'green',
      description: 'Last 30 days'
    },
    {
      title: 'Uptime',
      value: '99.9%',
      icon: TrendingUp,
      color: 'cyan',
      description: 'Average uptime'
    },
    {
      title: 'Account Age',
      value: calculateAccountAge(user?.created_at || ''),
      icon: Clock,
      color: 'purple',
      description: 'Member since'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.full_name}!
        </h2>
        <p className="text-slate-400">
          Here's an overview of your GameStates control panel
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-600/20 rounded-lg flex items-center justify-center`}>
                  <Icon className={`text-${stat.color}-400`} size={24} />
                </div>
              </div>
              <h3 className="text-sm text-slate-400 mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 rounded-lg transition-colors text-left">
              Deploy New Service
            </button>
            <button className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 rounded-lg transition-colors text-left">
              View All Services
            </button>
            <button className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 rounded-lg transition-colors text-left">
              Manage API Keys
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-white">Account created</p>
                <p className="text-xs text-slate-500">
                  {new Date(user?.created_at || '').toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-center py-8 text-slate-500 text-sm">
              No recent activity
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-600/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
            <p className="text-slate-300 text-sm">
              Check out our documentation or contact support for assistance
            </p>
          </div>
          <a
            href="https://petstore.swagger.io/?url=https://backend.datalix.de/v1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            API Docs
          </a>
        </div>
      </div>
    </div>
  );
}

function calculateAccountAge(createdAt: string): string {
  if (!createdAt) return 'New';

  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'Today';
  if (diffDays === 1) return '1 day';
  if (diffDays < 30) return `${diffDays} days`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return '1 month';
  if (diffMonths < 12) return `${diffMonths} months`;

  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? '1 year' : `${diffYears} years`;
}
