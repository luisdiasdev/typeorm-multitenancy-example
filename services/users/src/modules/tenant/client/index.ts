import axios, { AxiosInstance } from 'axios';
import NodeCache from 'node-cache';
import TenantResponse from '../dto/tenant.response';

const DEFAULT_TENANT_INFO_TTL = 12 * 60 * 60;

class TenantClient {
    private instance: AxiosInstance;

    private path = '/tenants';

    private cache: NodeCache = new NodeCache({
      stdTTL: DEFAULT_TENANT_INFO_TTL,
    })

    public constructor(url: string) {
      this.instance = axios.create({
        baseURL: url,
        timeout: 1000,
      });
    }

    public async getBySlug(slug: string): Promise<TenantResponse> {
      if (!this.cache.has(slug)) {
        const tenantResponse = await this.getTenantBySlug(slug);
        if (tenantResponse) {
          this.cache.set(slug, tenantResponse);

          return tenantResponse;
        }
      }
      const responseFromCache = this.cache.get<TenantResponse>(slug);
      if (!responseFromCache) {
        throw new Error('Could not obtain tenant');
      }
      return responseFromCache;
    }

    private async getTenantBySlug(slug: string): Promise<TenantResponse> {
      const response = await this.instance.get(`${this.path}/${slug}`);

      const tenantResponse = { ...response.data };

      return tenantResponse;
    }
}

export default TenantClient;
