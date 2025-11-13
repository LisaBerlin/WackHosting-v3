import { supabase } from './supabase';
import { ApiClient } from './api';

export interface CachedService {
  id: string;
  service_id: string;
  service_type: string;
  service_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export class ServiceSyncManager {
  private apiClient: ApiClient;
  private userId: string;

  constructor(apiClient: ApiClient, userId: string) {
    this.apiClient = apiClient;
    this.userId = userId;
  }

  async syncServicesFromAPI() {
    try {
      const services = await this.apiClient.getServiceList();

      if (!Array.isArray(services)) {
        console.error('Invalid services response');
        return [];
      }

      const syncedServices = [];

      for (const service of services) {
        const cachedService = {
          user_id: this.userId,
          service_id: service.id,
          service_type: service.type || 'unknown',
          service_name: service.productdisplay || service.name || 'Unknown Service',
          status: service.status || 'unknown',
        };

        const { data, error } = await supabase
          .from('user_services')
          .upsert(
            [
              {
                ...cachedService,
                updated_at: new Date().toISOString(),
              },
            ],
            { onConflict: 'service_id' }
          )
          .select();

        if (error) {
          console.error('Error syncing service:', error);
        } else if (data && data.length > 0) {
          syncedServices.push(data[0]);
        }
      }

      return syncedServices;
    } catch (error) {
      console.error('Error syncing services:', error);
      return [];
    }
  }

  async getCachedServices() {
    const { data, error } = await supabase
      .from('user_services')
      .select('*')
      .eq('user_id', this.userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cached services:', error);
      return [];
    }

    return data || [];
  }

  async updateServiceStatus(serviceId: string, status: string) {
    const { error } = await supabase
      .from('user_services')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('service_id', serviceId)
      .eq('user_id', this.userId);

    if (error) {
      console.error('Error updating service status:', error);
    }
  }

  async deleteService(serviceId: string) {
    const { error } = await supabase
      .from('user_services')
      .delete()
      .eq('service_id', serviceId)
      .eq('user_id', this.userId);

    if (error) {
      console.error('Error deleting service:', error);
    }
  }
}

export function createServiceSyncManager(
  apiClient: ApiClient | null,
  userId: string | undefined
): ServiceSyncManager | null {
  if (!apiClient || !userId) return null;
  return new ServiceSyncManager(apiClient, userId);
}
