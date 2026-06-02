import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // 👈 JWT 모듈 임포트
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // 👈 유저 모듈 임포트
import { JwtStrategy } from './strategies/jwt.strategies'; // 👈 JWT 전략 임포트
import { JwtAuthGuard } from './guards/jwt-auth.guards'; // 👈 JWT 인증 가드 임포트

@Module({
  imports: [
    UserModule, // 👈 중요: UserService를 갖다 쓰기 위해 유저 모듈을 통째로 빌려옵니다. 
    JwtModule.register({
      secret: 'SECRET_SIGNING_KEY_9999', // 👈 토큰 위조 방지용 비밀 키 (실무에선 .env에 넣지만 일단 수동 입력!) 
      signOptions: { expiresIn: '1h' }, // 👈 토큰 유효 기간 설정 (1시간)
    }),
  ],
  controllers: [AuthController],
  // AuthService, JwtStrategy, JwtAuthGuard를 providers에 등록하여 
  // Nest.js의 의존성 주입 시스템이 이 클래스들을 인식하고 관리할 수 있도록 합니다.
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  // ★매우 중요★ JwtAuthGuard와 JwtStrategy를 exports에 등록하여, 
  // 다른 모듈(Link, Event 등)에서 이 가드와 전략을 사용할 수 있도록 내보냅니다(export).
  exports: [JwtAuthGuard, JwtStrategy]
})
export class AuthModule {}
