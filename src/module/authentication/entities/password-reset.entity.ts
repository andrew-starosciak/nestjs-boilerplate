import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PasswordResetEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: number;

    @Column()
    public code: string;

    @Column({ nullable: false})
    public createdAt: Date;

    @Column({ nullable: false})
    public updatedAt: Date;

    @Column({ nullable: true})
    public deletedAt: Date;

}
