import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsPort, IsString } from 'class-validator';

@Entity('tenants_config')
export default class TenantConfig {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    host!: string;

    @IsPort()
    @Column()
    port!: number;

    @IsString()
    @Column()
    username!: string;

    @IsString()
    @Column()
    password!: string;

    @IsString()
    @Column()
    database!: string;
}
