import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({
    name: 'products',
  })
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ApiProperty()
    @Column({name: 'name'})
    name: string;

    @ApiProperty()
    @Column({name: 'price'})
    price: number;

    @ApiProperty()
    @Column({name: 'type'})
    type: string;

    @ApiProperty()
    @CreateDateColumn({name: 'created_at', type: 'datetime'})
    createdAt: Date

    @ApiProperty()
    @Column({default: true, name: 'is_active'})
    isActive: boolean

}