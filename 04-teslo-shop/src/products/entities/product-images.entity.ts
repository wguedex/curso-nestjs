import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    url: string;
}