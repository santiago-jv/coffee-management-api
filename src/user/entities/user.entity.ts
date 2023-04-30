import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserPasswordReset } from '../../user-password-reset/entities/user-password-reset.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({name:'created_at'})
  createdAt: Date;

  @OneToMany(() => UserPasswordReset, (userPasswordReset) => userPasswordReset.user)
  passwordResets: UserPasswordReset[];
}
