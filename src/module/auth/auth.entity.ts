import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AuthEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ nullable: false})
    public timestamp: number;

}
