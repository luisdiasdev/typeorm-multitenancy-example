import {
  Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne,
} from 'typeorm';
import TenantConfig from './tenantConfig.model';

@Entity('tenants')
export default class Tenant {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 30, unique: true })
    slug!: string;

    @OneToOne('TenantConfig', {
      cascade: true,
    })
    @JoinColumn()
    config!: TenantConfig;
}
