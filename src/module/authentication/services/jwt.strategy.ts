import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { jwtConstants } from '../constants/index';

/**
 * @notes - https://docs.nestjs.com/techniques/authentication#implementing-passport-jwt
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    public async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
