import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm';

@Entity({
  name: 'Users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({name: 'first_name' })
  firstName: string;

  @Column({ nullable: true, name: 'last_name' })
  lastName: string;

  @Column({ default: true,name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({name:'created_at'})
  createdAt: Date;
}
