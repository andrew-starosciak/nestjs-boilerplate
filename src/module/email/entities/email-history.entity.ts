import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EmailTypes {
    CONFIRMATION = 'confirmation',
    THANKYOU = 'thank-you',
    PASSWORDRESET = 'password-reset',
    SIGNUP = 'sign-up',
    TEST = 'test',
}

export enum EmailProviderTypes {
    GUNMAIL = 'gunmail',
}

@Entity()
export class EmailHistoryEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: number;

    @Column()
    public type: EmailTypes.CONFIRMATION | EmailTypes.THANKYOU | EmailTypes.PASSWORDRESET | EmailTypes.SIGNUP | EmailTypes.TEST;

    @Column()
    public provider: EmailProviderTypes.GUNMAIL;

    @Column()
    public meta: string;

    @Column({ nullable: false})
    public createdAt: Date;

    @Column({ nullable: false})
    public updatedAt: Date;

    @Column({ nullable: true})
    public deletedAt: Date;
}
