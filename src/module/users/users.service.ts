import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [{
            id: 1,
            username: 'andrew',
            email: 'andrew@gmail.com',
            password: 'sup',
        }];
    }

    public async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
