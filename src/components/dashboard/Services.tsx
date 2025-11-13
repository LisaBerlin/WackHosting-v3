import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { createApiClient } from '../../lib/api';
import { createServiceSyncManager } from '../../lib/serviceSync';
import { Server, Play, Square, RefreshCw, Loader, AlertCircle, Eye } from 'lucide-react';
import ServiceDetails from './ServiceDetails';

interface Service {
  id: string;
  name: string;
  productdisplay: string;
  ip: string;
  price: string;
  daysleft: number;
  status?: string;
}

export default function Services() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
    const interval = setInterval(loadServices, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const loadServices = async () => {
    if (!user?.api_key || !user?.id) {
      setLoading(false);
      return;
    }

    try {
      const client = createApiClient(user.api_key);
      if (client) {
        const data = await client.getServiceList();
        setServices(data || []);

        const syncManager = createServiceSyncManager(client, user.id);
        if (syncManager) {
          await syncManager.syncServicesFromAPI();
        }
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
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{service.productdisplay}</h3>
                  {service.name && <p className="text-slate-300 text-sm mb-2">{service.name}</p>}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500">IP:</span>
                      <span className="text-slate-300 ml-2">{service.ip || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Preis:</span>
                      <span className="text-slate-300 ml-2">€{service.price}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Verbleibend:</span>
                      <span className={`ml-2 font-semibold ${
                        service.daysleft > 7 ? 'text-green-400' : 'text-red-400'
                      }`}>{service.daysleft} Tage</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedService(service.id)}
                  className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Eye size={16} />
                  <span>Details</span>
                </button>
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
                  className="px-4 py-2 bg-slate-600/20 hover:bg-slate-600/30 border border-slate-600/30 text-slate-300 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
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

      {selectedService && user?.api_key && (
        <ServiceDetails
          serviceId={selectedService}
          apiKey={user.api_key}
          onClose={() => setSelectedService(null)}
          onRefresh={loadServices}
        />
      )}
    </div>
  );
}
