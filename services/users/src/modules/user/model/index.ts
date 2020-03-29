import {
  Entity, Column,
} from 'typeorm';
import { Length } from 'class-validator';
import BaseModel from '../../shared/model/base';

@Entity('users')
export default class User extends BaseModel {
    @Length(4, 30)
    @Column({ unique: true, length: 30 })
    username!: string;

    @Length(4, 100)
    @Column({ length: 60 })
    password!: string;
}
