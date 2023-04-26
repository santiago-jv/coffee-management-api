import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({
    name: 'Products',
  })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'price'})
    price: number;

    @Column({name: 'type'})
    type: string;

    @CreateDateColumn({name: 'created_at', type: 'datetime'})
    createdAt: Date

    @Column({default: true, name: 'is_active'})
    isActive: boolean

}