import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // 👈 JWT 모듈 임포트
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // 👈 유저 모듈 임포트

@Module({
  imports: [
    UserModule, // 👈 중요: UserService를 갖다 쓰기 위해 유저 모듈을 통째로 빌려옵니다. 
    JwtModule.register({
      secret: 'SECRET_SIGNING_KEY_9999', // 👈 토큰 위조 방지용 비밀 키 (실무에선 .env에 넣지만 일단 수동 입력!) 
      signOptions: { expiresIn: '1h' }, // 👈 토큰 유효 기간 설정 (1시간)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
