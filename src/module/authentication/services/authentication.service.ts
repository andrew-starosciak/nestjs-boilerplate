import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BaseResponse, BaseError } from '../../../models/index';

import { EmailService, EmailTypes } from '../../email/index';

import { UserEntity, PasswordResetEntity } from '../entities/index';

import { PasswordResetService } from './password-reset.service';
import { UsersService } from './users.service';

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly _emailService: EmailService,
        private readonly _jwtService: JwtService,
        private readonly _passwordResetService: PasswordResetService,
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
                return new BaseResponse<{access_token: string}>().from({
                    status: HttpStatus.OK,
                    payload: {
                        access_token: this._jwtService.sign(user),
                    },
                });
            }),
        );
    }

    public login(email: string, password: string): Observable<any> {
        return this.validateUser(email, password).pipe(
            map((user) => {
                if (user) {
                    delete user.password;
                    return new BaseResponse<{access_token: any}>().from({
                        status: HttpStatus.OK,
                        payload: {
                            access_token: this._jwtService.sign({
                                id: user.id,
                                username: user.username,
                                email: user.email,
                            }),
                        },
                    });
                } else {
                    throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        message: new BaseError('This user is not found or bad password.'),
                    }, 400);
                }
            }),
        );
    }

    public reset(email: string): Observable<BaseResponse<{message: string}>> {
        let userEntity: UserEntity = null;
        return this._usersService.findOneByEmail(email).pipe(
            tap((user) => {
                if (!user) {
                    throw new HttpException({
                        status: HttpStatus.NOT_FOUND,
                        message: new BaseError('This user is not found.'),
                    }, 404);
                }
                userEntity = user;
            }),
            switchMap((user) => {
                // Lets see if the user has already a valid password reset.
                return this._passwordResetService.find(user.id).pipe(
                    // if not found. create. otherwise do'nt email and tell them to check email.
                    switchMap((reset) => {
                        if (reset) {
                            return of(new BaseResponse<{ message: string}>().from({
                                status: HttpStatus.OK,
                                payload: {
                                    message: 'Please check your email for a previously sent password reset email.',
                                },
                            }));
                        }
                        return this._passwordResetService.create(userEntity.id).pipe(
                            switchMap((newReset) => {
                                return this._emailService.send({...userEntity, password: null}, EmailTypes.PASSWORDRESET, { code: newReset.code });
                            }),
                            switchMap((_) => {
                                return of(new BaseResponse<{ message: string}>().from({
                                    status: HttpStatus.OK,
                                    payload: {
                                        message: 'Please check your email for a new password reset code.',
                                    },
                                }));
                            }),
                        );
                    }),
                );
            }),
        );
    }

    // Lets find if the one user does exists and if the passwords match.
    private validateUser(email: string, password: string): Observable<UserEntity | null> {
        return this._usersService.validateUserByLogin(email, password);
    }
}
