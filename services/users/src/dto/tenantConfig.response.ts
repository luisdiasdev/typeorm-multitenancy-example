interface TenantConfigResponse {
    id: number;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export default TenantConfigResponse;
