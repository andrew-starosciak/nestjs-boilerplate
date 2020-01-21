import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { TIME } from '../../../common/index';

import { PASSWORD_RESET_REPOSITORY_TOKEN } from '../constants/index';
import { PasswordResetEntity } from '../entities/index';

@Injectable()
export class PasswordResetService {

    constructor(
        @Inject(PASSWORD_RESET_REPOSITORY_TOKEN) private _passwordResetService: Repository<PasswordResetEntity>,
    ) {
        // Empty
    }

    public find(userId: number): Observable<PasswordResetEntity | undefined> {
        return from(this._passwordResetService.findOne({ where: { userId, deletedAt: null }}));
    }

    public create(userId: number): Observable<PasswordResetEntity> {
        return from(this._passwordResetService.save({
            userId,
            code: this._randomPassword(),
            ...TIME.timestamps(),
        }));
    }

    public close(passwordResetId: number): Observable<any> {
      return from(this._passwordResetService.update({ id: passwordResetId }, { deletedAt: new Date() }));
    }

    // Found on this gist: https://gist.github.com/enishant/4ba920c71f338e83c7089dc5d6f33a64
    private _randomPassword(length= 8, input= 'alpha-numeric') {
        let alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let password = '';
        if (input === 'alpha') {
          alphabet = 'abcdefghijklmnopqrstuvwxyz';
        } else if (input === 'alpha-caps') {
          alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (input === 'alpha-numeric') {
          alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
        } else if (input === 'alpha-numeric-caps') {
          alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        } else if (input === 'alpha-numeric-symbols') {
          alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890~!@#$%^&*()_+-=';
        } else if (input === 'alpha-numeric-caps-symbols') {
          alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+-=';
        }
        const alphabetLength = alphabet.length - 1;
        for (let i = 0; i < length; i++) {
          const randomNumber = Math.floor(Math.random() * alphabetLength) + 1;
          password += alphabet[randomNumber];
        }
        return password;
      }
}
