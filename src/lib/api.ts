const API_BASE_URL = 'https://backend.panel.gamestates.de/v1';

export class ApiClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    url.searchParams.append('token', this.apiKey);

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getServiceList() {
    return this.request('/service/list');
  }

  async getServiceDetails(serviceId: string) {
    return this.request(`/service/${serviceId}`);
  }

  async getServiceStatus(serviceId: string) {
    return this.request(`/service/${serviceId}/status`);
  }

  async startService(serviceId: string) {
    return this.request(`/service/${serviceId}/start`, {
      method: 'POST',
    });
  }

  async stopService(serviceId: string) {
    return this.request(`/service/${serviceId}/stop`, {
      method: 'POST',
    });
  }

  async restartService(serviceId: string) {
    return this.request(`/service/${serviceId}/restart`, {
      method: 'POST',
    });
  }

  async extendService(serviceId: string, duration: number) {
    return this.request(`/service/${serviceId}/extend`, {
      method: 'POST',
      body: JSON.stringify({ duration }),
    });
  }

  async createBackup(serviceId: string) {
    return this.request(`/service/${serviceId}/backup`, {
      method: 'POST',
    });
  }

  async getResellerGameServers() {
    return this.request('/reseller/gameserver');
  }

  async getGameServerPackages(gameId: string) {
    return this.request(`/reseller/gameserver/packages/${gameId}`);
  }

  async orderGameServer(gameId: string, data: unknown) {
    return this.request(`/reseller/order/gameserver/${gameId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async orderKvmServer(kvmPacketId: string, data: unknown) {
    return this.request(`/reseller/order/kvm/${kvmPacketId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserList(interfaceId: string) {
    return this.request(`/reseller/interface/${interfaceId}/user/list`);
  }

  async getInterfaceServices(interfaceId: string) {
    return this.request(`/reseller/interface/${interfaceId}/service/list`);
  }
}

export function createApiClient(apiKey: string | null): ApiClient | null {
  if (!apiKey) return null;
  return new ApiClient(apiKey);
}