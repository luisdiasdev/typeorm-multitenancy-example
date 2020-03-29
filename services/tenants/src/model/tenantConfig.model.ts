import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenants_config')
export default class TenantConfig {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    host!: string;

    @Column()
    port!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    database!: string;
}
