import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { createApiClient } from '../../lib/api';
import { Server, Play, Square, RefreshCw, Loader, AlertCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  type: string;
  status: string;
}

export default function Services() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, [user]);

  const loadServices = async () => {
    if (!user?.api_key) {
      setLoading(false);
      return;
    }

    try {
      const client = createApiClient(user.api_key);
      if (client) {
        const data = await client.getServiceList();
        setServices(data || []);
      }
    } catch (err) {
      setError('Failed to load services. Make sure your API key is configured.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceAction = async (serviceId: string, action: 'start' | 'stop' | 'restart') => {
    if (!user?.api_key) return;

    setActionLoading(`${serviceId}-${action}`);
    try {
      const client = createApiClient(user.api_key);
      if (client) {
        if (action === 'start') await client.startService(serviceId);
        else if (action === 'stop') await client.stopService(serviceId);
        else if (action === 'restart') await client.restartService(serviceId);

        await loadServices();
      }
    } catch (err) {
      console.error(`Failed to ${action} service:`, err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  if (!user?.api_key) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="text-yellow-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">API Key Required</h3>
            <p className="text-slate-400 mb-4">
              To view and manage your services, you need to configure your API key.
              Contact the administrator to get your API key added to your account.
            </p>
            <p className="text-sm text-slate-500">
              Once your API key is configured, you'll be able to manage all your services from this dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-red-600/30">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="text-red-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Error Loading Services</h3>
            <p className="text-slate-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Server className="text-slate-400" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Services Yet</h3>
          <p className="text-slate-400 mb-6">
            You don't have any services yet. Order your first server to get started.
          </p>
          <a
            href="https://panel.gamestates.de/orderproduct"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Order a Service
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Services</h2>
            <p className="text-slate-400">Manage and monitor your active services</p>
          </div>
          <button
            onClick={loadServices}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Server className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                  <p className="text-slate-400 text-sm mb-2">{service.type}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'running' ? 'bg-green-400' :
                      service.status === 'stopped' ? 'bg-red-400' :
                      'bg-yellow-400'
                    }`}></div>
                    <span className="text-sm text-slate-400 capitalize">{service.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleServiceAction(service.id, 'start')}
                  disabled={actionLoading === `${service.id}-start`}
                  className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 text-green-400 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {actionLoading === `${service.id}-start` ? (
                    <Loader size={16} className="animate-spin" />
                  ) : (
                    <Play size={16} />
                  )}
                  <span>Start</span>
                </button>

                <button
                  onClick={() => handleServiceAction(service.id, 'stop')}
                  disabled={actionLoading === `${service.id}-stop`}
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-400 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {actionLoading === `${service.id}-stop` ? (
                    <Loader size={16} className="animate-spin" />
                  ) : (
                    <Square size={16} />
                  )}
                  <span>Stop</span>
                </button>

                <button
                  onClick={() => handleServiceAction(service.id, 'restart')}
                  disabled={actionLoading === `${service.id}-restart`}
                  className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {actionLoading === `${service.id}-restart` ? (
                    <Loader size={16} className="animate-spin" />
                  ) : (
                    <RefreshCw size={16} />
                  )}
                  <span>Restart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
