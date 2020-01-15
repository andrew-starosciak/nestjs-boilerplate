import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BaseResponse, BaseError } from '../../../models/index';

import { UserEntity } from '../entities/index';

import { UsersService } from './users.service';

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly _jwtService: JwtService,
        private readonly _usersService: UsersService,
    ) {
        // Empty
    }

    public create(email: string, password: string): Observable<any> {
        return this.validateUser(email, password).pipe(
            switchMap((user) => {
                if (user) {
                    throw new HttpException({
                        status: HttpStatus.FOUND,
                        error: new BaseError('Email is already taken.'),
                    }, 403);
                }
                return this._usersService.createOne(email, password);
            }),
            map((user) => {
                return new BaseResponse<UserEntity>().from({
                    status: HttpStatus.OK,
                    payload: user,
                });
            }),
        );
    }

    public login(email: string, password: string): Observable<any> {
        return this.validateUser(email, password).pipe(
            map((user) => {
                if (user) {
                    delete user.password;
                    return new BaseResponse<{access_token: string}>().from({
                        status: HttpStatus.OK,
                        payload: {
                            access_token: this._jwtService.sign(user),
                        },
                    });
                } else {
                    throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        message: new BaseError('This user is not found.'),
                    }, 400);
                }
            }),
        );
    }

    // Lets find if the one user does exists and if the passwords match.
    private validateUser(email: string, password: string): Observable<UserEntity | null> {
        return this._usersService.findOne(email).pipe(
            map((validUser) => {
                if (validUser && validUser.password === password) {
                    return validUser;
                }
                return null;
            }),
        );
    }
}
