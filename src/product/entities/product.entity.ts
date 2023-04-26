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

    //This automatically asign the actual date as a createAt
    @CreateDateColumn({name: 'created_at', type: 'datetime'})
    createdAt: Date

    @Column({default: true, name: 'is_active'})
    isActive: boolean

}