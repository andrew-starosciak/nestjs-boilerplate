import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column({ nullable: false})
    public createdAt: Date;

    @Column({ nullable: false})
    public updatedAt: Date;

    @Column({ nullable: true})
    public deletedAt: Date;

    // public from?(partial: Partial<UserEntity>): this {
    //     this.id = partial.id;
    //     this.username = partial.username;
    //     this.email = partial.email;
    //     this.password = partial.password;
    //     this.createdAt = partial.createdAt;
    //     this.updatedAt = partial.updatedAt;
    //     this.deletedAt = partial.deletedAt;
    //     return this;
    // }

}
