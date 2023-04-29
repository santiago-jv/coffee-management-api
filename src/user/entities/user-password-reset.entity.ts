import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'user_password_reset',
})
export class UserPasswordReset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @CreateDateColumn({ name: 'expiration_date'})
  expirationDate: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User, (user) => user.passwordResets)
  user: User;
}
