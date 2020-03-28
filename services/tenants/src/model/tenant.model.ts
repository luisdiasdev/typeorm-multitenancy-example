import {
  Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne,
} from 'typeorm';
import {
  IsString, MaxLength, ValidateNested, IsNotEmpty,
} from 'class-validator';
import TenantConfig from './tenantConfig.model';

@Entity('tenants')
export default class Tenant {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsString()
    @MaxLength(30)
    @Column({ length: 30, unique: true })
    slug!: string;

    @IsNotEmpty()
    @ValidateNested()
    @OneToOne('TenantConfig', {
      cascade: true,
    })
    @JoinColumn()
    config!: TenantConfig;
}
