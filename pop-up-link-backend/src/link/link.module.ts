import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 TypeOrm Import
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { Link } from './entities/link.entity'; // 👈 Link Entity Import
import { AuthModule } from '../auth/auth.module'; // 👈 AuthModule Import

@Module({
  imports: [
    // 이 모듈 안에서 Link 엔티티 DB를 사용할 수 있도록 TypeOrmModule에 등록(허가)
    TypeOrmModule.forFeature([Link]),
    // Link 모듈에서 AuthModule을 임포트하여, 
    // LinkService에서 AuthService를 사용할 수 있도록 합니다.
    AuthModule,
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
