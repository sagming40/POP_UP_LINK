import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    // DB를 조작할 수 있는 Repository 객체를 주입받음 -> User 엔티티를 조작할 수 있는 Repository 객체가 됨
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 회원가입 로직
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, nickname } = createUserDto;

    // 1. 이메일 중복 체크 (이미 가입된 User인지 확인)
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      // 이미 존재하면 409 Conflict 에러를 던뎌 보안과 사용자 경험(정합성)을 향상시킴
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 2. 비밀번호 해싱(암호화) (bcrypt 라이브러리를 사용하여 안전하게 저장)
    const saltRound = 10; // bcrypt의 salt 라운드 수 (보안과 성능의 균형을 맞추는 값 10이 글로벌 표준) -> 암호화를 얼마나 복잡하게 꼬을지 결정하는 강도
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // 3. 새로운 User 엔티티(암호화된 유저 정보) 생성 및 DB에 저장
    const user = this.userRepository.create({
      email,
      password: hashedPassword, // 암호화된 비밀번호 저장(쌩 비밀번호 대신)
      nickname,
    });

    return await this.userRepository.save(user); // DB에 저장된 User 엔티티 반환
  }
}
