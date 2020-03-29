import {
  IsString, ValidateNested, MaxLength, IsDefined, IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import TenantConfigRequest from './tenantConfig.request';

class CreateTenantRequest {
    @IsString()
    @MaxLength(30)
    slug!: string;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => TenantConfigRequest)
    config!: TenantConfigRequest
}

export default CreateTenantRequest;
