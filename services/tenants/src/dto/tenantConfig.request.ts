import { IsString, IsPort, IsNotEmpty } from 'class-validator';

class TenantConfigRequest {
    @IsString()
    @IsNotEmpty()
    host!: string;

    @IsPort()
    port!: number;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    database!: string;
}

export default TenantConfigRequest;
