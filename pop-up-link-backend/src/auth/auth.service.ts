import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; 
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // 로그인 처리 메서드(검증 및 토큰 발급 비즈니스 로직)
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. 이메일로 사용자 조회
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    // 2. 비밀번호 검증 (bcrypt로 해시된 비밀번호 비교)
    const isPasswordValidated = await bcrypt.compare(password, user.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    // 3. (비밀번호가 맞다면) JWT 토큰 발급 (payload에는 최소한의 사용자 정보만 담기)
    const payload = { id: user.id, email: user.email, nickname: user.nickname };

    // 4. 토큰 발급 메서드 (로그인 성공 시 호출)
    return {
      accessToken: this.jwtService.sign(payload), // JWT 토큰 생성
    };
  }
}

/*
@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
*/  
