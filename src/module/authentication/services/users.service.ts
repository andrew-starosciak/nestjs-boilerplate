import { Injectable, Inject, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';

import { USER_REPOSITORY_TOKEN } from '../constants/index';
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

    constructor(
        @Inject(USER_REPOSITORY_TOKEN) private readonly _userRepository: Repository<UserEntity>,
    ) {
       // Empty
    }

    // Determine the Email and Compare the Password.
    public validateUserByLogin(email: string, password: string): Observable<UserEntity | undefined> {
        return from(this._userRepository.findOne({where: { email }})).pipe(
            switchMap((user) => {
                return from(bcrypt.compare(password, user.password)).pipe(
                    map((result: boolean) => {
                        if (result) {
                            return user;
                        }
                        return null;
                    }),
                );
            }),
        );
    }

    // Hash the password and create the user.
    public createOne(email: string, password: string): Observable<any> {
        return from(bcrypt.hash(password, 12)).pipe(
            switchMap((hashedPassword: string) => {
                return from(this._userRepository.save({
                    username: email,
                    email,
                    password: hashedPassword,
                    ...timestamps(),
                }));
            }),
        );
    }
}
