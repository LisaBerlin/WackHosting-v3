import { useState, useEffect } from 'react';
import { createApiClient } from '../../lib/api';
import { X, Loader, Server, HardDrive, Cpu, Network, Key, RefreshCw } from 'lucide-react';

interface ServiceDetailsProps {
  serviceId: string;
  apiKey: string;
  onClose: () => void;
  onRefresh: () => void;
}

interface OSOption {
  id: string;
  displayname: string;
  type: string;
  sort: number;
}

export default function ServiceDetails({ serviceId, apiKey, onClose, onRefresh }: ServiceDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [serviceInfo, setServiceInfo] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [os, setOS] = useState<OSOption[]>([]);
  const [ips, setIPs] = useState<any>(null);
  const [showReinstall, setShowReinstall] = useState(false);
  const [reinstallOS, setReinstallOS] = useState('');
  const [reinstallPassword, setReinstallPassword] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadDetails();
  }, [serviceId]);

  const loadDetails = async () => {
    const client = createApiClient(apiKey);
    if (!client) return;

    try {
      const [info, statusData, osData, ipData] = await Promise.all([
        client.getServiceDetails(serviceId),
        client.getServiceStatus(serviceId),
        client.getServiceOS(serviceId),
        client.getServiceIP(serviceId),
      ]);

      setServiceInfo(info);
      setStatus(statusData);
      setOS(osData);
      setIPs(ipData);
    } catch (error) {
      console.error('Error loading service details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReinstall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Server wirklich neuinstallieren? Alle Daten gehen verloren!')) return;

    setActionLoading(true);
    try {
      const client = createApiClient(apiKey);
      if (client) {
        await client.reinstallService(serviceId, reinstallOS, reinstallPassword);
        alert('Neuinstallation gestartet!');
        setShowReinstall(false);
        onRefresh();
        onClose();
      }
    } catch (error) {
      alert('Fehler: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleHide = async () => {
    if (!confirm('Service ausblenden?')) return;

    try {
      const client = createApiClient(apiKey);
      if (client) {
        await client.hideService(serviceId);
        alert('Service ausgeblendet');
        onRefresh();
        onClose();
      }
    } catch (error) {
      alert('Fehler: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <Loader className="animate-spin text-blue-400" size={48} />
            <p className="text-white">Lade Details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!serviceInfo) {
    return null;
  }

  const { service, product, display } = serviceInfo;
  const currentOS = os.find(o => o.id === product.os);
  const expiryDate = new Date(service.expire_at * 1000).toLocaleString('de-DE');
  const createdDate = new Date(service.created_on * 1000).toLocaleString('de-DE');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 max-w-6xl w-full my-8">
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm p-6 border-b border-slate-700 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Server className="text-blue-400" size={24} />
            <h2 className="text-2xl font-bold text-white">{product.hostname}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {showReinstall ? (
            <form onSubmit={handleReinstall} className="space-y-6">
              <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4 text-yellow-400">
                <p className="font-semibold mb-2">Warnung</p>
                <p className="text-sm">Alle Daten auf dem Server werden gelöscht!</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Betriebssystem</label>
                <select
                  value={reinstallOS}
                  onChange={(e) => setReinstallOS(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="">Auswählen...</option>
                  <optgroup label="Linux Systeme">
                    {os.filter(o => o.type === 'linux').sort((a, b) => a.sort - b.sort).map(o => (
                      <option key={o.id} value={o.id}>{o.displayname}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Windows Systeme">
                    {os.filter(o => o.type === 'windows').sort((a, b) => a.sort - b.sort).map(o => (
                      <option key={o.id} value={o.id}>{o.displayname}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Root/Administrator Passwort</label>
                <input
                  type="password"
                  value={reinstallPassword}
                  onChange={(e) => setReinstallPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                  placeholder="Neues sicheres Passwort"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Installiere...' : 'Neuinstallation starten'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReinstall(false)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{service.productdisplay}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      status.status === 'running' ? 'bg-green-600/20 text-green-400' :
                      status.status === 'stopped' ? 'bg-red-600/20 text-red-400' :
                      'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {status.status}
                    </span>
                    {service.locked && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-600/20 text-red-400">
                        Gesperrt
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Cpu className="text-blue-400" size={20} />
                    <h3 className="text-lg font-semibold text-white">Hardware</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">CPU Kerne:</span>
                      <span className="text-white font-semibold">{product.cores} Cores</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CPU Typ:</span>
                      <span className="text-white font-semibold">{product.cputype}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">RAM:</span>
                      <span className="text-white font-semibold">{(product.memory / 1024).toFixed(0)} GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Speicher:</span>
                      <span className="text-white font-semibold">{(product.disk / 1024).toFixed(0)} GB</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Network className="text-blue-400" size={20} />
                    <h3 className="text-lg font-semibold text-white">Netzwerk</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Uplink:</span>
                      <span className="text-white font-semibold">{product.uplink} Mbit/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Traffic:</span>
                      <span className="text-white font-semibold">{product.additionaltraffic} TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Standort:</span>
                      <span className="text-white font-semibold">{product.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Node:</span>
                      <span className="text-white font-semibold">{product.node}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Key className="text-blue-400" size={20} />
                  <h3 className="text-lg font-semibold text-white">Zugang</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 text-sm">Betriebssystem:</span>
                    <p className="text-white font-semibold">{currentOS?.displayname || 'Unbekannt'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Benutzer:</span>
                    <p className="text-white font-semibold">{product.user}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Passwort:</span>
                    <p className="text-white font-mono bg-slate-900 px-3 py-2 rounded">{product.password}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Port:</span>
                    <p className="text-white font-semibold">{product.port}</p>
                  </div>
                </div>
              </div>

              {ips && (
                <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">IP-Adressen</h3>

                  {ips.ipv4 && ips.ipv4.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm text-slate-400 mb-3">IPv4</h4>
                      <div className="space-y-3">
                        {ips.ipv4.map((ip: any, index: number) => (
                          <div key={index} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <span className="text-slate-400 text-sm">IP:</span>
                                <p className="text-blue-400 font-mono">{ip.ip}</p>
                              </div>
                              <div>
                                <span className="text-slate-400 text-sm">Gateway:</span>
                                <p className="text-white font-mono">{ip.gw}</p>
                              </div>
                              <div>
                                <span className="text-slate-400 text-sm">Netmask:</span>
                                <p className="text-white font-mono">{ip.netmask}</p>
                              </div>
                              <div>
                                <span className="text-slate-400 text-sm">rDNS:</span>
                                <p className="text-white font-mono text-xs">{ip.rdns || 'Nicht gesetzt'}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {ips.ipv6 && ips.ipv6.length > 0 && (
                    <div>
                      <h4 className="text-sm text-slate-400 mb-3">IPv6</h4>
                      <div className="space-y-3">
                        {ips.ipv6.map((ip: any, index: number) => (
                          <div key={index} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <span className="text-slate-400 text-sm">Subnet:</span>
                                <p className="text-blue-400 font-mono text-xs">{ip.subnet}</p>
                              </div>
                              <div>
                                <span className="text-slate-400 text-sm">Gateway:</span>
                                <p className="text-white font-mono text-xs">{ip.gw}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Service Informationen</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 text-sm">Erstellt am:</span>
                    <p className="text-white">{createdDate}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Läuft ab am:</span>
                    <p className="text-white">{expiryDate}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Verbleibend:</span>
                    <p className={`font-semibold ${service.daysleft > 7 ? 'text-green-400' : 'text-red-400'}`}>
                      {service.daysleft} Tage
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Preis:</span>
                    <p className="text-white font-semibold">€{service.price}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sticky bottom-0 bg-slate-900/95 backdrop-blur-sm p-4 -mx-6 -mb-6 border-t border-slate-700 rounded-b-2xl">
                <button
                  onClick={() => setShowReinstall(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                >
                  <RefreshCw size={16} />
                  <span>Neuinstallieren</span>
                </button>
                <button
                  onClick={handleHide}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Ausblenden
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
