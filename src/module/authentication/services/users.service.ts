import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { UserEntity } from '../entities/index';

let ID = 2;

export function timestamps() {
    return {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
    };
}

@Injectable()
export class UsersService {
    private readonly users: UserEntity[];

    constructor() {
        this.users = [{
            id: 1,
            username: 'andrew',
            email: 'andrew@gmail.com',
            password: 'sup',
            ...timestamps(),
        }];
    }

    public findOne(email: string): Observable<UserEntity | undefined> {
        return of(this.users.find(user => user.email === email));
    }

    public createOne(email: string, password: string): Observable<UserEntity> {
        const user = {
            id: ID++,
            username: email,
            email,
            password,
            ...timestamps(),
        };
        this.users.push(user);

        return of(user);
    }
}
