import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// JWT 전략을 사용하는 인증 가드입니다. 
// 이 가드를 보호하려는 라우트에 적용하면, 
// 해당 라우트에 접근할 때 JWT 토큰이 유효한지 자동으로 검증해줍니다.
export class JwtAuthGuard extends AuthGuard('jwt') {}
