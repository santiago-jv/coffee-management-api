import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({name: 'product_name'})
    name: string;

    @Column({name: 'product_price'})
    price: number;

    @Column({name: 'product_type'})
    type: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @Column({default: true, name: 'is_active'})
    isActive: boolean

}