import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // 1. JWT 토큰을 어디서 추출할지 설정 (Authorization: Bearer <토큰> 에서 추출)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // 토큰 만료 여부를 무시하지 않음 (만료된 토큰은 얄짤없이 튕겨냄)
            secretOrKey: 'SECRET_SIGNING_KEY_9999', // auth.module에서 설정한 비밀 키와 100% 동일해야 합니다.
        });
    }

    // 토큰 검증이 성공하면 자동으로 실행되는 함수입니다.
    async validate(payload: any) {
        // 여기서 반환된 유저 데이터는 Nest.js가 요청 객체(request.user)에 자동으로 붙여줍니다.
        return { id: payload.id, email: payload.email, nickname: payload.nickname };
    }
}

