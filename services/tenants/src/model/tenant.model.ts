import {
  Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne,
} from 'typeorm';
import TenantConfig from './tenantConfig.model';

@Entity('tenants')
export default class Tenant {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 30 })
    slug!: string;

    @OneToOne(type => TenantConfig) // eslint-disable-line
    @JoinColumn()
    config!: TenantConfig;
}
