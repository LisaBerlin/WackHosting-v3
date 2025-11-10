import { useState, useEffect } from 'react';
import { Code, Copy, ExternalLink, Zap, Lock, AlertCircle } from 'lucide-react';

interface Endpoint {
  path: string;
  method: string;
  description: string;
  tags: string[];
}

export default function ApiDocumentation() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    fetchApiSpec();
  }, []);

  const fetchApiSpec = async () => {
    try {
      const response = await fetch('https://backend.panel.gamestates.de/v1');
      const spec = await response.json();
      const extractedEndpoints = extractEndpoints(spec);
      setEndpoints(extractedEndpoints);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching API spec:', error);
      setEndpoints(getMockEndpoints());
      setLoading(false);
    }
  };

  const extractEndpoints = (spec: any) => {
    const endpoints: Endpoint[] = [];
    const paths = spec.paths || {};

    Object.entries(paths).forEach(([path, methods]: [string, any]) => {
      Object.entries(methods).forEach(([method, details]: [string, any]) => {
        if (method !== 'parameters') {
          endpoints.push({
            path,
            method: method.toUpperCase(),
            description: details.description || details.summary || 'No description',
            tags: details.tags || []
          });
        }
      });
    });

    return endpoints.slice(0, 12);
  };

  const getMockEndpoints = () => [
    {
      path: '/reseller/order/kvm/{kvmPacketId}',
      method: 'POST',
      description: 'Order a new KVM server with custom configuration',
      tags: ['reseller']
    },
    {
      path: '/reseller/interface/{interfaceid}/user/list',
      method: 'GET',
      description: 'List all users for a specific interface',
      tags: ['reseller']
    },
    {
      path: '/reseller/interface/{interfaceid}/service/list',
      method: 'GET',
      description: 'List all services for a specific interface',
      tags: ['reseller']
    },
    {
      path: '/service/{serviceId}/start',
      method: 'POST',
      description: 'Start a service',
      tags: ['service']
    },
    {
      path: '/service/{serviceId}/stop',
      method: 'POST',
      description: 'Stop a service',
      tags: ['service']
    },
    {
      path: '/service/{serviceId}/backup',
      method: 'POST',
      description: 'Create a backup of your service',
      tags: ['service']
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-blue-400 bg-blue-400/10';
      case 'POST':
        return 'text-green-400 bg-green-400/10';
      case 'PUT':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'DELETE':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-slate-400 bg-slate-400/10';
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const exampleRequest = (path: string, method: string) => {
    if (method === 'GET') {
      return `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://backend.panel.gamestates.de/v1${path}`;
    }
    return `curl -X ${method} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{}' \\
  https://backend.panel.gamestates.de/v1${path}`;
  };

  return (
    <section id="api" className="py-24 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full mb-6">
            <Code size={16} className="text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">Developer API</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            RESTful API Documentation
          </h2>

          <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto">
            Integrate GameStates into your applications with our comprehensive RESTful API. Manage servers, automate deployments, and scale your infrastructure programmatically.
          </p>

          <a
            href="https://petstore.swagger.io/?url=https://backend.panel.gamestates.de/v1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/40 text-blue-400 rounded-lg transition-colors duration-200"
          >
            <span>View Full Swagger Documentation</span>
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <Lock className="text-blue-400" size={20} />
            </div>
            <h3 className="text-white font-semibold mb-2">API Key Authentication</h3>
            <p className="text-slate-400 text-sm">Secure your requests with API key authentication. Rate limited to 120 requests per minute.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-green-400" size={20} />
            </div>
            <h3 className="text-white font-semibold mb-2">RESTful Design</h3>
            <p className="text-slate-400 text-sm">Standard HTTP methods and JSON responses for seamless integration with any platform.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center mb-4">
              <AlertCircle className="text-yellow-400" size={20} />
            </div>
            <h3 className="text-white font-semibold mb-2">Error Handling</h3>
            <p className="text-slate-400 text-sm">Request IDs and detailed error responses for easy debugging and support.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Available Endpoints</h3>
            <p className="text-slate-400 text-sm mt-1">Click on an endpoint to view example requests</p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading API endpoints...</div>
          ) : (
            <div className="divide-y divide-slate-700">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="hover:bg-slate-700/20 transition-colors duration-200">
                  <button
                    onClick={() => setSelectedEndpoint(selectedEndpoint === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <span className={`px-3 py-1 rounded font-mono text-sm font-semibold ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <span className="text-slate-300 font-mono text-sm">{endpoint.path}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${selectedEndpoint === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>

                  {selectedEndpoint === index && (
                    <div className="px-6 py-4 bg-slate-900/30 border-t border-slate-700">
                      <p className="text-slate-300 mb-4">{endpoint.description}</p>

                      <div className="bg-slate-900 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-slate-400 font-mono text-sm">Example Request</span>
                          <button
                            onClick={() => copyToClipboard(exampleRequest(endpoint.path, endpoint.method))}
                            className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 text-sm transition-colors duration-200"
                          >
                            <Copy size={14} />
                            <span>{copiedCode === exampleRequest(endpoint.path, endpoint.method) ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                        <pre className="text-slate-400 font-mono text-xs overflow-x-auto">
                          <code>{exampleRequest(endpoint.path, endpoint.method)}</code>
                        </pre>
                      </div>

                      <div className="flex items-center space-x-2 text-yellow-400 text-sm bg-yellow-400/10 border border-yellow-400/20 rounded p-3">
                        <AlertCircle size={16} className="flex-shrink-0" />
                        <span>Replace YOUR_API_KEY with your actual API key from your dashboard.</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Quick Start</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-slate-300 font-semibold mb-2">1. Get Your API Key</h4>
              <p className="text-slate-400">Log in to your GameStates control panel and navigate to API settings to generate your API key.</p>
            </div>
            <div>
              <h4 className="text-slate-300 font-semibold mb-2">2. Include Authentication</h4>
              <p className="text-slate-400">Add your API key to the Authorization header: <code className="text-blue-400">Authorization: Bearer YOUR_API_KEY</code></p>
            </div>
            <div>
              <h4 className="text-slate-300 font-semibold mb-2">3. Make Requests</h4>
              <p className="text-slate-400">Use the endpoints documented above to manage your servers, services, and resources.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
