import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 TypeOrm Import
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity'; // 👈 User Entity Import

@Module({
  imports: [
    // 이 모듈 안에서 User 엔티티 DB를 사용할 수 있도록 TypeOrmModule에 등록(허가)
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService], 
  exports: [UserService], // 나중에 UserService를 다른 모듈에서 사용할 수 있도록 export -> Auth(로그인) 모듈에서 유저 정보를 칮을 수 있게
})
export class UserModule {}
