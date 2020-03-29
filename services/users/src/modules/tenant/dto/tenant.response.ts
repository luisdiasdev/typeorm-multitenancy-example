import TenantConfigResponse from './tenantConfig.response';

interface TenantResponse {
    id: number;
    slug: string;
    config: TenantConfigResponse;
}

export default TenantResponse;
